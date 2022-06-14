package main

import (
	"database/sql"

	con "project/database"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := con.Connect()
	if err != nil {
		panic(err)
	}
	defer db.Close()
	asd, err := CreateTable(db)
	if err != nil {
		panic(err)
	}
	println(asd)
}

func CreateTable(db *sql.DB) (string, error) {
	_, err := db.Exec(`
	CREATE TABLE IF NOT EXISTS user (
		Id integer not null primary key AUTOINCREMENT,
		Nama varchar(255) not null,
		Username varchar(255) not null UNIQUE,
		mail varchar(255) not null UNIQUE,
		Password varchar(255) not null,
		role varchar(255) not null
	);

	INSERT INTO user (Nama, Username, mail, Password, role) 
	VALUES 
	("admin", "admin", "admin", "admin", "admin"),
	("jisoo", "jisookim","jisoo@email.com", "jisoo", "user"),
	("lisa", "lisa17", "lisa@gmail.com", "lisa","admin");
	
	
	`)
	if err != nil {
		return "Failed Make Table", err
	}
	return "Succes Make Table", nil

}
