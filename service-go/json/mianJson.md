package main

import (
"database/sql"
"encoding/json"
"fmt"
"io/ioutil"
"net/http"
"os"

    _ "github.com/go-sql-driver/mysql"
    "github.com/labstack/echo/v4"

)

var total int = 0
var DB \*sql.DB

const (
get = "get"
edit = "edit"
insert = "insert"
delete = "delete"
update = "update"
toDoPath = "./db/todo.json"
loginPath = "./db/login.json"
)

func main() {
DB, \_ = sql.Open("mysql", "admin:mc1009jf1018.@tcp(bj-cynosdbmysql-grp-0o0dqcfy.sql.tencentcdb.com:21729)/my-website") //

    data := getRow()
    fmt.Println(data)

    e := echo.New()
    e.Static("/", "static")

    e.GET("/todo", func(c echo.Context) error {
    	total += 1
    	fmt.Println(total)
    	c.Response().Header().Set("Access-Control-Allow-Origin", "*")
    	toType := c.QueryParam("toType")
    	var result string
    	switch toType {
    	case get:
    		result = getResult()
    		fmt.Println(JSONToMap[ToDo](result))
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

    e.GET("/login", func(c echo.Context) error {
    	c.Response().Header().Set("Access-Control-Allow-Origin", "*")
    	name := c.QueryParam("name")
    	var result = []User{}
    	password := c.QueryParam("password")
    	if d, err := ioutil.ReadFile(loginPath); err == nil {
    		users := JSONToMap[User](string(d))
    		for k, v := range users {
    			if v.Name == name && v.Password == password {
    				result = users[k:1]
    			}
    		}
    		fmt.Println(result)
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
newData := JSONToMap[ToDo](data)
var result, _ = json.Marshal(append(JSONToMap[ToDo](<getResult()>), newData...))
f, err := os.OpenFile(toDoPath, os.O_WRONLY|os.O_TRUNC, 0600)
defer f.Close()
if err != nil {
fmt.Println(err.Error())
} else {
_, err = f.Write(result)
}
return string(result)
}

/\*

- 泛型函数 json 转 map
  \*/
  func JSONToMap[T any](str string) []T {
  var tempMap []T
  err := json.Unmarshal([]byte(str), &tempMap)
  if err != nil {
  panic(err)
  }
  return tempMap
  }
