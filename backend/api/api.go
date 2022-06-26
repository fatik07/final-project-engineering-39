package api

import (
	"fmt"
	repository "project/repository"

	"github.com/gin-contrib/cors"
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
	//User//
	gin.Any("/Login", api.Login)
	gin.Any("/Register", api.Register)
	gin.POST("/Logout", api.AuthMiddleWare(api.Logout))
	gin.Use(cors.Default())
	//admin//
	gin.Any("/RegisterAdmin", api.RegisterAdmin)
	gin.PUT("/Edit", api.AuthMiddleWare(api.AdminMiddleware(api.UpdateTask)))
	gin.Any("/Add", api.AuthMiddleWare(api.AdminMiddleware(api.CreateTask)))
	gin.DELETE("/Delete", api.AuthMiddleWare(api.AdminMiddleware(api.DeleteTask)))
	gin.GET("/GetPenulis", api.AuthMiddleWare(api.AdminMiddleware(api.Get_Penulis)))
	gin.GET("/Get", api.AuthMiddleWare(api.GetTask))
	gin.GET("/GetTaskById", api.AuthMiddleWare(api.GetTaskById))
	gin.GET("/MyProfile", api.AuthMiddleWare(api.GetProfile))
	gin.GET("/Pagination", api.AuthMiddleWare(api.pagination))
	//buat testing aja with ginkgo :)
	gin.DELETE("/DeleteUser", api.DeleteUser)
	return api
}

func (api *API) Handler() *gin.Engine {
	return api.gin
}

func (api *API) Start() {
	fmt.Println("http://localhst:8008/")
	api.Handler().Run(":8008")
}
