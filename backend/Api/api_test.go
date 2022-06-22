package api_test

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	api "project/api"
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

	It("Register Test", func() {
		db, err := sql.Open("sqlite3", "../database/final_project.db")
		if err != nil {
			panic(err)
		}
		defer db.Close()
		userRepo := repository.NewUserRepo(db)
		userAdmin := repository.NewTaskRepo(db)

		route := api.NewAPI(*userRepo, *userAdmin).Handler()

		bodyReader := strings.NewReader(`{"nama": "user_test_123","username": "user_test_123", "password": "user_test123", "Mail" : "user_test_123z@email.com"}`)
		r, err := http.NewRequest("POST", "/Register", bodyReader)
		w := httptest.NewRecorder()
		if err != nil {
			log.Fatal(err)
		}

		route.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusOK))

		// delete user
		bodyReader = strings.NewReader(`{"username": "user_test_123"}`)
		r, err = http.NewRequest("DELETE", "/DeleteUser", bodyReader)
		w = httptest.NewRecorder()
		if err != nil {
			log.Fatal(err)
		}
		route.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusOK))
	})

	It("Register admin Test", func() {
		db, err := sql.Open("sqlite3", "../database/final_project.db")
		if err != nil {
			panic(err)
		}
		defer db.Close()
		userRepo := repository.NewUserRepo(db)
		userAdmin := repository.NewTaskRepo(db)

		route := api.NewAPI(*userRepo, *userAdmin).Handler()

		bodyReader := strings.NewReader(`{"nama": "user_test_1233","username": "user_test_1232", "password": "user_test1232", "Mail" : "user_test_123z2@email.com"}`)
		r, err := http.NewRequest("POST", "/RegisterAdmin", bodyReader)
		w := httptest.NewRecorder()
		if err != nil {
			log.Fatal(err)
		}

		route.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusOK))

		// delete user
		bodyReader = strings.NewReader(`{"username": "user_test_1232"}`)
		r, err = http.NewRequest("DELETE", "/DeleteUser", bodyReader)
		w = httptest.NewRecorder()
		if err != nil {
			log.Fatal(err)
		}
		route.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusOK))
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
})
