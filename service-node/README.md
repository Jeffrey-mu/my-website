# Node Express 项目

### 安装依赖

- 推荐使用 ni 工具

```
$ pnpm install

```

### 启动项目

```
$ pnpm dev
```

### 部署

- 使用`pm2`进行部署

```
$ pm2 start app
```

## 项目目录

```
<!--  -->

README.md
bin          启动路径
model        数据模型
service      服务层
config       配置文件
router       路由
app.go       入口
public       静态资源
db           sequelize orm框架
<!--  -->
```
