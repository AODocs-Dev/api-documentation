# Authenticate your users

Every request sent to the **API provider** (AODocs) must include some method of authentication to verify the identity of the **data owner** and to authorize any activity done on their behalf. This is required regardless of who plays the role of **API consumer**: you directly, or an app on your behalf.

![api-auth-model](/img/api-relationship.png)

Figure: Who is who

## Available authentication mechanisms

You can gain pass authentication credentials to AODocs APIs in three ways, depending on your circumstances and needs:


*   Security code (quickest for internal testing, but least secure)
*   OAuth 2.0 `access_token` (secure, needed to access Drive APIs)
*   JSON Web Token (JWT) `id_token` (secure, no scope, for AODocs APIs only)


### Security code

This is the custom system created by AODocs for the purposes of quick internal testing and similar use-cases behind your firewall.  If you don't need access to Google Drive APIs, this is the quickest way to get started.  Read more about how to [access APIs with AODocs security code](https://drive.google.com/a/altirnao.com/open?id=1IL9vuBYtJGCqQmX4Ry-PqRrzjTM6QcjUpD7byNFXfJA).


### OAuth 2.0

OAuth 2.0 is the robust, secure mechanism to authenticate and authorize access to both AODocs and Google Drive APIs.


> ⭑   Note: Unlike the plug-and-play functionality of the AODocs security code, OAuth 2.0 requires whitelisting GCP client IDs in AODocs.


Read more about how to [access APIs with OAuth 2.0](https://drive.google.com/a/altirnao.com/open?id=1S_5P0cfM387X996bAGOnnjO1z48IWysp-PbDCqB3vhc).


### JSON Web Tokens (JWT)

JWT is a secure token like OAuth 2.0, but without scope so it can be used only on AODocs APIs.  Read more about how to [access APIs with JSON Web Token](https://drive.google.com/a/altirnao.com/open?id=1K0yXBQwTBMm5FEwJotwFkjzc-moD2h-BwzfxlN3YOkk).


## What to use when

There are several distinct use cases for authenticating and authorizing API access with AODocs, each with its own requirements and approaches.

The quickest way to get started is with the security code method, but it can be used only on AODocs APIs, not Google Drive APIs.

If you need Google Drive API access, you have to use OAuth 2.0.

Finally, if you need a robust and secure access to AODocs API without being able to access Drive APIs, you have the option of JWT.

See [additional authentication use cases](https://drive.google.com/a/altirnao.com/open?id=1VN1XZqFUCHNNG7Ya278gFxx4jaIp-6LKAs17JEoedhY).


## General principles

Make sure you provide to your users a level of API access that is functional but **least-elevated possible**, raising their level temporarily only when necessary.


> ⭑   Note: Because of risk-benefit ratios, giving users more permissions than they actually need is rarely recommended.  Therefore, for security reasons, we strongly encourage the use of the lowest possible levels of access, in this case user-level.



Read more about the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).


<!-- Docs to Markdown version 1.0β19 -->
