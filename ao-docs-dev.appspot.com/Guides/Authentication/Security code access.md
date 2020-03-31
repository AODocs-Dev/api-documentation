# Access APIs with AODocs security code

Security codes are the quickest way to authenticate with AODocs APIs.  You create the security code in the AODocs Domain administration page, then you pass it along with each request as a **header parameter** to identify yourself.

Using security codes for authentication is inherently less secure than the OAuth 2.0 mechanism, and they do not allow any access to Google Drive APIs.  However, for testing purposes and other simple internal use-cases, security codes are the quickest way to get started with AODocs APIs.


## Get a security code

You can generate a security code with an expiry date by following the [Manage security codes](https://support.aodocs.com/hc/en-us/articles/205650054-Manage-security-codes) article in the AODocs Knowledge Base.


### Select the correct security code type

Security codes can be generated for two levels of AODocs authorization:



*   User-level (strongly encouraged)
*   Domain administrator

    ```
⭑   Note: Because of risk-benefit ratios, giving users more permissions than they actually need is rarely recommended.  Therefore, for security reasons, we strongly encourage the use of the lowest possible levels of access, in this case user-level.
```



Read more about the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).


#### Use case: Library isolation

It is not possible to restrict a security code to access only a specific library (but not other libraries).  To get around this limitation, you should restrict access at the user level: that is, create a technical _user_ in GSuite that has access only to the needed libraries and not to restricted ones.  Then you create a user-level security code for this user in order to access the API.  The user's access is already determined by this point, and the security code does not have to take care of any authorizatio nuances..

In effect, you end up with a user who has access to just one library.

This is a good pattern to use if you have an integration that needs access to a specific resource or collection.  It also minimizes pressure to reuse security codes with scope that is broader than necessary.


#### Use case: Domain-wide access

In general, we recommend using levels of access that are as low as possible.  However, in certain cases, it makes sense to create a security code with **domain-admin levels of access**.  For example, you might have an auditing tool that needs to fetch all the audits for all the libraries.  Or you might have a dedicated integration between AODocs and an internal CRM, and you want to update some AODocs documents whenever something happens in the CRM.  Or any other **carefully designed and secured integration**.

Additionally, some **support/troubleshooting** scenarios also require domain-admin privileges, but **only with an expiration date**.

Whatever the exception, make sure that the choice is made deliberately, with thorough consideration of the risks involved.


## Use the security code

When you're playing with the API Explorer, it sends the security code you provide as a **_query parameter_**.  However, when you start coding to communicate directly with the API, we recommend you send it as a **_header parameter_**.


### Send the security code as a header parameter (recommended)


```
⭑   Note: Unlike query parameters, headers don't get recorded in web server logs, so we strongly recommend this method.
```


Send the security code in the header as follows:

````Authorization: securityCode <security code value>````


#### Example request with security code as header parameter


```
GET https://aodocs.altirnao.com/api/document/v1/ \ HTTP/1.1

Authorization: securityCode [YOUR_SECURITY_CODE] \
Content-Type: application/json \

{
  "libraryId": "Rngc1ug8K6WmL3IjZ8"
}
```


If you've started working with the API client factory which we provide with the Java API client, [you can use this feature out of the box](https://github.com/AODocs-Dev/aodocs-api-java-clients/blob/master/aodocs-api-client-factory/src/main/java/com/altirnao/aodocs/api/client/AODocsApiClientFactory.java#L88).


### Send the security code as a query parameter (not recommended)


```
⭑   Note: Unless you are protected by a sandbox (such as the API Explorer), we recommend that you do not send your security code as a query parameter.  Query parameters tend to get recorded and become exposed in web server logs, ultimately presenting a security risk.
```


Append the security code to the query as follows:

````securityCode=<security code value>````


#### Example request with security code as query parameter


```
  GET https://aodocs.altirnao.com/api/document/v1/RnTzVT2x5Sb48h3vSQ?securityCode=12345likemyluggage
```



### Authentication errors with security codes

Security code errors occur only when the security code is:



*   missing
*   incorrect
*   expired

To create, manage, and troubleshoot your security codes, see the [Manage security codes](https://support.aodocs.com/hc/en-us/articles/205650054-Manage-security-codes) article in the AODocs Knowledge Base.

