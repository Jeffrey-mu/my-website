package main

import (
	"database/sql"
	"net/http"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
)

var DB *sql.DB

func main() {
	DB, _ = sql.Open("mysql", "admin:mc1009jf1018.@tcp(bj-cynosdbmysql-grp-0o0dqcfy.sql.tencentcdb.com:21729)/my-website") //

	e := echo.New()
	e.Static("/", "static")
	e.GET("/todo", func(c echo.Context) error {

		data := getTodoAll()
		result := TesultToDoModel{
			Data: data,
			Code: 200,
		}
		return c.JSON(http.StatusOK, result)
	})

	e.PUT("/todo", func(c echo.Context) error {
		data := getTodoAll()
		result := TesultToDoModel{
			Data: data,
			Code: 200,
		}
		return c.JSON(http.StatusOK, result)
	})

	e.DELETE("/todo", func(c echo.Context) error {
		id, _ := strconv.Atoi(c.QueryParam("id"))
		todo := ToDo{
			ID: id,
		}
		todo.deleteById()
		return c.JSON(http.StatusOK, "删除成功")
	})
	e.Logger.Fatal(e.Start(":1323"))
}
