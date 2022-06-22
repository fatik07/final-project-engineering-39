package repository

import (
	"database/sql"
)

type AdminRepo struct {
	db *sql.DB
}

func NewTaskRepo(db *sql.DB) *AdminRepo {
	return &AdminRepo{db: db}
}

func (a *AdminRepo) GetTask() ([]Task, error) {
	rows, err := a.db.Query(`SELECT * FROM task`)
	if err != nil {
		return []Task{}, err
	}

	defer rows.Close()

	result := []Task{}
	for rows.Next() {
		admin := Task{}
		err = rows.Scan(&admin.Id, &admin.Judul, &admin.Tanggal, &admin.Penulis, &admin.Deskripsi)
		if err != nil {
			return []Task{}, err
		}
		result = append(result, admin)
	}

	return result, nil
}
func (a *AdminRepo) GetTaskById(id int) (Task, error) {
	row := a.db.QueryRow(`SELECT * FROM task where id=?`, id)

	admin := Task{}
	err := row.Scan(&admin.Id, &admin.Judul, &admin.Tanggal, &admin.Penulis, &admin.Deskripsi)
	if err != nil {
		return admin, err
	}

	return admin, nil
}
func (a *AdminRepo) PutTask(judul string, tanggal string, penulis string, deskripsi string) (int64, error) {
	sqlStatement := `INSERT INTO task (Judul, Tanggal, Id_Penulis, Deskripsi) VALUES (?, ?, ?, ?);`

	stmt, err := a.db.Prepare(sqlStatement)
	if err != nil {
		panic(err)
	}

	defer stmt.Close()

	result, err := stmt.Exec(judul, tanggal, penulis, deskripsi)
	if err != nil {
		panic(err)
	}

	return result.LastInsertId()
}
func (a *AdminRepo) UpdateTask(id int, judul string, tanggal string, penulis string, deskripsi string) (int64, error) {
	sqlStatement := `UPDATE task SET Judul = ?, Tanggal = ?, Id_Penulis = ?, Deskripsi = ? WHERE id = ?;`

	stmt, err := a.db.Prepare(sqlStatement)
	if err != nil {
		panic(err)
	}

	defer stmt.Close()

	result, err := stmt.Exec(judul, tanggal, penulis, deskripsi, id)
	if err != nil {
		panic(err)
	}

	return result.RowsAffected()
}
func (a *AdminRepo) DeleteTask(id int) (int64, error) {
	sqlStatement := `DELETE FROM task WHERE id = ?;`

	// stmt, err := a.db.Prepare(sqlStatement, id)
	// if err != nil {
	// 	panic(err)
	// }

	// defer stmt.Close()

	result, err := a.db.Exec(sqlStatement, id)
	if err != nil {
		panic(err)
	}

	return result.RowsAffected()
}

func (a *AdminRepo) GetPenulis() ([]Penulis, error) {
	rows, err := a.db.Query(`SELECT * FROM penulis;`)
	if err != nil {
		return []Penulis{}, err
	}

	defer rows.Close()

	result := []Penulis{}
	for rows.Next() {
		author := Penulis{}
		err = rows.Scan(&author.Id, &author.Nama)
		if err != nil {
			return []Penulis{}, err
		}
		result = append(result, author)
	}

	return result, nil
}
