package main

import (
	"Project/Api"
	con "Project/Database"
	repository "Project/Repository"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := con.Connect()
	if err != nil {
		panic(err)
	}

	Repository := repository.NewUserRepo(db)
	mainApi := Api.NewAPI(*Repository)
	mainApi.Start()
}
