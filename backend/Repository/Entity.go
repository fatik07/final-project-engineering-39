package repository

type User struct {
	Id       int    `json:"id"`
	Nama     string `json:"nama"`
	Username string `json:"username"`
	Mail     string `json:"mail"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type Task struct {
	Id        int    `json:"id"`
	Judul     string `json:"judul"`
	Tanggal   string `json:"tanggal"`
	Penulis   string `json:"penulis"`
	Deskripsi string `json:"deskripsi"`
}

type Penulis struct {
	Id   int    `json:"id"`
	Nama string `json:"nama"`
}
