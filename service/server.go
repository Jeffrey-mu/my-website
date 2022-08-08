package main

import (
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

type ToDo struct {
	Title   string `json:"title" form:"title" query:"title"`
	Content string `json:"content" form:"content" query:"content"`
	Date    string `json:"date" form:"date" query:"date"`
	ID      int    `json:"id" form:"id" query:"id"`
}

const (
	get    = "get"
	edit   = "edit"
	append = "append"
	delete = "delete"
	update = "update"
)

func main() {
	e := echo.New()
	e.Static("/static", "static")
	e.GET("/todo", func(c echo.Context) error {
		c.Response().Header().Set("Access-Control-Allow-Origin", "*")
		toType := c.QueryParam("toType")
		var result string
		switch toType {
		case get:
			result = getResult()
		case edit:
			break
		case append:
			break
		}
		return c.JSON(http.StatusOK, result)
	})
	e.Logger.Fatal(e.Start(":1323"))
}
func getResult() string {
	var result string
	if d, err := ioutil.ReadFile("./db/todo.json"); err == nil {
		result = string(d)
	}
	return result
}
