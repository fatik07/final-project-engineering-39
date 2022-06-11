package Api

import (
	repository "Project/Repository"
	"fmt"

	"github.com/gin-gonic/gin"
)

type API struct {
	userRepo repository.UserRepo
	gin      *gin.Engine
}

func NewAPI(userRepo repository.UserRepo) *API {
	gin := gin.Default()
	api := &API{
		userRepo: userRepo,
		gin:      gin,
	}

	gin.POST("/Register", api.Register)
	gin.POST("/Login", api.Login)
	gin.POST("/RegisterAdmin", api.RegisterAdmin)
	gin.POST("/Logout", api.Logout)

	return api
}

func (api *API) Handler() *gin.Engine {
	return api.gin
}

func (api *API) Start() {
	fmt.Println("http://localhost:8008/")
	api.Handler().Run(":8008")
}
