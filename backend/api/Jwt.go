package api

import (
	"github.com/golang-jwt/jwt/v4"
)

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password`
}
type Registration struct {
	Nama     string `json:"nama"`
	Username string `json:"username"`
	Mail     string `json:"mail"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

var jwtKey = []byte("key")

type Claims struct {
	Id       int `json:"id"`
	Username string
	Role     string
	jwt.StandardClaims
}

type CreateTaskInput struct {
	Judul     string `json:"judul"`
	Tanggal   string `json:"tanggal"`
	IdPenulis int    `json:"Id_Penulis"`
	Deskripsi string `json:"deskripsi"`
}

type UpdateTaskInput struct {
	Id        int    `json:"id"`
	Judul     string `json:"judul"`
	Tanggal   string `json:"tanggal"`
	IdPenulis int    `json:"id_Penulis"`
	Deskripsi string `json:"deskripsi"`
}

type Result struct {
	Status     bool        `json:"status"`
	Code       int         `json:"code"`
	Message    string      `json:"message"`
	Data       interface{} `json:"data"`
	Pagination *Pagination `json:"pagination,omitempty"`
}

type Pagination struct {
	Total     int `json:"total"`
	Page      int `json:"page"`
	PerPage   int `json:"per_page"`
	TotalPage int `json:"total_page"`
}
