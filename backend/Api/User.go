package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"

	con "project/database"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func (api *API) Login(c *gin.Context) {
	api.alloworigin(c)
	if c.Request.Method == "OPTIONS" {
		c.Writer.WriteHeader(200)
		return
	}

	if c.Request.Method != "POST" {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Method Not Allowed",
		})
		return
	}
	var cred Credentials
	err := json.NewDecoder(c.Request.Body).Decode(&cred)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    http.StatusBadRequest,
			"message": "Invalid request body",
		})
		return
	}

	if cred.Username == "" && cred.Password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "username dan password tidak boleh kosong",
		})
		return
	} else if cred.Username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "username tidak boleh kosong",
		})
		return
	} else if cred.Password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "password tidak boleh kosong",
		})
		return
	}

	resp, err := api.userRepo.LoginUser(cred.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}
	dataUser := *resp

	if err := bcrypt.CompareHashAndPassword([]byte(dataUser.Password), []byte(cred.Password)); err != nil {
		fmt.Println(dataUser.Password)
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "password salah",
		})
		return
	} else if dataUser.Username != cred.Username {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "user credential invalid",
		})
		return
	}

	expirationTime := time.Now().Local().Add((5 * time.Minute) + (7 * time.Hour) + (5 * time.Minute))

	claims := &Claims{
		Id:       dataUser.Id,
		Username: cred.Username,
		Role:     "user",
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
	dataToken := map[string]string{"token": tokenString}
	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "login success",
		"data":    dataToken,
	})
}

func (api *API) Register(c *gin.Context) {
	api.alloworigin(c)
	if c.Request.Method == "OPTIONS" {
		c.Writer.WriteHeader(200)
		return
	}

	if c.Request.Method != "POST" {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Method Not Allowed",
		})
		return
	}
	var reg Registration

	err := json.NewDecoder(c.Request.Body).Decode(&reg)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    http.StatusBadRequest,
			"message": "Invalid request body",
		})
		return
	}

	if reg.Username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "username tidak boleh kosong",
		})
		return
	} else if reg.Password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "password tidak boleh kosong",
		})
		return
	} else if reg.Nama == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "nama tidak boleh kosong",
		})
		return
	} else if reg.Mail == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "mail tidak boleh kosong",
		})
		return
	}

	_, err = api.userRepo.RegisterUser(reg.Mail)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}
	//dataUser := *resp
	password, _ := bcrypt.GenerateFromPassword([]byte(reg.Password), 10)
	strPassword := string(password)
	query := `INSERT INTO user (username, password, mail, nama ,role) 
	VALUES (?, ?, ?, ?, ?);`

	stmt, err := con.DB.Prepare(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	_, err = stmt.Exec(reg.Username, strPassword, reg.Mail, reg.Nama, "user")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Register Success",
	})
}

func (api *API) RegisterAdmin(c *gin.Context) {
	api.alloworigin(c)
	if c.Request.Method == "OPTIONS" {
		c.Writer.WriteHeader(200)
		return
	}

	if c.Request.Method != "POST" {
		c.JSON(400, gin.H{
			"status":  400,
			"message": "Method Not Allowed",
		})
		return
	}

	var reg Registration

	err := json.NewDecoder(c.Request.Body).Decode(&reg)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    http.StatusBadRequest,
			"message": "Invalid request body",
		})
		return
	}

	if reg.Username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "username tidak boleh kosong",
		})
		return
	} else if reg.Password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "password tidak boleh kosong",
		})
		return
	} else if reg.Nama == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "nama tidak boleh kosong",
		})
		return
	} else if reg.Mail == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "mail tidak boleh kosong",
		})
		return
	}

	_, err = api.userRepo.RegisterUser(reg.Mail)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}
	//dataUser := *resp
	password, _ := bcrypt.GenerateFromPassword([]byte(reg.Password), 10)
	strPassword := string(password)
	query := `INSERT INTO user (username, password, mail, nama ,role) 
	VALUES (?, ?, ?, ?, ?);`

	stmt, err := con.DB.Prepare(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	_, err = stmt.Exec(reg.Username, strPassword, reg.Mail, reg.Nama, "admin")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Register Success",
	})
}

func (api *API) Logout(c *gin.Context) {
	api.alloworigin(c)

	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "token",
		Value:   "",
		Expires: time.Unix(0, 0),
	})

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "logout success",
	})
}
