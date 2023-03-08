# nohub

- nohup命令是一个用于在后台运行命令的工具。它能够让用户在退出终端或关闭SSH连接后，仍然能够保持命令的运行。

nohup命令的语法格式如下：

```bash
nohup [options] command [arg...]
```
其中，options为可选参数，command为要在后台运行的命令，arg为命令的参数。

nohup命令的常用选项包括：
- -n：不将输出写入nohup.out文件中。
- -p：指定进程号，将命令附加到该进程上。
- -help：显示帮助信息。

nohup命令的常见用法包括：
- 后台运行命令：nohup command &
- 将输出重定向到指定文件：nohup command > output.log &
- 指定进程号：nohup -p pid command &
使用nohup命令时，需要注意以下几点：

- 如果命令需要从终端输入数据，则需要在命令后面加上 < /dev/null，否则nohup命令会将输入重定向到nohup.out文件中。
- nohup命令会将输出重定向到nohup.out文件中，如果不需要输出，可以使用 -n 选项禁止输出。
- nohup命令会将命令放入后台运行，如果需要查看命令的状态，可以使用ps命令查看进程号，再使用kill命令结束进程。
