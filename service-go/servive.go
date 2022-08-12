package main

import (
	"database/sql"
	"fmt"
)

// 测试
func getRow() (row Test) {
	sql := "select * from test"
	row = Test{}
	err := DB.QueryRow(sql).Scan(&row.Name)
	if err != nil {
		return Test{}
	}
	return
}

// 查询代办事项列表
func getTodoAll() (result []ToDo) {
	sql := "select id, title, name, description, date, state from todo"
	todo := ToDo{}
	data, err := DB.Query(sql)
	var i = 0
	for data.Next() {
		//循环插入所有的数据
		data.Scan(&todo.ID, &todo.Title, &todo.Name, &todo.Description, &todo.Date, &todo.State)
		fmt.Println("todo", todo)
		result = append(result, todo)
		i++
	}
	if err != nil {
		return []ToDo{}
	}

	return
}

// 根据id删除数据
func (todo *ToDo) deleteById() (data sql.Result) {
	stmt, err := DB.Prepare(`delete from todo where id=?`)
	data, err = stmt.Exec(todo.ID)
	if err != nil {
	}
	return
}
