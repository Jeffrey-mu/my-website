#  1、pm2需要全局安装
> npm install -g pm2
# 2、进入项目根目录

## 2.1 启动进程/应用 
> pm2 start bin/www 或 pm2 start app.js

## 2.2 重命名进程/应用 
> pm2 start app.js --name wb123

## 2.3 添加进程/应用 watch 
> pm2 start bin/www --watch

## 2.4 结束进程/应用 
> pm2 stop www

## 2.5 结束所有进程/应用 
> pm2 stop all

## 2.6 删除进程/应用 
> pm2 delete www

## 2.7 删除所有进程/应用 
> pm2 delete all

## 2.8 列出所有进程/应用 
> pm2 list

## 2.9 查看某个进程/应用具体情况 
> pm2 describe www

## 2.10 查看进程/应用的资源消耗情况 
> pm2 monit

## 2.11 查看pm2的日志 
> pm2 logs

## 2.11.1 删除日志

> pm2 flush

## 2.12 若要查看某个进程/应用的日志,使用 
> pm2 logs www

## 2.13 重新启动进程/应用 
> pm2 restart www

## 2.14 重新启动所有进程/应用 
> pm2 restart all

# 分布式部署（负载均衡）

## 1、增加多少工作线程

>pm2 scale app +3

## 2、减少多少工作线程

> 