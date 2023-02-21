---
title: Modify DAO config by governance
weight: 6
typeof: developers
---

<!--more-->

# Modify DAO settings via governance mechanism

For an introduction to on-chain governance, see Decentralized Organization Governance, an example of how on-chain governance is performed via CLI.
The DAO itself also has several on-chain parameters, including:

* voting_delay: The period during which the proposal is publicized.

* voting_period: Voting period.

* quorum_vote: voting rate

* .min_action_delay: The minimum publicity period for the proposal to be executed.

  These parameters can also be voted on and modified by the DAO itself.
  The default parameters for the STC's DAO governance in a DEV environment are:
  ![img](https://lh3.googleusercontent.com/TNKwO5oeqr3L6S9uO1CkZ05vDMLMMvGVUdu5WcfUfyoEoyi19TRgR67zeFfnBXKwpTyXW6okKcRLB7quCVOAmtaH-roVl96EKwhtx8LfENseWrJYSyJ2FKNVX2gs-NIE-w2Yf_pRi-58yXxoXD1P5Po)
  The following CLI command demonstrates how to vote to change the proposal public period in the STC governance parameters to 60 * 60 * 1000 = 1h to explain the proposal-voting-execution process.
  **Note:** The following assumes that you are using a node in a DEV environment and that the node's default account is 0x84b4a430c50322a66007469a645a6a06. Where 0x84b4a430c50322a66007469a645a6a06 appears in the command, you need to replace it with your node's default account.
  \1. Submit a proposal to modify DaoConfig (see the documentation for the ModifyDaoConfigProposal module in stdlib for specific parameters).![img](https://lh3.googleusercontent.com/_X40E_G23q8YItFNB4yXaAQYIDwIbkGNmiveVNTncfzo1t-Y3PLTdaFwv-0uIDr0ylLMx3c10w3UVmxtLzxW1hWQBqD2knExOd_2WbOpfzmHU32c_flla8mzwKVGjWYqngSh1LbeVSUB6OmIUA7fxDU)**Note:** the DAO parameter cannot be equal to 0. Otherwise, the parameter will not be updated.
  After the proposal is launched, users must wait for the public period to expire before voting.
  You can use the following command to view the proposal information.![img](https://lh4.googleusercontent.com/DIKa8j-8EWNLG4qMTTqzuUVnHSPrNEJAuuVEVeSqs5CP-zyahCtTrKFim7MWyyLBQkoYSb8LZq-VAMwieoMHkOqAO1yDtTzqU6-dAVr4QgOcwphtnuPUeFedHB6_C7uwCF4YWo5KnrGxQUNAFG3nQn4)The result contains five values, in order: proposal_id, voting start time, voting end time, number of yes votes, and number of no votes.
  ![img](https://lh6.googleusercontent.com/Y1dNCoB0sbHA54ANZBOTv8JIpatq31Eq3pDJ_ZqblECNqTIz3cBYehRUdrritFMe6MLIzv0SZ8F6mga-rxxhB01mgpux5iSPdfOjZ5qtnLLZ-MwLAMs--Gpnd64RdlXo-M6M2SmCQMgj3EKUWrwJEms)
  \2. User VotingAfter the DEV chain starts, it will give the foundation account mint an STC by default, and the node account doesn't have STC yet, so it needs to use the foundation account to vote to get the proposal passed. (In the DEV environment, users can use the foundation account directly)![img](https://lh3.googleusercontent.com/7PNEQ6lc3pM_UeI0UEqROPCeNU3f_ARM2Bpi4xoCUImp42Gmzn4m8A8WY62kq4M2xDs9keo4LzkSHRvAK_LqM_EcfYWzVzW4N5FsNPyjeZhex8fpeyN8eCs8qE_F3lZwnWSZEH42eXBCt_cKrZewhXs)Recheck the proposal information.
  ![img](https://lh4.googleusercontent.com/JG2zych5YDp2yUSbn4ZguihwHt5oSNY1Fs-UUoPpi3B07x-0TdAIJblxida0JrNri0bncdxfnZopWO2jeq9Ov3Vj0i3zBJqSXBJ8XMZ-L_H37m2knlag_czGaNvnGwaGuTyAWS-49DmNG_Rexpuzo8A)Return.![img](https://lh5.googleusercontent.com/GQ_NAn8_scEoqNNjWu78mSpwsjAyUVQK67Jb37LuPZSpBth24CF8i4C84uADd3KapTlmsdf2uRYYe3E6v22mI4S4oTxWqSwGwdF1vfH4nqGTHEbyuQRyL2xN_vowohQb08X1a9pUX_b5xv1T_U5RVmw)Vote and wait for the voting period to end.
  \3. Proposal PassesAfter the voting period, if the proposal is passed, then it can be put into the pending execution queue and enter the execution public period.
  The following command can check the status of the proposal.
  ![img](https://lh3.googleusercontent.com/XDiXKqQhf-UBMCtdF5DroxBb9ZNRgerTmTP-9edjx9mxCoGhiA27OpiHJoMx3c90bjJ7L1SZTLyjEMvvSEjpnPtfpMned6C9OIXk3LTplYxFVX6vMLQM48SLUVd65qP8iOUCR6qSMWXXGZHQ9aERlEg)Return: (if the return result is 4, the proposal passed, other proposal statuses can refer to the standard library documentation)
  ![img](https://lh5.googleusercontent.com/VGsV0QbBJMinbJASlriNyeJ47Tibh_1AHWxuXyQNMNbxpEUpZ6myepAGFB2NfmxuiLjQo8mXZu1jgYInzWnQV9z4Yw_Czb-t-HfIDJPTk7lHEYrBl_YF0mFknQOWRdaRTwyy_6sTSrI_Oo6-6UOMxdc)Place in the pending pairs.![img](https://lh6.googleusercontent.com/8FSsTlB_XPRGRDTBqLky3hM__V09O28z7s4k-XppuLXtxapVSHcR7YQaMzpBxaM3FQvJNO_IV83lN0Yd_aqMqETmf68fKNnomHz008R8CvU8qdQ_zEFXP9tz2ke9ld0BsDS2Dng5lH2DKoZmAwmihTk)4.Getting back the staked tokensAfter the voting period, users can retrieve their staked tokens by submitting a transaction using the following script.![img](https://lh3.googleusercontent.com/y039iALM7mms11MrTJO1Hd072jhNvWhIXUTi4wRSTYpWG8rEpXFWKKv6TMzjjAT6O81DjktRgJsV03w3XlZ2ECbHnalI85csMDQS4bh-bljtg5VeiCptdy_C0PxMrCyukb_WCsQbOKlJEbK2VrD5-nE)
  \5. Execution ProposalsPending proposals can be triggered for execution by anyone initiating a transaction after the execution public period has expired. The command is as follows.
  ![img](https://lh3.googleusercontent.com/m1goRxCUfdOc3xiy75am8MJTsQqY6IZDrLHIdU4dgnqm9Q3vWBfLe-EcE1vmcsuTRY_SH33BCjjs24vTs70Kw-dCvyD34pVWvSgp-eJnieUfBt_yVHXS-XGdN4fYxJyTK6qhnYFWnFE_dqXGIcTfQMk)
  \6. Confirming the execution resultFinally, we also need to confirm that the parameters have been successfully modified.
  ![img](https://lh3.googleusercontent.com/g9wxRbZWzdBiNG77GQwi7IWfGt-XhxKEFZU8cX7n0BUA_gjXHuwlwuqgibQ8SB-FM5kPX-y32-oNfE12jx9OuxwZkRXu6pKr3LYgMOfzcLZGtOghAAKIBSX60wksWPQzqSsz5y9eLtYNVH1yWbG3uUs)
  \7. Clean up the finished proposal![img](https://lh4.googleusercontent.com/4ypVBNd4YffINlOtvc2vYOKW-U9hbRtoZT3sP1tY0A2LvXGbGg67ez-ikEAGxNdyC-4Bc6qmnfsuOZ5WG31s1yhL9ay8wEerXHzXl4XPTxbgsXrWyKB0UVVLvh5qejWoOc7Y2ODq1JJ_HZ4dvwHtofw)The above is a case flow of decentralized governance, which only shows some of the features of the DAO module. For more, please explore the official documentation of the Starcoin standard library.