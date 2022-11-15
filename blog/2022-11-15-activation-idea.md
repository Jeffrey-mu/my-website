---
slug: 使用服务器key激活idea
title: 使用服务器key激活idea
authors: Jeffrey
tags: [IDEA]
---

- 进入`https://search.censys.io/`网站搜索栏输入`services.http.response.headers.location: account.jetbrains.com/fls-auth`，查询成功会返回一些IP地址，点击ip进入详情，查看端口80且状态码为302的ip，复制ip地址 输入到idea激活窗口进行激活。
> 例如 http:123.123.123.123
- 如激活失败多尝试几个ip

