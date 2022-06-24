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

	//ex:  http://localhost:8008/auth/login
	auth := gin.Group("/auth")
	{
		auth.Any("/register-admin", api.RegisterAdmin)
		auth.Any("/login", api.Login)
		auth.Any("/register", api.Register)
		auth.POST("/logout", api.AuthMiddleWare(api.Logout))
	}
	//ex:  http://localhost:8008/admin/add
	admin := gin.Group("/admin")
	{
		admin.PUT("/edit", api.AuthMiddleWare(api.AdminMiddleware(api.UpdateTask)))
		admin.POST("/add", api.AuthMiddleWare(api.AdminMiddleware(api.CreateTask)))
		admin.DELETE("/delete", api.AuthMiddleWare(api.AdminMiddleware(api.DeleteTask)))
		admin.GET("/get-penulis", api.AuthMiddleWare(api.AdminMiddleware(api.Get_Penulis)))
	}

	//ex:  http://localhost:8008/task/get
	task := gin.Group("/task")
	{
		task.GET("/pagination", api.AuthMiddleWare(api.pagination))
		task.GET("/get-task-by-id", api.AuthMiddleWare(api.GetTaskById))
		task.GET("/get", api.AuthMiddleWare(api.GetTask))
	}

	//ex:  http://localhost:8008/user/my-profile
	user := gin.Group("/user")
	{
		user.GET("/my-profile", api.AuthMiddleWare(api.GetProfile))
	}

	// gin.Any("/RegisterAdmin", api.RegisterAdmin)
	// gin.PUT("/Edit", api.AuthMiddleWare(api.AdminMiddleware(api.UpdateTask)))
	// gin.POST("/Add", api.AuthMiddleWare(api.AdminMiddleware(api.CreateTask)))
	// gin.DELETE("/Delete", api.AuthMiddleWare(api.AdminMiddleware(api.DeleteTask)))
	// gin.GET("/GetPenulis", api.AuthMiddleWare(api.AdminMiddleware(api.Get_Penulis)))
	// gin.GET("/Get", api.AuthMiddleWare(api.GetTask))
	// gin.GET("/GetTaskById", api.AuthMiddleWare(api.GetTaskById))
	// gin.GET("/MyProfile", api.AuthMiddleWare(api.GetProfile))
	// gin.GET("/Pagination", api.AuthMiddleWare(api.pagination))

	//User//
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
