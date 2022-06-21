package api

import (
	"fmt"
	repository "project/repository"

	"github.com/gin-gonic/gin"
)

type API struct {
	userRepo  repository.UserRepo
	adminRepo repository.AdminRepo
	gin       *gin.Engine
}

func NewAPI(userRepo repository.UserRepo, adminRepo repository.AdminRepo) *API {
	gin := gin.Default()
	api := &API{
		userRepo:  userRepo,
		adminRepo: adminRepo,
		gin:       gin,
	}

	gin.Any("/Register", api.Register)
	gin.Any("/Login", api.Login)
	gin.Any("/RegisterAdmin", api.RegisterAdmin)
	gin.POST("/Logout", api.AuthMiddleWare(api.Logout))
	gin.GET("/Show", api.GetTask)
	gin.POST("/Add", api.AuthMiddleWare(api.CreateTask))
	gin.PUT("/Edit", api.AuthMiddleWare(api.UpdateTask))
	gin.DELETE("/Delete", api.DeleteTask)
	gin.GET("/GetPenulis", api.Get_Penulis)
	gin.GET("/MyProfile", api.AuthMiddleWare(api.GetProfile))
	return api
}

func (api *API) Handler() *gin.Engine {
	return api.gin
}

func (api *API) Start() {
	fmt.Println("http://localhst:8008/")
	api.Handler().Run(":8008")
}
