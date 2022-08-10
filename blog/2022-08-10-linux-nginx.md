---
slug: linux nginx
title: linux 安装 nginx
authors: Jeffrey
tags: [linux, nginx]
---

# Linux Nginx安装及使用
- 如果未安装gcc 和gcc-c++可能需要先安装

```bash
yum -y install gcc
yum -y install gcc-c++
```
## 一、下载
- [nginx.org/](http://nginx.org/)下载
## 二、解压
将下载好的`nginx-x.x.x.tar.gz`包上传指服务器

tar -zxvf `nginx-x.x.x.tar.gz` 解压安装包

## 三、执行配置文件
解压成功后
依次执行一下命令
```bash
1、cd nginx-x.x.x    #进入nginx目录
2、./configure        #执行配置文件
```
执行自动配置报错，具体错误信息去下：

>./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=path option.

需要安装PCRE，具体命令如下：
```bash
yum -y install pcre-devel openssl openssl-devel

3、make               #手动安装
4、make install       #若不确定再执行次文件
whereis nginx #查看安装目录/usr/local/nginx
cd /usr/local/nginx/sbin # 进入sbin文件执行

5、./nginx #启动nginx 访问ip:80/
```
## 四、Nginx常用命令
```bash
./nginx #启动
./nginx -s stop #停止
./nginx -s quit #安全退出
./nginx -s reload #重新加载配置文件
ps -ef|grep nginx  #查看Nginx进程
```
