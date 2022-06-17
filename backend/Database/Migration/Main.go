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

	ad, err := CreateTableTask(db)
	if err != nil {
		panic(err)
	}
	println(ad)
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

	`)
	if err != nil {
		return "Failed Make Table", err
	}
	return "Succes Make Table", nil

}

func CreateTableTask(db *sql.DB) (string, error) {
	_, err := db.Exec(`
	CREATE TABLE IF NOT EXISTS task (
		Id integer not null primary key AUTOINCREMENT,
		Judul varchar(255) not null,
		Tanggal varchar(255) not null,
		Penulis varchar(255) not null,
		Deskripsi varchar(255) not null
	);

	`)
	if err != nil {
		return "Failed Make Table", err
	}
	return "Succes Make Table", nil

}
