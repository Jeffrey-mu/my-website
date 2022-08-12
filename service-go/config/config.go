type Config struct {
	Mysql struct {
		db 				string `default:"host"`
		host 			string `default:"host"`
		port 			int `default:"host"`
		username 	string `default:"host"`
		password 	string `default:"host"`
	}
	Redis struct {
		Enabled             bool `default:"false"`
		ConnectionPoolSize  int
		host 								string `default:"host"`
		port 							  int `default:"port"`
	}
}
