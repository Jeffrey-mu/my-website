package model

type Test struct {
	Name string `json:"name"`
}
type ToDo struct {
	Title       string `json:"title" form:"title" query:"title"`
	Name        string `json:"name" form:"name" query:"name"`
	Description string `json:"description" form:"description" query:"description"`
	Date        string `json:"date" form:"date" query:"date"`
	ID          int    `json:"id" form:"id" query:"id"`
	State       int    `json:"state" form:"state" query:"state"`
}
type User struct {
	Name     string `json:"name" form:"name" query:"name"`
	Password string `json:"password" form:"password" query:"password"`
	Email    string `json:"email" form:"Email" query:"Email"`
}

type TesultTestModel struct {
	Code int  `json:"code" form:"code" query:"code"`
	Data Test `json:"data" form:"data" query:"data"`
}
type TesultToDoModel struct {
	Code int    `json:"code" form:"code" query:"code"`
	Data []ToDo `json:"data" form:"data" query:"data"`
}
