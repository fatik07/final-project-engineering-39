package main

import (
	"project/api"
	con "project/database"
	repository "project/repository"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := con.Connect()
	if err != nil {
		panic(err)
	}

	repository := repository.NewUserRepo(db)
	mainApi := api.NewAPI(*repository)
	mainApi.Start()
}
