# git 操作输入密码问题

- 【mac 两步操作，避免每次 git pull /git push 都需要输入密码的解决方案】

## 首先执行 `ssh-add -L`

```bash
$ ssh-add -L
The agent has no identities.
```

## 再执行一次`ssh-add` **输入密码就好了**

```bash
$ ssh-add
Enter passphrase for /Users/wjf/.ssh/id_rsa:
Identity added: /Users/wjf/.ssh/id_rsa (xxxxxx@qq.com)
```
