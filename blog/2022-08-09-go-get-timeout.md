---
slug: 执行go get 命令没有反应
title: 执行go get 命令没有反应
authors: Jeffrey
tags: [go, linux, nohup]
---

## 直接部署

- 执行 go get 命令没有反应，修改 hosts 也没用

## 开启 Go 模块代理

```bash
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```
