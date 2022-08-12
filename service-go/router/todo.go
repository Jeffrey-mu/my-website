package router

import (
	"main/model"
	"main/service"
	"net/http"

	"github.com/labstack/echo/v4"
)

func Init(e *echo.Echo) {
	e.GET("/todo", func(c echo.Context) error {
		data := service.GetTodoAll()
		result := model.TesultToDoModel{
			Data: data,
			Code: 200,
		}
		return c.JSON(http.StatusOK, result)
	})

	e.PUT("/todo", func(c echo.Context) error {
		data := service.GetTodoAll()
		result := model.TesultToDoModel{
			Data: data,
			Code: 200,
		}
		return c.JSON(http.StatusOK, result)
	})

	e.DELETE("/todo", func(c echo.Context) error {
		id := c.QueryParam("id")
		service.DeleteById(id)
		return c.JSON(http.StatusOK, "删除成功")
	})
}
