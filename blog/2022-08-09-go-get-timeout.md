---
slug: 执行go get 命令没有反应
title: 执行go get 命令没有反应
authors: Jeffrey
tags: [go, linux, nohup]
---


## 直接部署
- 执行go get 命令没有反应，修改hosts也没用
## 开启Go模块代理
```bash
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```
