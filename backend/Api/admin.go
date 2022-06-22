package api

import (
	"log"
	"net/http"
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
	} else if task.IdPenulis == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Penulis tidak boleh kosong"})
		return
	} else if task.Deskripsi == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Deskripsi tidak boleh kosong"})
		return
	}

	_, err := api.adminRepo.PutTask(task.Judul, task.Tanggal, task.IdPenulis, task.Deskripsi)
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
	} else if task.IdPenulis == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Penulis tidak boleh kosong"})
		return
	} else if task.Deskripsi == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Deskripsi tidak boleh kosong"})
		return
	}

	_, err := api.adminRepo.UpdateTask(task.Id, task.Judul, task.Tanggal, task.IdPenulis, task.Deskripsi)
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
	if c.Query("search") != "" {
		api.Search(c)
		return
	}
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

func (api *API) GetTaskById(c *gin.Context) {
	api.alloworigin(c)
	id, err := strconv.Atoi(c.Query("id"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": http.StatusInternalServerError,
		})
	}
	task, err := api.adminRepo.GetTaskById(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code": http.StatusInternalServerError,
		})
	}
	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Materi berhasil ditampilkan",
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

func (api *API) Get_Penulis(c *gin.Context) {
	api.alloworigin(c)
	penulis, err := api.adminRepo.GetPenulis()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":    http.StatusInternalServerError,
			"message": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Berhasil",
		"data":    penulis,
	})

}

func (api *API) Search(c *gin.Context) {
	api.alloworigin(c)
	search := c.Query("search")
	task, err := api.adminRepo.SearchTask(search)
	if err != nil {
		c.JSON(400, gin.H{
			"status":  400,
			"message": err.Error(),
		})
		return
	}

	if len(task) == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"code":    http.StatusNotFound,
			"message": "Data tidak ditemukan",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "Berhasil",
		"data":    task,
	})
}
