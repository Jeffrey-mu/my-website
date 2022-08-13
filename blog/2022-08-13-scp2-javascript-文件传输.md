---
slug: scp2-javascript-文件传输.
title: scp2-javascript-文件传输.
authors: Jeffrey
tags: [scp2, javascript, ftp]
---

# scp2

一个基于 ssh2 的纯 javascript 安全拷贝程序。

## 安装

```bash
pnpm install scp2 -g
```

## 高级 API

```js
var client = require('scp2')

// 将文件复制到服务器：

client.scp(
  'file.txt',
  'admin:password@example.com:/home/admin/',
  function (err) {}
)

// 将文件复制到服务器，将目标指定为对象：
client.scp(
  'file.txt',
  {
    host: 'example.com',
    username: 'admin',
    password: 'password',
    path: '/home/admin/',
  },
  function (err) {}
)

// 将文件复制到服务器并重命名：
client.scp(
  'file.txt',
  'admin:password@example.com:/home/admin/rename.txt',
  function (err) {}
)

// 将目录复制到服务器：
client.scp(
  'data/',
  'admin:password@example.com:/home/admin/data/',
  function (err) {}
)

// 从服务器下载文件：
client.scp(
  'admin:password@example.com:/home/admin/file.txt',
  './',
  function (err) {}
)

// 从服务器下载文件，将目标指定为对象：
client.scp(
  {
    host: 'example.com',
    username: 'admin',
    password: 'password',
    path: '/home/admin/file.txt',
  },
  './',
  function (err) {}
)

// 使用私钥登录：
client.scp(
  'file.txt',
  {
    host: 'example.com',
    username: 'admin',
    privateKey: require('fs').readFileSync('path/to/private/key'),
    passphrase: 'private_key_password',
    path: '/home/admin/',
  },
  function (err) {}
)
```

## 使用 scp2 实现自动部署前端项目

- 创建 deploy.js 文件

```js title="deploy.js"
'use strict'
var client = require('scp2')
let start = +new Date()
const ora = require('ora') //美化控制台
const chalk = require('chalk')
const spinner = ora(chalk.green('正在发布到服务器...'))
spinner.start()
/**
 * 输入服务器信息
 */
client.scp(
  'dist', // 本地项目路径
  {
    host: '101.200.0.0',
    username: 'root',
    password: 123456,
    path: '/usr/local/nginx/html',
  },
  (err) => {
    spinner.stop()
    if (!err) {
      console.log(+new Date() - start + 'ms')
      console.log(chalk.green('项目发布完毕!'))
    } else {
      console.log('发布失败！', err)
    }
  }
)
```

- package.json 添加自动脚本

```json
{
  "scripts": {
    "deploy": "build && node ./deploy"
  }
}
```

1. 发送文件之前需要先 build
2. 终端输入 npm run deploy 即可发布到服务器
