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

	ap, err := CreateTablePenulis(db)
	if err != nil {
		panic(err)
	}
	println(ap)
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
		Id_Penulis integer not null,
		Deskripsi varchar(255) not null,
		FOREIGN KEY (id_penulis) REFERENCES penulis(id)
	);

	`)
	if err != nil {
		return "Failed Make Table", err
	}
	return "Succes Make Table", nil

}

func CreateTablePenulis(db *sql.DB) (string, error) {
	_, err := db.Exec(`
	CREATE TABLE IF NOT EXISTS penulis (
		Id integer not null primary key AUTOINCREMENT,
		nama varchar(255) not null
	);

	`)
	if err != nil {
		return "Failed Make Table", err
	}
	//return "Succes Make Table", nil

	_, err = db.Exec(`

	INSERT INTO Penulis(nama) VALUES
	('Ali bin abu thalib'),
		('Muhammad kevin'),
		('Pogba'),
		('Paul mcgregor'),
		('Cristiano Ronaldo'),
		('Lionel Messi'),
		('Ahmed'),
		('Theo'),
		('MR.Potato'),
		('Neymar'),
		('Fachri'),
		('MR.Tea');`)

	if err != nil {
		return "Failed Make Table", err
	}
	return "Succes Make Table", nil

}
