---
title: Starcoin为何使用Move语言?
weight: 6
---

```
* 本文由Starcoin社区原创，根据Hugo(Starcoin核心开发者)的一次采访整理。
```

## Starcoin 有什么价值？

这个问题估计很多朋友都非常关心，我多说几句。每个人对价值的理解不太一样，我作为一个开源社区开发者，结合我所了解到的Starcoin，谈一谈我自己的个人感受和理解吧。

我们先来说一下Starcoin的愿景，这是白皮书里的。

Starcoin，新一代分层的智能合约和分布式金融网络。这里面隐含了多个重要信息：

* 新一代
* 分层
* 智能合约
* 分布式金融

接下来我们了解一下这4个词背后所承载的「愿景」，以及我认为的「价值」。「新一代」是形容词，我们放最后讲。我们先说「分层」

1. 一层

   了解区块链的朋友可能知道，我们常说的公链，也可以叫一层。我认为，一层最重要的是「价值沉淀」以及对这些沉淀下来的「价值赋能」。从技术的角度说，Starcoin的一层有很多有意思的设计：比如，增强的PoW共识、状态计费、⾃举的经济模型、完备的链上治理DAO、可升级的标准库Stdlib、新一代智能合约语言Move等等。所有的这些特性，都是为了更好地「价值沉淀」和「价值赋能」，这就是Starcoin一层的价值。

   这里我举几个例子，简单解释一下Starcoin一层是如何通过技术做到「价值沉淀」和「价值赋能」的。

   * 第1个例子，PoW共识：链上的价值是所有人的价值，不是某个人的价值，要服务好所有人的价值，我觉得PoW比PoS更能代表我们每一个人，当然Starcoin的PoW有很多有意思的优化，这里不展开，感兴趣的朋友可以去了解一下。
   * 第2个例子，链上治理：世界是变化的，区块链也是变化的，Starcoin可以通过「链上治理」来应对未来的变化。可以说，Starcoin具备「拥抱变化」的能力，能够不断完善自己。
   * 第3个例子，状态计费：「价值」是稀缺的。一层应该专注「价值」的沉淀，而不是「信息」的存储。随着时间的推移，一层需要筛选出「价值」，同时也要清洗掉过期的「信息」——那些曾经认为有价值、现在已经没有价值的数据。Starcoin的一层通过「状态计费」的方式轻松地解决过期信息带来的状态爆炸的问题，更好地实现价值的沉淀。
   * 第4个例子，Move： Starcoin的智能合约语言Move是围绕「资源」而设计，资源的一个重要特点就是「价值」，换句话说，Move能够更轻松地为「价值」赋能。关于Move，我后面会再介绍，这里不再展开。

   类似这样围绕「价值」的设计，Starcoin还有很多，所以我个人坚信Starcoin的一层是非常有竞争力和有价值的。

2. 二层

   前面我们说了Starcoin的一层专注于「价值沉淀」和「价值赋能」，接下来说一下Starcoin的二层。Starcoin的二层致力于「连接每个人」。在常见的生活场景中，Starcoin希望通过二层技术，让身边的每一个都能非常便捷地享受到区块链技术的带来的红利，比如微支付、听音乐、看电影、玩游戏等等这些场景。从技术的角度说，二层已经有很多的方案，例如状态通道、Rollup以及侧链等等。Starcoin希望能够统一这些方案，然后，对普通用户屏蔽这些的技术细节，让用户像水龙头一样享受到区块链给生活中的便捷。这是Starcoin二层的愿景，我个人认为这是非常有价值的一件事情。

3. 聊完了「分层」，接下来是智能合约Move

   前面我们讨论「价值赋能」的时候提到了，Starcoin的智能合约语言是Move，Move是面向「资源」编程的语言。我个人认为，「面向资源编程」是智能合约语言的一个变革。为什么这么说呢？我们常见的编程都是针对「信息」编程的。信息是可以任意粘贴复制，进行传播的，举个简单的例子，一条微博，可以随便转发，这是信息；身份证号或者手机号是一串字符，可以在A银行用，也可以在B银行用，这也是信息。「信息」随处可见。但是「资源」不一样，资源是有「价值」的，是稀缺的，是不能复制的，假如1块钱复制成2块那就是安全漏洞了。中心化的场景下，使用「信息」来表达「资源」，然后通过大量的人肉测试，确保「信息数据」是对的。如果最后还是出错了，保底方案，改数据库嘛。但是在去中心化的场景下，这是不可行的，那怎么办？需要面向「资源」的编程方式，从虚拟机的层面保证资源不能复制、不能随便更改，更好地为「价值赋能」。这就是Move，Move就是这么做的。所以我认为，这是智能合约一个非常大的进步，当然很有价值。

4. 以上是「智能合约」，再来聊聊分布式金融

   我们知道DeFi赛道是目前非常热门的方向，也是Starcoin在集中力量打造的方向。Starcoin通过在一层、Move等模型上进行设计和优化，已经做好了「价值沉淀」和「价值赋能」。下一步，就是要让这些价值流动起来，实现「价值再造」，这就是Starcoin的分布式金融的愿景。

   一直关注Starcoin的老朋友应该注意到了，Starcoin的很多DeFi基础设施和产品已经在并行落地，估计很快就能跟大家见面。

   我个人觉得Starcoin的DeFi，实现「价值再造」，多有价值的一件事啊。

5. 新一代

前面讲了Starcoin的「分层」、「智能合约」、「DeFi」，从「价值沉淀」到「价值赋能」，然后通过DeFi实现「价值再造」，最后通过二层「连接每个人」，让区块链真正地贴近到我们的生活，整个围绕着「价值」，形成了一个良性的生态闭环。

<img src="https://tva1.sinaimg.cn/large/008i3skNly1guic2vy8xvj60m00kuq3w02.jpg" alt="Starcoin" style="zoom:33%;" />

这就是我理解的「新一代」，也是我认为Starcoin的「价值」所在。



## Starcoin 为何使用 Move 语言?

这是一个非常好的问题。

首先，我们需要认识到一点，事物是不断向前发展的。我们从二进制到汇编到各种高级语言，一直都在发展。智能合约也一样，从比特币的Script到以太坊的Solidity，往前跨了一大步，但是，Solidity能包打天下了吗？事实上，层出不穷的安全问题一直在困扰我们，在很大程度上限制了整个行业的发展，比如前段时间炒的沸沸扬扬的Poly Network被攻击事件。「安全」在金融场景，尤其是DeFi时代，比以往任何时候都更加重要，这些问题我们不能视而不见。如果区块链行业继续发展，势必会有更好的智能合约语言出来。

在这些大前提下，新的智能合约语言Move被设计出来了。Move是面向「资源」编程的。我个人认为，「面向资源编程」是智能合约语言的一个变革，说白了，智能合约语言又往前迈了一大步。为什么这么说呢？

<img src="https://tva1.sinaimg.cn/large/008i3skNly1guic3a5bx0j60oc0bmq3a02.jpg" alt="info_vs_resource" style="zoom:50%;" />

前面我说过，常见的编程都是面向「信息」编程的，信息可以任意粘贴复制，随时修改，就像发一条微博。在编程的时候，只要有某个「信息」的引用，就能随便复制或者修改，这在中心化的场景下，很多细节问题暴露不出来，也是可以的。但是在区块链时代，面临着DeFi和开源的双重压力，很多细微的地方忽略了，会被无限放大。举个栗子，简单的加减法运算，很可能就有重大安全隐患，真实的漏洞比如，假充值、无限增发、溢出漏洞等等，基本都是这样产生的。这对开发人员和业务人员来说，都是非常大的挑战。

而面向「资源」编程，能够轻松地对应很多场景的安全问题。

我们先理解一下「资源」。如果一个东西被赋予了现实的「价值」，那意味着这个东西不是随随便便就能得到，我们把这个东西理解为「资源」。对编程来说，面向「资源」编程，意味着「资源」不应该被随意复制和修改。

我们先从技术的角度分析，Move在虚拟机层面，保证「资源」只能转移，不能拷贝，也不能随便修改，甚至不能随便丢弃。如果强行拷贝、修改或者丢弃，代码编译会出错，根本没有机会运行。事实上，Move在设计上，从很多历史上真实的安全漏洞中，吸取了宝贵的经验。

然后，我们从非技术的角度进行分析，「资源」更像是生活中真实存在的一座房子，不能简单的通过复制来建立另一座房子。如果要建立房子，必须要有对等「价值」的另外的「资源」来兑换，这才是真实的交易场景。所以，对金融或者「价值」来说，「资源」是比「信息」更贴切的一个抽象。所以，我们也可以这么说，Move通过「资源」对金融场景进行了增强，说得更通俗一点，Move是不影响货币功能的智能合约语言。

Starcoin在选择智能合约的时候也做了大量的研究和对比，甚至考虑过重造一个轮子。当我们发现Move跟理想中的智能合约很接近的时候，非常果断地选择了Move。Move还有非常多的优点，比如形式化验证等等，这里不展开说了，感兴趣的朋友可以通过Starcoin社区了解，也可以关注Starcoin发起的Move黑客松。



## Starcoin 公链如何发展生态应用?

这个问题比较大，我这里从公链基础设施研发的角度聊一下。

前面我们聊Starcoin的愿景，从「价值沉淀」到「价值赋能」，然后通过DeFi实现「价值再造」，最后通过二层「连接每个人」。在某种程度上讲，这是「价值」的循环周期。Starcoin生态研发也在一定程度上遵循这个过程。

截止目前，Starcoin已经在很大程度上实现了「价值沉淀」和「价值赋能」，比如Starcoin公链、Stdlib、浏览器插件钱包StarMask、Starcoin区块浏览器、Starcoin投票Dapp等等，这些都已经上线了，并且稳定运行一段时间。

所以，Starcoin正集中力量从「价值赋能」过度到「价值再造」的阶段。这个阶段，已经有很多开源社区参与进来，这里简单介绍一下目前正在推进的一些主要的生态应用：

* 1 跨链桥：包括跨其他的公链和交易所，初期版本已经完成研发，正在分阶段上线和进一步完善；
* 2 Oracle预言机：Starcoin已经制定了完整的Oracle标准协议，并且已经根据协议实现了一个Oracle，将链下数据提交到链上，很快会部署到主网；
* 3 NFT：Move在NFT方面有天生的优势，Starcoin制定了成熟的NFT标准协议，并且已经在对接相应的NFT平台，很快会跟大家见面，StarMask也即将支持NFT展示；
* 4 Swap：Swap是提供流动性的利器，Starcoin生态也在研发Swap并且已经有不错的成果，正在进行上线前的准备；
* 5 Lending借贷：Lending也是常见的DeFi场景，Starcoin生态应用也已经基本落地，正在进一步测试和优化；
* 6 IDO平台：对于一个完整的生态来说，IDO也是非常重要的平台，Starcoin生态也已经接入了一个IDO平台，很快会跟大家见面；

还有很多其他的应用正在快速推出，这些应用既有全新研发的，也有知名的平台接入的，都是为了实现「价值再造」，欢迎大家持续关注Starcoin的动态，也欢迎大家来Starcoin生态添砖加瓦。