package service

import (
	"database/sql"
	"fmt"
	global "main/global"
	"main/model"
)

// 测试
func GetRow() (row model.Test) {
	sql := "select * from test"
	row = model.Test{}
	err := global.DB.QueryRow(sql).Scan(&row.Name)
	if err != nil {
		return model.Test{}
	}
	return
}

// 查询代办事项列表
func GetTodoAll() (result []model.ToDo) {
	sql := "select id, title, name, description, date, state from todo"
	todo := model.ToDo{}
	data, err := global.DB.Query(sql)
	var i = 0
	for data.Next() {
		//循环插入所有的数据
		data.Scan(&todo.ID, &todo.Title, &todo.Name, &todo.Description, &todo.Date, &todo.State)
		fmt.Println("todo", todo)
		result = append(result, todo)
		i++
	}
	if err != nil {
		return []model.ToDo{}
	}

	return
}

// 根据id删除数据
func DeleteById(id string) (data sql.Result) {
	stmt, err := global.DB.Prepare(`delete from todo where id=?`)
	data, err = stmt.Exec(id)
	if err != nil {
	}
	return
}
