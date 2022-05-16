---
title: Docker
weight: 3
typeof: developers
---

介绍如何通过Docker镜像，快速运行Starcoin Node。

<!--more-->

Docker运行【深度高效，玩转Starcoin节点】

通过 Docker 运行 starcoin 节点。

1. 拉取 Docker 镜像

```shell
docker pull starcoin/starcoin:latest
```

starcoin 的二进制文件在镜像中的 /starcoin 目录下.

如果你想用一个指定的版本，可以通过标签拉取，比如 v0.9.3.

```shell
docker pull starcoin/starcoin:v0.9.3
```

2. 通过 Docker 运行 starcoin 节点

运行主网节点

```shell
docker run --name starcoin -d --network host -v ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin -n main
``` 

3. 通过 Docker 连接到 starcoin 控制台

```shell
docker run --rm -it -v  ~/.starcoin/:/root/.starcoin/ starcoin/starcoin:latest /starcoin/starcoin --connect /root/.starcoin/main/starcoin.ipc console
```

更多参数以及网络说明请参看 [运行以及加入网络](../runnetwork).
