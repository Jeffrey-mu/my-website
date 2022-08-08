package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
)

var total int = 0

type ToDo struct {
	Title       string `json:"title" form:"title" query:"title"`
	Name        string `json:"name" form:"name" query:"name"`
	Description string `json:"description" form:"description" query:"description"`
	Date        string `json:"date" form:"date" query:"date"`
	ID          int    `json:"id" form:"id" query:"id"`
}

const (
	get      = "get"
	edit     = "edit"
	insert   = "insert"
	delete   = "delete"
	update   = "update"
	toDoPath = "./db/todo.json"
)

func main() {
	e := echo.New()
	e.Static("/static", "static")
	e.GET("/todo", func(c echo.Context) error {
		total += 1
		fmt.Println(total)
		c.Response().Header().Set("Access-Control-Allow-Origin", "*")
		toType := c.QueryParam("toType")
		var result string
		switch toType {
		case get:
			result = getResult()
			fmt.Println(JSONToMap(result))
			break
		case edit:
			break
		case insert:
			data := c.QueryParam("data")
			result = insertResult(data)
			break
		}
		return c.JSON(http.StatusOK, result)
	})
	e.Logger.Fatal(e.Start(":1323"))
}

// 查询数据
func getResult() string {
	var result string
	if d, err := ioutil.ReadFile(toDoPath); err == nil {
		result = string(d)
	}
	return result
}

// 删除数据
func deleteResult() string {
	var result string
	if d, err := ioutil.ReadFile(toDoPath); err == nil {
		result = string(d)
	}
	return result
}

// 插入数据
func insertResult(data string) string {
	fmt.Println(data)
	newData := JSONToMap(data)
	var result, _ = json.Marshal(append(JSONToMap(getResult()), newData...))
	f, err := os.OpenFile(toDoPath, os.O_WRONLY|os.O_TRUNC, 0600)
	defer f.Close()
	if err != nil {
		fmt.Println(err.Error())
	} else {
		_, err = f.Write(result)
	}
	return string(result)
}

// json转map
func JSONToMap(str string) []ToDo {
	var tempMap []ToDo
	err := json.Unmarshal([]byte(str), &tempMap)
	if err != nil {
		panic(err)
	}
	return tempMap
}
