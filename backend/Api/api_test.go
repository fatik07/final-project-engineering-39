package api_test

import (
	"database/sql"
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

var _ = Describe("Api", func() {
	It("Should return Data User when get user", func() {
		db, err := sql.Open("sqlite3", "../database/final_project.db")
		if err != nil {
			panic(err)
		}
		defer db.Close()

		bodyReader := strings.NewReader(`{"username": "lisa17", "password": "lisa"}`)

		repository := repository.NewUserRepo(db)

		route := api.NewAPI(*repository).Handler()
		w := httptest.NewRecorder()
		r, err := http.NewRequest("POST", "/Login", bodyReader)
		if err != nil {
			log.Fatal(err)
		}
		route.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusOK))
		cookies := w.Result().Cookies()

		var adaGkCookies bool
		for _, c := range cookies {
			if c.Name == "token" {
				adaGkCookies = true
				break
			}
		}
		Expect(adaGkCookies).To(Equal(true))

	})

	It("Should return failed login", func() {
		db, err := sql.Open("sqlite3", "../database/final_project.db")
		if err != nil {
			panic(err)
		}
		defer db.Close()

		bodyReader := strings.NewReader(`{"username": "lisa172", "password": "lisa2"}`)
		repository := repository.NewUserRepo(db)
		route := api.NewAPI(*repository).Handler()
		w := httptest.NewRecorder()
		r, err := http.NewRequest("POST", "/Login", bodyReader)
		if err != nil {
			log.Fatal(err)
		}
		route.ServeHTTP(w, r)
		Expect(w.Code).To(Equal(http.StatusUnauthorized))
	})

})
