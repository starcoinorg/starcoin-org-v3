---
title: OneKey App 支持 Starcoin Dapps
---

StarMask 钱包是第一个支持 Starcoin 区块链的 Chrome 浏览器插件。

我们打开任意一个支持 Starcoin 的 Dapp([查看更多](https://starcoin.org/en/ecosystem/))，让我们以 [Starswap](https://starswap.xyz/) 为例。

首先，我们要确保 Chrome 浏览器的 StarMask 插件已经安装。

![](/images/onekey/onekey-1.png)

其次，用户在 Dapp 上的所有交易，都需要先 `连接钱包` 之后，

![](/images/onekey/onekey-2.png)

然后在 StarMask 的弹窗里进行确认。

![](/images/onekey/onekey-3.png)

对很多移动手机用户来说，Chrome 浏览器的插件弹窗和 Dapp 页面的交互，由于手机屏幕太小，使用起来很不方便。
为了解决这个问题，我们率先在 OneKey App 上支持了 Starcoin 的 Dapps，做到了 桌面/IOS/Android 的多端适配和支持。

桌面版 App
![](/images/onekey/onekey-4.png)

移动版 App(IOS/Android)
{{< figure src="/images/onekey/onekey-5.png" class="img-phone">}}

接下来，我们就以移动版 App 和 Starswap 的交互为例，来说明如何在 OneKey App 里面使用 Starcoin 的 Dapps。

首先我们先创建帐户。

OneKey App 支持三种帐户：
1） App Wallet 帐户
2） 通过助记词或者私钥导入的帐户
3） OneKey 硬件钱包帐户

我们以 StarMask 的帐户，通过私钥导入为例。

{{< figure src="/images/onekey/onekey-6.png" class="img-phone">}}

{{< figure src="/images/onekey/onekey-7.png" class="img-phone">}}

{{< figure src="/images/onekey/onekey-12.png" class="img-phone">}}

粘贴 StarMask 帐户的私钥：
{{< figure src="/images/onekey/onekey-13.png" class="img-phone">}}

选择 STC 网络，输入帐户名字
{{< figure src="/images/onekey/onekey-14.png" class="img-phone">}}

帐户创建成功
{{< figure src="/images/onekey/onekey-15.png" class="img-phone">}}

接下来，我们切换到 OneKey App 的 Explore 菜单

{{< figure src="/images/onekey/onekey-16.png" class="img-phone">}}

在底部的 Search 输入框，输入 Starswap 的网页地址: `https://starswap.xyz`
{{< figure src="/images/onekey/onekey-17.png" class="img-phone">}}

在 swap 页面，点击 `连接钱包`
{{< figure src="/images/onekey/onekey-18.png" class="img-phone">}}

选择 `StarMask`
{{< figure src="/images/onekey/onekey-19.png" class="img-phone">}}

点击 Confirm
{{< figure src="/images/onekey/onekey-20.png" class="img-phone">}}

接下来，我们兑换 STC-STAR
{{< figure src="/images/onekey/onekey-21.png" class="img-phone">}}

选择 STAR
{{< figure src="/images/onekey/onekey-22.png" class="img-phone">}}

输入 0.5 STC，点击 Swap
{{< figure src="/images/onekey/onekey-23.png" class="img-phone">}}

点击 Confirm Swap
{{< figure src="/images/onekey/onekey-24.png" class="img-phone">}}

在交易确认页面，点击 Confirm
{{< figure src="/images/onekey/onekey-25.png" class="img-phone">}}

Close 弹窗
{{< figure src="/images/onekey/onekey-26.png" class="img-phone">}}

切换到 Account 菜单，点击 History 栏目
{{< figure src="/images/onekey/onekey-27.png" class="img-phone">}}

可以看到有一笔在 Pending 状态的交易
{{< figure src="/images/onekey/onekey-28.png" class="img-phone">}}

等待交易在链上确认之后，
{{< figure src="/images/onekey/onekey-29.png" class="img-phone">}}

可以点击这笔交易，在交易详情弹窗里面，点击 Hash 后面的按钮
{{< figure src="/images/onekey/onekey-30.png" class="img-phone">}}

在浏览器里面查看交易详情
![](/images/onekey/onekey-31.png)

以上就是 OneKey App 和 Starswap 的一笔交易的全部过程。其他 Dapp 的交易过程与此类似。
