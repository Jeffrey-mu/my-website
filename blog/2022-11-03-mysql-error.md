---
slug: 解决Node.js mysql报错信息
title: 解决Node.js mysql报错信息
authors: Jeffrey
tags: [mysql]
---
> 解决Node.js mysql客户端不支持认证协议引发的“ER_NOT_SUPPORTED_AUTH_MODE”问题

## 报错信息


```shell
file:///Users/wjf/Desktop/learn/node/mysql.js:12
  if (error) throw error;
             ^

Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
    at Handshake.Sequence._packetToError (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/protocol/sequences/Sequence.js:47:14)
    at Handshake.ErrorPacket (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/protocol/sequences/Handshake.js:123:18)
    at Protocol._parsePacket (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/protocol/Protocol.js:291:23)
    at Parser._parsePacket (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/protocol/Parser.js:433:10)
    at Parser.write (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/protocol/Parser.js:43:10)
    at Protocol.write (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/protocol/Protocol.js:38:16)
    at Socket.<anonymous> (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/Connection.js:88:28)
    at Socket.<anonymous> (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/Connection.js:526:10)
    at Socket.emit (node:events:527:28)
    at addChunk (node:internal/streams/readable:315:12)
    --------------------
    at Protocol._enqueue (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/protocol/Protocol.js:144:48)
    at Protocol.handshake (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/protocol/Protocol.js:51:23)
    at Connection.connect (/Users/wjf/Desktop/learn/node/node_modules/.pnpm/mysql@2.18.1/node_modules/mysql/lib/Connection.js:116:18)
    at file:///Users/wjf/Desktop/learn/node/mysql.js:9:12
    at ModuleJob.run (node:internal/modules/esm/module_job:198:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:385:24)
    at async loadESM (node:internal/process/esm_loader:88:5)
    at async handleMainPromise (node:internal/modules/run_main:61:12) {
  code: 'ER_NOT_SUPPORTED_AUTH_MODE',
  errno: 1251,
  sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client',
  sqlState: '08004',
  fatal: true
}

```

## 出错原因


- 导致这个错误的原因是，目前，最新的mysql模块并未完全支持MySQL 8的“caching_sha2_password”加密方式，而“caching_sha2_password”在MySQL 8中是默认的加密方式。因此，下面的方式命令是默认已经使用了“caching_sha2_password”加密方式，该账号、密码无法在mysql模块中使用。

##  解决方法
- 解决方法是从新修改用户root的密码，并指定mysql模块能够支持的加密方式：

```shell
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
```
