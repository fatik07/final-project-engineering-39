package api

import (
	"encoding/json"
	"net/http"
	"time"

	con "project/database"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

func (api *API) Login(c *gin.Context) {
	api.alloworigin(c)
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

	resp, err := api.userRepo.LoginUser(cred.Username, cred.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}
	dataUser := *resp

	if dataUser.Password != cred.Password {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":    http.StatusUnauthorized,
			"message": "user credential invalid",
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

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "login success",
		"data":    dataUser,
	})
}

func (api *API) Register(c *gin.Context) {
	api.alloworigin(c)
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

	_, err = stmt.Exec(reg.Username, reg.Password, reg.Mail, reg.Nama, "user")
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

	_, err = stmt.Exec(reg.Username, reg.Password, reg.Mail, reg.Nama, "admin")
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
