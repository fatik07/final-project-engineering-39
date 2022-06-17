package api

import (
	"log"
	"net/http"
	con "project/database"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (api *API) CreateTask(c *gin.Context) {
	api.alloworigin(c)
	var task CreateTaskInput
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if task.Judul == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Judul tidak boleh kosong"})
		return
	} else if task.Tanggal == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Tanggal tidak boleh kosong"})
		return
	} else if task.Penulis == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Penulis tidak boleh kosong"})
		return
	} else if task.Deskripsi == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Deskripsi tidak boleh kosong"})
		return
	}

	_, err := api.adminRepo.PutTask(task.Judul, task.Tanggal, task.Penulis, task.Deskripsi)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	query := `INSERT INTO task (judul, tanggal, penulis, deskripsi) VALUES (?, ?, ?, ?);`
	stmt, err := con.DB.Prepare(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	_, err = stmt.Exec(task.Judul, task.Tanggal, task.Penulis, task.Deskripsi)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Materi berhasil ditambahkan",
	})
}

func (api *API) UpdateTask(c *gin.Context) {
	api.alloworigin(c)
	var task UpdateTaskInput
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if task.Id == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Id tidak boleh kosong"})
		return
	} else if task.Judul == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Judul tidak boleh kosong"})
		return
	} else if task.Tanggal == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Tanggal tidak boleh kosong"})
		return
	} else if task.Penulis == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Penulis tidak boleh kosong"})
		return
	} else if task.Deskripsi == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Deskripsi tidak boleh kosong"})
		return
	}

	_, err := api.adminRepo.UpdateTask(task.Id, task.Judul, task.Tanggal, task.Penulis, task.Deskripsi)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	query := `UPDATE task SET judul = ?, tanggal = ?, penulis = ?, deskripsi = ? WHERE id = ?;`
	stmt, err := con.DB.Prepare(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	_, err = stmt.Exec(task.Judul, task.Tanggal, task.Penulis, task.Deskripsi, task.Id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Materi berhasil diubah",
	})
}

func (api *API) GetTask(c *gin.Context) {
	api.alloworigin(c)
	task, err := api.adminRepo.GetTask()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Materi berhasil ditambahkan",
		"data":    task,
	})
}

func (api *API) DeleteTask(c *gin.Context) {
	api.alloworigin(c)
	id, _ := strconv.Atoi(c.Query("id"))
	log.Println(id)
	task, err := api.adminRepo.DeleteTask(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Materi berhasil dihapus",
		"data":    task,
	})
}
