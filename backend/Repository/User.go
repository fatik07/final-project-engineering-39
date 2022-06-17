package repository

import "database/sql"

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

func (u *UserRepo) RegisterUser(email string) (*User, error) {
	stmt := `SELECT * FROM user WHERE mail = ?;`

	rows, err := u.db.Query(stmt, email)
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
