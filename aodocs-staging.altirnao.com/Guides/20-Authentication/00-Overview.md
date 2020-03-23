# Authenticate and authorize your users

Every request you send to the AODocs API must include some method of authentication to verify the identity of the **data owner** and to authorize any activity done on their behalf.  This is required regardless of who plays the role of API consumer: you directly, or an app on your behalf.

![api-auth-model](/img/api-relationships-75.png)

![api-auth-model](/img/api-relationships-pdf.png)


Figure: Who is who


## About the mechanisms

You can authenticate with AODocs APIs in three ways, depending on your circumstances and needs:


* [Security code](../../Guides/20-Authentication/10-Security%20code%20access) (least secure, quickest, for internal testing)
* [OAuth 2.0 access_token](#heading=h.yzf7peetlblk) (secure, needed to access Drive API)
* [JSON Web Token (JWT) id_token](#heading=h.zcit90u9guab) (secure, no scope, for AODocs API only)


## General principles

Make sure you provide to your users a level of API access that is functional but **least-elevated possible**, raising their level temporarily only when necessary.


> ⭑   **Note**: Because of risk-benefit ratios, giving users more permissions than they actually need is rarely recommended.  Therefore, for security reasons, we strongly encourage the use of the lowest possible levels of access, in this case user-level.


Read more about the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).


## Choose your auth mechanism

### Security code

This is the custom system created by AODocs for the purposes of quick internal testing and similar use-cases behind your firewall.  If you don't need access to Google Drive APIs, this is the quickest way to get started.  Read more about how to [access APIs with AODocs security code](src/Authentication/Security%20code%20access).


### OAuth 2.0

OAuth 2.0 is the robust, secure mechanism to authenticate and authorize access to both AODocs and Google Drive APIs.


```
⭑   Note: Unlike the plug-and-play functionality of the AODocs security code, OAuth 2.0 requires whitelisting GCP client IDs in AODocs.
```


Read more about how to [access APIs with OAuth 2.0](https://drive.google.com/a/altirnao.com/open?id=1S_5P0cfM387X996bAGOnnjO1z48IWysp-PbDCqB3vhc).


### JSON Web Tokens (JWT)

JWT is a secure token like OAuth 2.0, but without scope so it can be used only on AODocs APIs.  Read more about how to [access APIs with JSON Web Token](https://drive.google.com/a/altirnao.com/open?id=1K0yXBQwTBMm5FEwJotwFkjzc-moD2h-BwzfxlN3YOkk).


## What to use when

There are several distinct use cases for authenticating and authorizing API access with AODocs, each with its own requirements and approaches.

The quickest way to get started is with the security code method, but it can be used only on AODocs APIs, not Google Drive APIs.

If you need Google Drive API access, you have to use OAuth 2.0.

Finally, if you need a robust and secure access to AODocs API without being able to access Drive APIs, you have the option of JWT.

See [which tool is best](https://drive.google.com/a/altirnao.com/open?id=1VN1XZqFUCHNNG7Ya278gFxx4jaIp-6LKAs17JEoedhY) suited to your needs.

