# Overview

Every request sent to the AODocs **API** must include some method of authentication to verify the identity of a **Google user with access to AODocs**, and to authorize any activity done on their behalf. This is required regardless of whether the **API requestor** is a person manually interacting with the API portal; or a client app interacting on their behalf.

![api-auth-model](/img/api-relationship2.png)

Figure: Auth model

## Available authentication mechanisms

You can gain credentials to be authenticated with AODocs APIs in two ways, depending on your circumstances and needs:

*   AODocs security code (quickest for internal testing, but least secure) that is a mechanism specific to the AODocs API
*   Bearer tokens (in OAuth 2.0 or JWT format) that are issued by Google and can be used for any Google-compatible API (including the AODocs API)

### Security code

This is the custom system created by AODocs for the purposes of quick internal testing and similar use-cases behind your firewall.  If you don't need access to Google Drive APIs, this is the quickest way to get started.  Read more about how to [access APIs with AODocs security code](/docs/aodocs-staging.altirnao.com/1/c/Guides/20-Authentication/10-Security%20code).


### Bearer tokens (access or ID tokens)

Access or ID tokens sent in the request header are the robust, secure mechanism to authenticate with AODocs APIs and consequently gain access to both AODocs and Google Drive APIs.   Obtaining **access tokens** takes more work with more server calls, but they can also have authorization scopes, like access to Drive or Gmail APIs; meanwhile, **ID tokens** are self-contained and can be verified in place, but they only convey the identity of the user it was issued for.

> ⭑   Note: Unlike the plug-and-play functionality of the AODocs security code, access tokens require whitelisting GCP client IDs in AODocs.

Read more about how to [access AODocs APIs with access and ID tokens](/docs/aodocs-staging.altirnao.com/1/c/Guides/20-Authentication/20-Access%20tokens).


## What to use when

There are several distinct use cases for authenticating and authorizing API access with AODocs, each with its own requirements and approaches.

The **quickest** way to get started is with the **security code** method, but it can be used only on **AODocs APIs**, not Google Drive APIs.

If you need to interact with the **Google Drive API** as well as the **AODocs API**, you have to use an access token that authorizes access via [at least one Drive scope](https://developers.google.com/drive/api/v2/about-auth).

The AODocs API only requires the identity scope “[https://www.googleapis.com/auth/userinfo.email](https://www.googleapis.com/auth/userinfo.email)” in access tokens.

Finally, if you need robust and secure access to **AODocs APIs-only** (without being able to access Drive APIs), you have the option of ID tokens.

See [additional authentication use cases](https://drive.google.com/a/altirnao.com/open?id=1VN1XZqFUCHNNG7Ya278gFxx4jaIp-6LKAs17JEoedhY).


## General principles

Make sure you provide to your users a level of API access that is functional but **least-elevated possible**, raising their level temporarily only when necessary.

> ⭑   Note: Because of risk-benefit ratios, giving users more permissions than they actually need is rarely recommended.  Therefore, for security reasons, we strongly encourage the use of the lowest possible levels of access, in this case user-level.


Read more about the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).