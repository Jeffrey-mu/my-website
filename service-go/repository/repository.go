package repository

import (
	"database/sql"
	"main/global"
)

func Init() {
	global.DB, _ = sql.Open("mysql", "admin:mc1009jf1018.@tcp(bj-cynosdbmysql-grp-0o0dqcfy.sql.tencentcdb.com:21729)/my-website")
	// global.DB.Close()
}
