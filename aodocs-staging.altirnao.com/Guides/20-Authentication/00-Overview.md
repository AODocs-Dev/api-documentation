# Authenticate your users

Every request sent to the **API provider** (AODocs) must include some method of authentication to verify the identity of the **data owner** (or, in the case of AODocs, the end-user who has access), and to authorize any activity done on their behalf. This is required regardless of whether the **API consumer** is a person manually interacting with the API portal; or a client app interacting on their behalf.


![api-auth-model](/img/api-relationship2.png)

Figure 1: Who is who

## Available authentication mechanisms

You can gain credentials to be authenticated with AODocs APIs in three ways, depending on your circumstances and needs:

*   AODocs security code (quickest for internal testing, but least secure)
*   OAuth 2.0 ````access_token```` (secure, needed to access Drive APIs)
*   OAuth 2.0 JSON Web Token (JWT) ````id_token```` (secure, no scope, for AODocs APIs only)


### Security code

This is the custom system created by AODocs for the purposes of quick internal testing and similar use-cases behind your firewall.  If you don't need access to Google Drive APIs, this is the quickest way to get started.  Read more about how to [access APIs with AODocs security code](https://drive.google.com/a/altirnao.com/open?id=1IL9vuBYtJGCqQmX4Ry-PqRrzjTM6QcjUpD7byNFXfJA).


### Access and ID tokens

Access or ID tokens sent in the request header are the robust, secure mechanism to authenticate with AODocs APIs and consequently gain access to both AODocs and Google Drive APIs.   Obtaining access tokens takes more work with more server calls, but they have scope; ID tokens are self-contained and can be verified in place, but lack scope.

> ⭑   Note: Unlike the plug-and-play functionality of the AODocs security code, access tokens require whitelisting GCP client IDs in AODocs.

Read more about how to [access AODocs APIs with access and ID tokens](https://drive.google.com/a/altirnao.com/open?id=1PcdH7RiLibUYj5mEh9EdQ6fpATcENaCy6-Pggo30BaI).


## What to use when

There are several distinct use cases for authenticating and authorizing API access with AODocs, each with its own requirements and approaches.

The quickest way to get started is with the security code method, but it can be used only on AODocs APIs, not Google Drive APIs.

If you need Google Drive API access, you have to use an access token.

Finally, if you need robust and secure access to AODocs API without being able to access Drive APIs, you have the option of ID tokens.

See [additional authentication use cases](https://drive.google.com/a/altirnao.com/open?id=1VN1XZqFUCHNNG7Ya278gFxx4jaIp-6LKAs17JEoedhY).

## General principles

Make sure you provide to your users a level of API access that is functional but **least-elevated possible**, raising their level temporarily only when necessary.

> ⭑   Note: Because of risk-benefit ratios, giving users more permissions than they actually need is rarely recommended.  Therefore, for security reasons, we strongly encourage the use of the lowest possible levels of access, in this case user-level.


Read more about the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).
