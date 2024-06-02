+++
title = "TurboSTM: Starcoin’s New High-Performance Engine"
date = "2023-06-15"
summary = "“FlexiDAG, technically not a direct manifestation of the Nakamoto consensus, serves as an intriguing expansion that pushes the..."
author = "Starcoin"
tags = [
    "Starcoin"
]
archives="2023"

+++

![img](https://miro.medium.com/v2/resize:fit:1400/1*wvqlHM9ww64PL2hMCezxqQ.png)

In this article, we introduce TurboSTM, an advanced high-performance multi-threaded in-memory computing parallel execution engine technology that will soon be implemented in Starcoin. It combines the advantages of various industry parallelization techniques while incorporating unique innovations.

# Background

As smart contracts evolve, blockchain systems are facing new challenges. Initially, blockchain systems could only provide basic functionalities such as simple transfers. However, with the introduction of virtual machines and smart contracts, users can execute more complex transactions, and the security and usability of the systems have greatly improved.

However, smart contracts still have limitations. For example, due to their single-threaded execution nature, blockchain systems can only be modified by one smart contract at a time. Additionally, when multiple transactions are packed into a block, these transactions are usually executed sequentially. This sequential execution makes smart contracts a bottleneck for the overall throughput of the blockchain system, especially when there is a need to process thousands of transactions per second.

To address this issue, we can consider applying parallel computing techniques to the parallel execution of blockchains. Nowadays, most servers are equipped with multiple cores, and parallel computing techniques in the field of multi-core programming can help reduce transaction execution time, thereby improving the throughput of blockchain systems.

In simple terms, by utilizing multi-core and parallel computing techniques, we can execute multiple smart contracts and transactions simultaneously, enabling blockchain systems to efficiently process a large number of transaction requests. This parallel execution approach can enhance the overall performance of the system and make blockchain more capable of handling high-concurrency scenarios.

**Starcoin is a blockchain based on an enhanced version of the Proof-of-Work (PoW) consensus mechanism and the Move programming language. It provides solutions for decentralized finance (DeFi), non-fungible tokens (NFTs), and blockchain-based gaming through a layered and flexible interoperability approach.**

Starcoin utilizes the Move language and has developed secure digital asset protocols, including fungible tokens (FT) and non-fungible tokens (NFT), which ensure contract security and safeguard users’ on-chain assets. It replaces traditional contract audits with mature formal verification tools, ensuring the safety of contracts and the security of users’ assets on the chain.

# **Sequential Transaction Execution Process**

In the transaction execution process of Starcoin, a sequential transaction execution approach is adopted. Below is a brief introduction to each module:

- **Executor Module:** Responsible for executing a transaction, this module receives transaction information inputs such as transaction payload. It is typically generated by front-end wallet plugins or DApp APIs.
- **Storage Module:** Usually used to store information generated during or after the transaction.
- **MoveVM Module:** A standard Move virtual machine executor used to execute Move code. It takes Move code as input, outputs the code execution result, and indicates the modifications made to the associated resources. This virtual machine is used by multiple blockchain projects based on Move.

In the sequential transaction execution process, transactions are executed one by one in order, where the execution result of each transaction may affect the execution of subsequent transactions. This approach ensures the order consistency between transactions but can become a bottleneck for the system when facing a high volume of concurrent transactions. To improve system throughput, parallel transaction execution can be considered to process multiple transactions simultaneously, enhancing system performance and concurrency handling capabilities.

In the aforementioned execution steps of the blockchain transaction process, the Executor module receives a list of transactions, each containing a segment of contract execution code. These code segments can include contract deployment, contract execution, or querying the state of an account within a contract. The Executor executes these transactions sequentially, following the steps below:

1. The Executor module uses the Payload in the incoming transaction to locate the location of the contract code (referred to as “get_module”). Generally, contract code is stored in the code space of the publisher.
2. Once the Executor module finds the code, it calls the MoveVM module to parse and execute the bytecode of the on-chain contract.
3. The MoveVM then executes the instructions within the incoming transaction.
4. During execution, the MoveVM’s bytecode interpreter needs to access certain states (referred to as “get_resource”) during the code execution process. For example, when performing a transfer, it needs to know the balance of a specific account. It requests this account’s balance from the Storage module. Once the execution is completed, the MoveVM outputs a write-set result set, which the Executor applies to the Storage module to complete the write operation of a transaction.

**Here you can see the flowchart of the sequential execution of transactions：**

![img](https://miro.medium.com/v2/resize:fit:1400/1*SxSJEbcKhHgnFcyosJkmrg.jpeg)

If the original approach is to execute transactions in parallel, several issues may arise. Specifically, when executing smart contract transactions, if two different transactions within the same block simultaneously modify the same location, it is considered a conflict. It is evident that the original parallel execution approach is unable to detect conflicts.

# Parallel Transaction Execution Process

# Solution Selection

There are approximately two categories of available solutions:

1. Pre-declaration-based solution: This solution is similar to Ethereum’s EIP-648 proposal. Its core idea is to declare in the execution code of transaction contracts which data will be read and written by the transaction. Transactions without cross-dependencies are then packaged into a block to facilitate easier parallel execution. This solution is mandatory, and in some implementations, if a transaction is found to interact with undeclared data, it will be revoked.
2. Dynamic detection solution based on MVCC (Multi-Version Concurrency Control) and optimistic locking: This solution draws inspiration from concepts in databases and distributed computing. During the execution of blockchain transactions, MVCC is used to record updates related to Locations (referred to as “version” later) and dynamically detect dependencies. During the verification process, the execution result of a transaction is validated by comparing the consistency of the read information with the MVCC data records.

The first solution can achieve good performance, but it requires additional declaration work from users and complicates DApp development. Therefore, we prefer to develop a solution that is transparent, user-friendly, and seamless.

**Starcoin has chosen the second solution and developed TurboSTM, a high-performance parallel execution engine with multi-threaded in-memory computing. This engine utilizes MVCC technology to record information for each Location, including transaction and execution counts, and uses optimistic locking to detect conflicts in transaction execution results. If conflicts are detected, the relevant transactions are re-executed to achieve efficient parallel execution.**

# Solution Implementation — — TurboSTM

**Overview**
There are a few key concepts that need to be explained before introducing the solution:

**1.The version,** which is used to indicate the version number of a transaction, consists of two members.

-TxnIndex indicates the position of the transaction in the block.

-ExeCnt indicates the number of times the transaction has been executed.

**2.MVCCMap,** a thread-safe multi-version data structure to store multi-version transactions, where the entry consists of ExeCnt and value. Its code is defined as follows:

![img](https://miro.medium.com/v2/resize:fit:1400/1*K0SDdssCSWXq0Zg2Xgeatg.png)

**3.Task types,** we define several different task types, ExecutionTask, ValidationTask, NoTask and Done.

# Implementation process

In order to achieve parallel execution, we divide the transaction into two queues: ExecutionTask queue and ValidationTask queue, as shown in the figure below:

1. When executing a transaction in a block, we take the transaction out of the queue and generate an execution task to add to the execution task queue. Every time a transaction is executed, we write the Location generated by the transaction into the multi-version data structure, and record the data (read_set) corresponding to the Location read by the transaction to TxInputList.
2. When verifying the transaction task, we verify whether the Location version number read from the transaction read from TxInputList is consistent with the version number (ExeCnt) obtained from the multi-version data structure.

![img](https://miro.medium.com/v2/resize:fit:1400/1*TLgd2lLkOdZmhgLI4q6KpQ.jpeg)

The above description shows the main functions in the first version of TurboSTM, and there are more optimization methods in the second version to further improve performance.

# Summary

To sum up, Starcoin adopts the dynamic detection scheme of MVCC and optimistic locking to realize the high-performance, multi-threaded memory computing parallel execution engine TurboSTM. This solution does not require users to make additional declarations and is more transparent and friendly. This article describes the main parallelization functions and features in the first version of TurboSTM, and more optimizations will continue to be introduced in subsequent articles.

The potential of parallel execution technology is huge. It can solve the limitations of smart contract execution in blockchain systems, improve processing capabilities, and provide efficient and secure solutions for DeFi, NFT, and blockchain games. This technology not only improves the performance and efficiency of the blockchain system, but also provides strong support for Starcoin’s vision.
Starcoin aspires to build a more powerful blockchain ecosystem, and provide comprehensive solutions for DeFi, NFT and blockchain games through the enhanced PoW consensus mechanism and the Move programming language.

With the continuous optimization and improvement of the parallel execution engine, Starcoin will provide users with higher throughput, lower transaction latency and stronger security. Starcoin is also committed to promoting the widespread application of blockchain technology, facilitating the development of the digital economy, and creating more opportunities and value for users.
Through continuous innovation and hard work, Starcoin will make an important contribution to the realization of a sustainable blockchain ecosystem.