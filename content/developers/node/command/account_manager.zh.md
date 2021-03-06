---
title: 账号管理
weight: 2
typeof: developers
---

Starcoin 节点内置了一个去中心化的钱包，用户可以通过账号相关的接口以及命令来管理自己的账号。

<!--more-->

节点启动的时候，会自动创建一个默认账号，默认密码是空。默认可以通过账号相关的命令进行变更。以下命令需要连接到控制台进行操作，连接方式请参看[使用 starcoin 控制台](../console)。

 1. 创建账号

```bash
starcoin% account create -p my-pass
{
  "ok": {
    "address": "0x8771ab46ae92feef64749b9feaeede9b",
    "is_default": false,
    "is_readonly": false,
    "public_key": "0x50b42d796fd9bceafc5d146aedc1083b36d8ac3bafcebb5a9532a02d9b0f6dbb",
    "receipt_identifier": "stc1psac6k34wjtlw7er5nw074mk7nvv4gv6j"
  }
}
```

2. 查看账号

```bash
starcoin% account show 0x8771ab46ae92feef64749b9feaeede9b
{
  "ok": {
    "account": {
      "address": "0x8771ab46ae92feef64749b9feaeede9b",
      "is_default": false,
      "is_readonly": false,
      "public_key": "0x50b42d796fd9bceafc5d146aedc1083b36d8ac3bafcebb5a9532a02d9b0f6dbb",
      "receipt_identifier": "stc1psac6k34wjtlw7er5nw074mk7nvv4gv6j"
    },
    "auth_key": "0x047647886667905740b3e671854954b18771ab46ae92feef64749b9feaeede9b",
    "balances": {},
    "sequence_number": null
  }
}
```

- address 是账户地址
- is_default 表示是否为默认账号。很多命令如果需要账号参数，但用户没有传递，则会使用默认账号。如果节点开启了挖矿客户端，也会使用默认账号进行挖矿。
- is_readonly 表示是否为只读账号，只读账号的私钥并不托管在节点钱包中。  
- public_key 是账户地址对应的公钥
- receipt_identifier 是收款人识别码  
- auth_key 是认证秘钥，最后是需要写到链上去的

> 注意，创建账户只是在 starcoin node 里创建一对密钥，并不会更新链的状态。所以 balance 和  sequence_number 此时还是空的。以上信息都属于公开信息，只有私钥是需要用户保密的。


3. 查看账号列表

```bash
starcoin% account list
```

4. 查看或者变更默认账号

查看默认账号地址：

```bash
starcoin% account default
```
将 0x8771ab46ae92feef64749b9feaeede9b 设置位默认地址。
```bash
starcoin% account default 0x8771ab46ae92feef64749b9feaeede9b
```

5. 导出导入账号

为了避免磁盘损坏等原因导致自己的资产损失，备份自己的私钥非常重要。

执行以下命令: 
```bash
starcoin% account export 0x8771ab46ae92feef64749b9feaeede9b -p my-pass
```
即可导出 0x8771ab46ae92feef64749b9feaeede9b 的私钥。

执行以下命令:

```bash
starcoin% account import -i <private-key> -p my-pass 0x8771ab46ae92feef64749b9feaeede9b
```

即可导入 0x8771ab46ae92feef64749b9feaeede9b 账号。这个命令也可以用于将账号导入到不同的节点上，用来做节点迁移。

6. 导入只读账号

如果不想把私钥托管在节点钱包中，只是想查看该账号，或者将该账号作为挖矿账号，可以通过公钥导入只读账号:

```bash
starcoin% account import-readonly -i <public-key>  
```

然后将该账号设置为默认账号。

7. 删除账号

```bash
starcoin% account remove 0x8771ab46ae92feef64749b9feaeede9b -p my-pass
```

如果是只读账号，无需传递 -p 参数。删除账号只是将账号从节点钱包中删除，并不影响该账号在链上的状态。