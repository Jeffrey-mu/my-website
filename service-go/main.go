package main

import (
	"main/repository"
	"main/router"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	repository.Init()
	router.Init(e)
	e.Static("/", "static")

	e.Logger.Fatal(e.Start(":1323"))
}
