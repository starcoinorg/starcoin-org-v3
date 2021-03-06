---
title: In-Depth Comparison of ERC20 and Starcoin's t Token Protocol
weight: 19
---

```
* By Starcoin community
```

## Ethereum's ETH AND ERC20

Ethereum is first blockchain to use Account model, and designed two types of accounts: external account EOA (Externally Owned Account) and contract account CA (Contract Account). These two types of accounts are very different, the most important difference is whether the contract code can be stored. 

![ethereum_account](https://tva1.sinaimg.cn/large/008i3skNly1gw4119di3vj312o0l6myl.jpg)

External accounts cannot store codes, while contract accounts can store codes. This design essentially treats ETH as a first-class citizen! The Balance of the external account can only store ETH. The contract account is used to store the contract code, and at the same time, centrally store all the data generated by the contract. Take the Token of the ERC20 protocol as an example, we assume it is ERC20Token. The ERC20Token owned by the user is actually not in his own EOA account (EOA account can only store ETH), but in the ERC20Token contract account, the mapping relationship between an Address and the amount is recorded (as shown in the figure, the black bold dotted line part). 

![ethereum_account_token](https://tva1.sinaimg.cn/large/008i3skNly1gw42kguzwuj30j707t0ta.jpg)

From above comparison, we notice some problems: 

- Ethereum divides Tokens into two unequal  types of Tokens, with different functional characteristics     
- ETH is a first-class citizen, while ERC20 Token is just general data     
- The ERC20 Token owned by a user actually does not store in the user’s own account, but was stored in someone else’s contract account     
- ERC20 Token is "imprisoned" in the implemented contract and cannot be used across contracts 



## Starcoin's Token Protocol

Even Starcoin uses the Account model and also distinguishes external accounts EOA (Externally Owned Account) between contract accounts CA (Contract Account), but it is different from Ethereum accounts. The two accounts of Starcoin are relatively unified, the only difference is that the contract account does not have SignerCapability authority, and other features are exactly the same, such as the ability to store data and contract code, and so on. 

![starcoin_account_token](https://tva1.sinaimg.cn/large/008i3skNly1gw43q501eij30bz08z3yq.jpg)



##### Starcoin's Token is also different from Ethereum's Token:

- Starcoin has a unified Token protocol, all Tokens are defined by the protocol, including the STC of the Starcoin economic model
- Starcoin has only one type of token, and all tokens are completely equivalent in terms of functionalities
- Any account can store any type of Token, and the user’s own Token is stored in his own account with clear ownership
- Any account can register a new Token
- Starcoin's Token is a Resource type, the Move virtual machine guarantees that the Token cannot be copied or dropped, avoiding security issues such as unlimited issuance or entering a black hole, and has strong security
- Starcoin's Token can be arbitrarily combined and nested to become a new Token
- Starcoin's Token can be used as the data of any other contract
- Starcoin has a flexible and sophisticate Token authority management and release method
- Official implementation, code can be reused 

![starcoin_account_example](https://tva1.sinaimg.cn/large/008i3skNly1gw4413mziqj30n60c9gmc.jpg)



## Token's Protocol Source Code Analysis

Starcoin's Token protocol solves shortcomings of Ethereum's ETH and ERC20. Let's dive into the source code and learn the implementation of the Token protocol.

```Move
    /// The token has a `TokenType` color that tells us what token the
    /// `value` inside represents.
    struct Token<TokenType> has store {
        value: u128,
    }
    
    /// Token information.
    struct TokenInfo<TokenType> has key {
        /// The total value for the token represented by
        /// `TokenType`. Mutable.
        total_value: u128,
        /// The scaling factor for the coin (i.e. the amount to divide by
        /// to get to the human-readable representation for this currency).
        /// e.g. 10^6 for `Coin1`
        scaling_factor: u128,
        /// event stream for minting
        mint_events: Event::EventHandle<MintEvent>,
        /// event stream for burning
        burn_events: Event::EventHandle<BurnEvent>,
    }
```

The core of Starcoin's Token protocol is Token and TokenInfo:

- Token is a real asset (value represents quantity), and has extremely high security requirements, so it must be a type that cannot be copied and cannot be dropped
- TokenInfo stores metadata of Token (scaling_factor represents accuracy) and market (total_value represents total amount), and cannot make any mistakes, so it cannot be copied or dropped. 

```Move
    /// Token Code which identify a unique Token.
    struct TokenCode has copy, drop, store {
        /// address who define the module contains the Token Type.
        addr: address,
        /// module which contains the Token Type.
        module_name: vector<u8>,
        /// name of the token. may nested if the token is a instantiated generic token type.
        name: vector<u8>,
    }
```

TokenCode is the only way to distinguish between different Tokens.  Same value of addr, module_name, and name mean same Token. 

```Move
 /// Register the type `TokenType` as a Token and got MintCapability and BurnCapability.
    public fun register_token<TokenType: store>(
        account: &signer,
        precision: u8,
    )
    
    /// Return `amount` tokens.
    /// Fails if the sender does not have a published MintCapability.
    public fun mint<TokenType: store>(account: &signer, amount: u128): Token<TokenType> acquires TokenInfo, MintCapability
    
    /// Burn some tokens of `signer`.
    public fun burn<TokenType: store>(account: &signer, tokens: Token<TokenType>) acquires TokenInfo, BurnCapability
    
    public fun withdraw<TokenType: store>(
        token: &mut Token<TokenType>,
        value: u128,
    ): Token<TokenType>
    
    public fun deposit<TokenType: store>(token: &mut Token<TokenType>, check: Token<TokenType>)
```

The above function covers the whole Token life cycle: registration, minting, destruction, recharge, and withdrawal.

Starcoin's Token protocol takes advantage of Move, and has designed a secure Token type and TokenInfo type. By passing generic parameters, it is guaranteed that Token can be arbitrarily combined and the protocol can be expanded. Click to view [the complete code](https://github.com/starcoinorg/starcoin-framework/tree/main/sources/Token.move). 



## STC Source Code Analysis

The first application of the Token protocol is Starcoin's STC. STC is the native token of the Starcoin network, and the issuing account is the first account 0x1. In Starcoin's economic model, STC, as a block reward, plays an important role in protecting network security. It is also used to pay for transaction gas, on-chain governance, and state payment. For more information, see [Starcoin's economic white paper](https://starcoin.org/en/overview/economy_whitepaper/). 

![starcoin_ecosystem](https://tva1.sinaimg.cn/large/008i3skNly1gw49l596tnj30dt077gm1.jpg)

```Move
/// STC token marker.
    struct STC has copy, drop, store { }

    /// precision of STC token.
    const PRECISION: u8 = 9;
```

This is part of meta data of STC:

- STC represents TokenType
- PRECISION represents precision

STC's complete TokenCode is 0x1::STC::STC,which corresponds to three attributes:addr, module_name, and name. It's just need to call the Token protocol to operate after defining the STC:

- Register STC: Token::register_token. Due to the special attributes of STC, you can only use the 0x1 account to register in the first transaction
- Minting STC: Token::mint, minting in the first transaction, and at the same time depositing all STCs in Treasury to lock
- Shared destruction right: Store BurnCapability in SharedBurnCapability, it can be used by anyone

STC is a token defined by Starcoin's Token protocol. Like other tokens, it inherits all the functions of the Token protocol. View the complete code. 



## Customize one MyToken

As the Token protocol is an officially implemented contract,so it's easy to define your own Token in Starcoin(Starcoin's contract is also very concise).You only need to define a MyToken type,and then call the register_token function of the Token protocol to register,then you can mint MyToken by calling mint function.

```Move
 module MyToken {
2       use 0x1::Token;
3       use 0x1::Account;
4
5       struct MyToken has copy, drop, store { }
6
7       public(script) fun init(account: signer) {
8           let _account = &account;
9           Token::register_token(_account, 3);
10          Account::do_accept_token(_account);
11      }
12
13      public(script) fun mint(account: signer, amount: u128) {
14          let _account = &account;
15          let token = Token::mint(_account, amount);
16          Account::deposit_to_self(_account, token)
17      }
18  }
```

The above is a simple and implemented example, if you consider to set a certain value to MyToken, it still need to implement your own business logic.



## Conclusion

Starcoin has a unified Token protocol, any user can define their own assets through the Token protocol same way as STC. Token can be stored in any account in any form, and it can also implement different business logic across contracts to deal with any form of business scenario. In all scenarios, Token was born with security,the Move virtual machine guarantees that Token cannot be copied and cannot be dropped, and can only call the functions provided by the Token protocol to make limited modifications.

