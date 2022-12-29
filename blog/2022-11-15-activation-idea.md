---
slug: 使用服务器key激活idea
title: 使用服务器key激活idea
authors: Jeffrey
tags: [IDEA]
---

- 进入`https://search.censys.io/`网站搜索栏输入`services.http.response.headers.location: account.jetbrains.com/fls-auth`，查询成功会返回一些 IP 地址，点击 ip 进入详情，查看端口 80 且状态码为 302 的 ip，复制 ip 地址 输入到 idea 激活窗口进行激活。
  > 例如 http:123.123.123.123
- 如激活失败多尝试几个 ip
