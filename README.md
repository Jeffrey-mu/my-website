# 网站

该网站是使用现代静态网站生成器 [Docusaurus 2](https://docusaurus.io/) 构建的。

## 项目目录
```
README.md
service-node      Node服务端代码
service-go        Go服务端代码
docs              文档笔记
blog              博客
src               项目源码
build             构建产物
```
### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

此命令启动本地开发服务器并打开浏览器窗口。大多数更改都会实时反映，而无需重新启动服务器。

### Build

```
$ yarn build
```

此命令将静态内容生成到“build”目录中，并且可以使用任何静态内容托管服务提供服务。
