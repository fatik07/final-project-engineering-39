package api_test

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"project/api"
	"project/repository"
	"strings"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	_ "github.com/mattn/go-sqlite3"
)

type TokenStr struct {
	Token string `json:"token"`
}
type loginRespon struct {
	Code    int      `json:"code"`
	Data    TokenStr `json:"data"`
	Message string   `json:"message"`
}

var cookie *http.Cookie
var mainApi *api.API

var DB *sql.DB

var _ = Describe("Api", func() {
	It("Should return Data User when get user", func() {
		db, err := sql.Open("sqlite3", "../database/final_project.db")
		if err != nil {
			panic(err)
		}
		defer db.Close()
		DB = db

		bodyReader := strings.NewReader(`{"username": "nanda", "password": "nanda"}`)

		userRepo := repository.NewUserRepo(db)
		userAdmin := repository.NewTaskRepo(db)

		route := api.NewAPI(*userRepo, *userAdmin).Handler()
		w := httptest.NewRecorder()
		r, err := http.NewRequest("POST", "/Login", bodyReader)
		if err != nil {
			log.Fatal(err)
		}
		route.ServeHTTP(w, r)
		fmt.Println(w.Body.String())
		Expect(w.Code).To(Equal(http.StatusOK))
		var loginRespon loginRespon

		err = json.Unmarshal([]byte(w.Body.String()), &loginRespon)
		if err != nil {
			log.Fatal(err)
		}

		var adaGkCookies bool = false
		if loginRespon.Data.Token != "" {
			adaGkCookies = true
		}
		Expect(adaGkCookies).To(Equal(true))

		cookie = &http.Cookie{Name: "token", Value: loginRespon.Data.Token}
	})

	It("Should return Logout", func() {
		db, err := sql.Open("sqlite3", "../database/final_project.db")
		if err != nil {
			panic(err)
		}
		defer db.Close()
		userRepo := repository.NewUserRepo(db)
		userAdmin := repository.NewTaskRepo(db)

		route := api.NewAPI(*userRepo, *userAdmin).Handler()
		r, err := http.NewRequest("POST", "/Logout", nil)
		w := httptest.NewRecorder()
		if err != nil {
			log.Fatal(err)
		}

		r.AddCookie(cookie)

		route.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusOK))
	})

	It("Should return StatusCode Success(200) Register", func() {
		// TODO:
		db, err := sql.Open("sqlite3", "../database/final_project.db")
		if err != nil {
			panic(err)
		}
		defer db.Close()
		DB = db

		bodyReader := strings.NewReader(`{"nama": "dian", "username": "dian", "mail": "dian", "password": "dian123","role":"user"}`)

		userRepo := repository.NewUserRepo(db)
		userAdmin := repository.NewTaskRepo(db)

		route := api.NewAPI(*userRepo, *userAdmin).Handler()
		w := httptest.NewRecorder()
		r, err := http.NewRequest("POST", "/Register", bodyReader)
		if err != nil {
			log.Fatal(err)
		}
		route.ServeHTTP(w, r)
		fmt.Println(w.Body.String())
		Expect(w.Code).To(Equal(http.StatusOK))
	})

})
