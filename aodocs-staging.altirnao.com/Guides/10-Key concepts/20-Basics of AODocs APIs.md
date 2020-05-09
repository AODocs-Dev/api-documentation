# Basics of AODocs APIs

AODocs APIs are the HTTP endpoints which let you issue direct requests to the resource server to perform many of the manual tasks done in the AODocs UI:

*   list and search for resources such as libraries, classes, or documents
*   create (insert), change (patch), and remove (delete) documents, their properties, and their attachments
*   configure AODocs folders, roles, versions, and permissions

Most of the tasks (and more) that can be achieved from the AODocs UI can also be performed using the API.


## When to use Drive APIs vs. AODocs APIs

The purpose of **Drive** APIs is to upload, read, alter, copy, and download **Drive** files and their content — use them to put into place and manage Drive files before and after attaching them to AODocs documents.  Only **[Drive APIs](https://developers.google.com/drive/api/v3/)** can be used for this purpose, and the AODocs API does not provide any way to interact with the content of the Drive files directly.

> ⭑   Note: You can use any available version of Google Drive APIs (v2 or v3).


To **attach Drive files to AODocs documents** in SF and DMS libraries you have to use both **Drive and AODocs** APIs together because they need to work in tandem to connect the two worlds.

> ⭑   Note: Files created in a TF library's folder will create AODocs documents automatically.


Once attached, you can do most things you need with only AODocs APIs: you will still use Drive APIs to perform any tasks related to the content of the attachments like reading, copying, and downloading Drive files; but you will use **AODocs APIs exclusively** for all tasks related to the **AODocs documents** wrapped around the Drive files, such as managing and configuring AODocs metadata, roles, and workflows.

Some of the concrete tasks you can perform with the AODocs APIs:

*   List libraries
*   List classes
*   Create a document of a specific class inside a specific library
*   Patch a document
*   Delete a document

To **manage folders **and **edit permissions**, you have to use either **Drive or AODocs** APIs, depending on the library type and which storage account owns the resource: Drive APIs for TF; AODocs APIs for DMS and SF.

To manage and configure **AODocs documents**, you can use only **AODocs APIs**.


## Interacting with APIs

AODocs APIs are designed around [principles of REST](https://cloud.google.com/apis/design/resources): to interact with them, you ask the server to use HTTP operations to perform read and write actions on a specified resource, as well as by providing certain parameters to configure the request.  You then parse the responses that come back.  You can do this using the following methods:


*   in person, manually, using the interactive [API Explorer](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/get)
*   using a third-party service provider like [Postman](https://learning.postman.com/docs/postman/launching-postman/introduction/)
*   programmatically, using code to automate request/response interactions

The AODocs API shares a lot of similarities in its design with the Google APIs, so if you’re familiar with the various G Suite APIs (Drive, Calendar, GMail) you should be able to understand the AODocs API principles very quickly.

On a high level, the interaction consists of three stages:

1. request to perform an operation on a resource sent to the server
2. operation performed server-side
3. response sent from the resource server

### Step 1: Client sends request to the server

#### API Request structure

You send a request containing the following information to the API server:

*   URL of the API **endpoint** (mandatory)
*   **Type of HTTP request** to be performed (mandatory)
*   Parameters (not all mandatory, and not all the time)
    *   Headers
        *   Authentication and authorization info
        *   Request content type
        *   other
    *   Path parameters (before the ```?``` in the URL, mandatory)
        *   target API
        *   name/ID of **resources** and subresources to operate on
    *   Query parameters (after the ```?``` in the URL, usually optional)
        *   **securityCode**
        *   search filters
        *   other
*   JSON request body containing specific **target resource fields** you want populated (sometimes mandatory depending on operation and resource)


#### Base API endpoint URL

To access AODocs APIs, you must use the following base URL:

```https://aodocs.altirnao.com/api/```

> **Note**: This URL is used to build interactions with AODocs API resources but yields no useful results on its own.


#### Types of parameters

Different parts of the request naturally lend themselves to carrying certain kinds of parameters, or at least are used that way customarily.

There are generally three ways you can send parameters inside a request:

*   as a **path** parameter (<code>GET /library/v1/<strong>abcd12345</strong>?include=NONE</code>)
*   as a **query** parameter (<code>GET /library/v1?<strong>documentId=abcd12345</strong></code>)
*   as one of the JSON-formatted resource fields inside the **request body** (<code><strong>{"documentId": "abcd12345"}</strong><code>)
*   inside the header (<code><strong>Authorization: Bearer \<token\></strong><code>)

*   as a **path** parameter (<code>GET /library/v1/<em>abcd12345</em>?include=NONE</code>)
*   as a **query** parameter (<code>GET /library/v1?<em>documentId=abcd12345</em></code>)
*   as one of the JSON-formatted resource fields inside the **request body** (<code><em>{"documentId": "abcd12345"}</em><code>)
*   inside the header (<code><em>Authorization: Bearer \<token\></em><code>)


Specific variable parts of the endpoint URL (like AODocs ```/documentType/v1/**typeId**``` or ```/library/v1/**libraryId**``` APIs) are considered **path parameters**.  These parameters get provided in the part of the URL after the host name and before the` ```?```, and this is where the server expects to find them.

* </em><code>)

Search filters, security codes, and other **query parameters** are commonly strung into a key-value list in the part of the URL after the ```?```.  The resource server has built-in mechanisms to parse this information.

* <code>)

> 💡   Tip: The following query parameters exist globally across AODocs APIs:
>
> * domain
> * security code (authentication mechanism)
> * fields query parameter (to filter results and improve performance)

#### API resources

REST-oriented APIs such as AODocs model their objects (such as documents, classes, or libraries) as a hierarchy of directly addressable _resources_, or addressable collections of information or metadata.

* </em><code>)


A resource type (such as ```[ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument)```) is the schema that outlines how a resource can be represented.  A representation of a resource is the (in our case JSON-formatted) instance of the schema above.  This JSON-formatted instance is a _representation_ of a resource, but is often simply called _resource_.

* <code>)


You send the (usually partial) resource to the server as a request body, along with a request to perform an HTTP-verb operation like ```GET``` or ```PATCH```.  Once the server performs the requested operation, it sends back the (usually complete) resource to the client as a response body.

* <code></em><code>)


API resources (like a Document or Library) that you want to create or update _must_ be  sent as part of the request resource, in the **request body.**

* <code><code>)


They are returned as **the response body** when a request is successful. Usually, the format of an API resource is the same in the request body and the response body.

> **Note**: You can get a partial resource back if you filter the response fields using the ```fields``` parameter.

Read more about [AODocs resources](https://drive.google.com/a/altirnao.com/open?id=1k5JAfE2TbdDUbxUweDJNVPdT5nf40pL8kCu1Ies8BQY).

#### Creating a document

```yaml
PUT https://aodocs.altirnao.com/api/document/v1

Authorization: Bearer [YOUR_ACCESS_TOKEN]
```

```json
{
    "libraryId":"RnTG8PD8u8ZqTuDVHcv",
    "classId":"RnTf1mx835gaTJLzoFp",
    "title":"My Important AODocs Document"
}
```

### Step 2: Server performs operation on the requested resource

The resource server hosts and performs operations on a requested resource (such as a library), subresources (such as a library's permissions), or a collection of resources (such as a list of libraries).

If the resource server accepts your request, it then does the following:

*   performs requested operation on target resource (library, etc.) or subresource (permissions, etc.)
*   sends back response containing:
    *   HTTP status code outlining what kind of outcome occurred (success/fail/other)
    *   the targeted resource (usually; one exception is after DELETE)

For example, the server might apply a ```GET``` request to an ```ApiLibraryList``` resource/collection and return the resource/collection to the requesting party.

### Step 3: Server sends a response

The server either succeeds in fulfilling the request, or something goes wrong.  The latter case is uncommon, but when it does occur, many things can be the culprit.

#### Server succeeded

If the server succeeds in fulfilling the request, it responds with a 200-series status code (usually ```200 OK```) and a response body which is a full or filtered JSON representation of the resource the server operated on.  Each resource type returned as part of a successful response has a different structure ("schema"): you can look up the schema for each such resource type in the reference, such as ```[ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument)```.


> ⭑   Note: If the requested operation is ```DELETE```, the server sends back ```204 OK``` and ```null``` instead of a representation of a resource, regardless if the resource was sent to Trash (retrievable) or deleted permanently.  If you delete the document permanently, the ```documentId``` stops being recognized from that point on.  If you send the document to Trash, the document ID persists.

#### Server did not succeed

If there was something wrong with the request or with the server's ability to perform the operation, the response comes back as a status code and JSON-formatted error message to help guide your next steps.

#### Error handling and troubleshooting

The response provides a standard HTTP status code to indicate success (2xx), failure (4xx), or some other condition (5xx); as well as an error message to guide the next steps.

VERSION 1 (hyperlink opens in same tab)

Read more in [HTTP status codes in AODocs APIs](/docs/aodocs-staging.altirnao.com/1/c/Guides/60-Best%20practices/10-HTTP%20status%20codes%20and%20error%20scenarios) to determine the type of issue and how to resolve it.

VERSION 2 (hyperlink opens in separate tab)

Read more in <a href="/docs/aodocs-staging.altirnao.com/1/c/Guides/60-Best%20practices/10-HTTP%20status%20codes%20and%20error%20scenarios" target="_blank" rel="noopener"><span>HTTP status codes in AODocs APIs</span></a> to determine the type of issue and how to resolve it.




## Pagination

Pagination comes into play when dealing with resource collections, since the results are often longer than a single page.  Read more in [Performance: filtering and paginating results](https://docs.google.com/document/d/1rUH-H2uGCp4xMwOV_XtKld1FJo6qai_60ZZZ3JP3ePI/edit#).


## Beta vs. non-beta versions

Any version marked `beta` indicates that the version of this API method is not final, and might be subject to sudden deprecation and removal from the API, with a better alternative provided as a replacement. However, as long as the method is live, we’ll try to ensure backward compatibility as much as possible.

APIs not marked as `beta` are considered “stable”: they have permanence and retain backward compatibility, unless they suffer from low usage.


## Next steps

Here is how you can get started working with AODocs APIs:



*   Try following the sequence of methods in the [Manage AODocs documents](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/00-Overview) section.
*   Use the [interactive API Explorer](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/get) to build requests and queries for the APIs and to see the responses.
*   Learn about [each API and its purpose](https://drive.google.com/a/altirnao.com/open?id=1xhBQOKedhNtVtmaviWvvMPjcddScpkkebH3oyqub85I).
*   Review and select the appropriate mechanism for [gaining access to AODocs APIs](https://drive.google.com/a/altirnao.com/open?id=1XEgIlXhQ05oCsOJuuTR0L7JHAohBUNedJGkvg2AFXd4).
*   Check the [AODocs Reference](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/overview) for all the resources available through the APIs.
*   Read the "Best practices" section.
*   Have trouble falling asleep?  Read the [Appendix](https://drive.google.com/a/altirnao.com/open?id=1su4gnY2t94N662H8UNeZ4A5VzlScTky_k7lqHs2ZwyY), which includes all the most essential soporific auth RFCs.