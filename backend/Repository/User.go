package repository

import (
	"database/sql"
)

type UserRepo struct {
	db *sql.DB
}

func NewUserRepo(db *sql.DB) *UserRepo {
	return &UserRepo{db: db}
}

func (u *UserRepo) LoginUser(username string) (*User, error) {
	sqlStatement := `SELECT * FROM user WHERE Username = ?;`

	rows, err := u.db.Query(sqlStatement, username)
	if err != nil {
		return nil, err
	}

	var user User
	for rows.Next() {
		err = rows.Scan(&user.Id, &user.Nama, &user.Username, &user.Mail, &user.Password, &user.Role)
		if err != nil {
			return nil, err
		}
	}

	return &user, nil
}

// func (u *UserRepo) RegisterUser(email string) (*User, error) {
// 	stmt := `SELECT * FROM user WHERE mail = ?;`

// 	rows, err := u.db.Query(stmt, email)
// 	if err != nil {
// 		return nil, err
// 	}

// 	var user User
// 	for rows.Next() {
// 		err = rows.Scan(&user.Id, &user.Nama, &user.Username, &user.Mail, &user.Password, &user.Role)
// 		if err != nil {
// 			return nil, err
// 		}
// 	}

// 	return &user, nil
// }

func (u *UserRepo) RegisterUser(regis RegisterRequest) (*User, error) {
	stmt := `INSERT INTO user (username, password, mail, nama ,role) 
	VALUES (?, ?, ?, ?, ?);`

	rows, err := u.db.Query(stmt, regis.Username, regis.Password, regis.Mail, regis.Nama, regis.Role)
	if err != nil {
		return nil, err
	}

	var user User
	for rows.Next() {
		err = rows.Scan(&user.Id, &user.Nama, &user.Username, &user.Mail, &user.Password, &user.Role)
		if err != nil {
			return nil, err
		}
	}

	return &user, nil
}

func (u *UserRepo) CheckAccount(username, mail string) (*User, error) {
	sqlStatement := `SELECT * FROM user WHERE username = ? or mail = ?;`

	rows, err := u.db.Query(sqlStatement, username, mail)
	if err != nil {
		return nil, err
	}

	var user User
	for rows.Next() {
		err = rows.Scan(&user.Id, &user.Nama, &user.Username, &user.Mail, &user.Password, &user.Role)
		if err != nil {
			return nil, err
		}
	}

	return &user, nil
}

func (u *UserRepo) GetProfile(username string) (*User, error) {
	sqlStatement := `SELECT * FROM user WHERE username = ?;`

	rows, err := u.db.Query(sqlStatement, username)
	if err != nil {
		return nil, err
	}

	var user User
	for rows.Next() {
		err = rows.Scan(&user.Id, &user.Nama, &user.Username, &user.Mail, &user.Password, &user.Role)
		if err != nil {
			return nil, err
		}
	}

	return &user, nil
}

func (u *UserRepo) Allbuku(limit int, offset int) ([]Task, error) {
	sqlStmt := `
	SELECT
		g.Id AS id,
		g.judul AS judul,
		g.tanggal AS tanggal,
		g.id_penulis AS id_penulis,
		g.deskripsi AS deskripsi
	FROM
		task AS g
	JOIN penulis AS u ON (u.id = g.id_penulis)
	LIMIT ?
	OFFSET ?
	`

	rows, err := u.db.Query(sqlStmt, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	books := []Task{}
	for rows.Next() {
		var book Task
		err := rows.Scan(
			&book.Id,
			&book.Judul,
			&book.Tanggal,
			&book.Penulis,
			&book.Deskripsi,
		)
		if err != nil {
			return nil, err
		}
		books = append(books, book)
	}
	return books, nil
}

func (u *UserRepo) GetbukuRow() (int, error) {
	sqlStmt := `SELECT COUNT(*) FROM task`
	var total int
	err := u.db.QueryRow(sqlStmt).Scan(&total)
	if err != nil {
		return total, err
	}

	return total, nil
}

func (u *UserRepo) DeleteUser(username string) error {
	_, err := u.db.Exec("DELETE FROM user WHERE username = ?", username)
	if err != nil {
		return err
	}

	return nil
}
