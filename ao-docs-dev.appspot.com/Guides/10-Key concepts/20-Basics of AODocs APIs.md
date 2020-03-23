# Basics of AODocs APIs

AODocs APIs are the under-the-hood mechanisms which let you issue direct requests to the resource server to perform many of the manual tasks you can perform in the AODocs UI:



*   list and search for resources such as libraries, classes, or documents
*   create (insert), change (patch), and remove (delete) documents, their properties, and their attachments
*   configure AODocs folders, roles, versions, and permissions


## Interacting with APIs

You interact with the API by asking the server to use simple HTTP operations (```GET```, ```PUT```, ```PATCH```) to perform read and write actions on a specified resource (and by providing certain parameters to focus the request).

You send these HTTP commands/requests to the resource server, and parse the responses that come back.  You can do this using the following methods:



*   in person, manually, using the interactive [API Explorer](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com)
*   using a third-party service provider like [Postman](https://learning.postman.com/docs/postman/launching-postman/introduction/)
*   programmatically, using code (cURL, Java, etc.) to automate request/response interactions

On a high level, the interaction consists of three stages:



*   request to perform an operation on a resource sent to the server
*   operation performed server-side
*   response sent from the resource server


### Step 1: Client sends request to the server


#### Request structure

You send a request containing the following information to the resource server:



*   **operation** to be performed (mandatory 100% of the time)
*   URI of the API **endpoint** (mandatory 100% of the time)
*   parameters (not all mandatory, and not all the time)
    *   header
        *   auth info
        *   MIME types
        *   other
    *   path (before the ```?``` in the URL)
        *   target API
        *   name/ID of **resources** and subresources to operate on
    *   query (after the ```?``` in the URL)
        *   **securityCode**
        *   search filters
        *   other
*   JSON request body containing specific **target resource fields** you want populated (sometimes mandatory depending on operation and resource)


#### Operating on a resource (or "verbing a noun")

AODocs APIs are designed around [principles of REST](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm), allowing you to request, receive, and alter server resources (nouns) with a small number of standard, programming-language agnostic HTTP operation commands (verbs):

*   GET (retrieves)
*   PUT (inserts)
*   POST (creates)
*   DELETE (deletes)
*   PATCH (updates)

These commands are variants of elemental HTTP operations of **c**reate, **r**etrieve, **u**pdate, or **d**elete — CRUD for short.   You send a request for the server to apply a CRUD operation to a resource (for example, `GET library` or `DELETE document`), and the server sends back the success/failure results.

In AODocs, things are no different: you specify CRUD commands (**verbs**) along with pertinent _parameters_ as a request to the server to operate on your behalf on AODocs resources (**nouns**) to achieve the results you want.

#### Parameters

The parameters you send in the request define and focus the scope of what is to be operated on and how.  You provide parameters either because it is something the _server_ requires (for example, authentication, or unique identifiers of the resource you want to work on); or because it is something _you_ want (for example, to filter the bulk of the results down to a smaller, more readable subset).

![Server needs vs. client wants](/img/server-needs-client-wants.png)


##### Types of parameters

Different parts of the request naturally lend themselves to carrying certain kinds of parameters, or at least are used that way customarily.

There are generally three ways you can send parameters inside a request:

*   as a **path** parameter (```GET /library/v1/**abcd12345**?include=NONE```)
*   as a **query** parameter (```GET /library/v1?**documentId=abcd12345**```)
*   as one of the JSON-formatted resource fields inside the **request body** (```**{"documentId": "abcd12345"}**```)

The way the resource server is implemented determines which part of the request should carry which piece of required information, but the design often conforms to certain common patterns of usage.

For example, the server knows **auth tokens** are normally sent inside the **header** instead of as query parameters because the latter tend to get recorded and become visible in web server logs, presenting a security risk. For internal servers (test, staging, etc.), the server also knows to look for security codes in the query parameters (see following).

Specific API names (like AODocs ```/search/v1/``` or ```/library/v1/``` APIs) are considered **path parameters**.  These parameters get outlined in the part of the URL before the ```?```.  The server expects to find target API names in the path.

Search filters, security codes, and other **query parameters** are commonly strung into a key-value list in the part of the URL after the ```?```, and the server has built-in mechanisms to parse this information.

The following query parameters exist globally across the API:

*   domain
*   security code (auth mechanism)
*   fields query parameter (to filter results and improve performance)

On the other hand, specific **resource fields** to be created or updated (sometimes mandatory) get sent as part of the request resource, in the **request body**., especially if the resource contains too many fields to write as query parameters.  The server knows how to take the request body and match and reconcile its fields with those of the target resource, performing the requested operations field-to-field.


#### Sending parameters

Take the base endpoint URI, and add to it any required specifics.  This includes, but is not limited to the following:

*   the resource
*   the resource ID
*   subresource
*   subresource ID
*   parameters

Then issue an HTTP verb (CRUD command) to the newly-assembled URI:

```
HTTP-VERB base-endpoint/api/version/resource/{resourceId}/subresource/{subresourceId}?param1=vparam1val&param2=param2val
```

### Request examples

Get a library by ID:

```
GET https://www.base-aodocs-api-url.com/library/v1/{libraryId}?securityCode=12345likemyluggage
```

Search documents with specific view:

```
POST https://www.base-aodocs-api-url.com/search/v1/libraries/{libraryId}/views/{viewId}?include=NONE
```


#### Putting it all together: Constructing a request

On a high level, your request is a bundle of pieces of text containing the following:



*   the operation you want the server to perform (such as ```GET``` or ```PUT```)
*   service endpoint
*   the name of the API to connect to on the server and its version
*   target resource (such as library, document, or class)
*   all the parameters the server needs to do the work
*   all the parameters that you want in order to get the results you want

You can find the specifics of each of these in the API reference for each potential task you wish to perform.  For example, a request to [create a new document of a given class in a given library](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/put) is composed of the following:



*   the operation (```PUT```)
*   the base endpoint (```https://base-aodocs-endpoint.com/api```)
*   the API and its version (```document/v1```)
*   the target resource of type ```ApiDocument``` (implied)
*   the parameter the server requires (```libraryId```)
*   client-desired parameters such as ```classId``` and ```title```


#### Example request


```
PUT https://base-aodocs-endpoint.com/api/document/v1

{
    "libraryId": "RnTG8PD8u8ZqTuDVHcv",
    "classId": "RnTf1mx835gaTJLzoFp",
    "title":"My Important AODocs Document"
}
```



### Step 2: Server performs operation on the requested resource

The resource server hosts and performs operations on a requested resource (such as a library), subresources (such as a glossary of a library), or a collection of resources (such as a list of libraries).

If the resource server accepts your request, it then does the following:



*   performs requested operation on target resource (library, etc.) or subresource (glossary, etc.)
*   sends back response containing:
    *   HTTP status code outlining what kind of outcome occurred (success/fail/other)
    *   the targeted resource (usually; one exception is after DELETE)

For example, the server might apply a ```GET``` request to an ```ApiLibraryList``` resource/collection and return the resource/collection to the requesting party.


###


### Step 3: Server sends a response

If the server succeeds in fulfilling the request, it responds with a 200-series status code (usually ```200 OK```) and a response body which is a full or filtered JSON representation of the resource the server operated on.  Each resource type returned as part of a successful response has a different structure ("schema"): you can look up the schema for each such resource type in the reference, such as ```[ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument)```.


```
⭑   Note: If the requested operation is ```DELETE```, the server sends back ```204 OK``` and ```null``` instead of a representation of a resource, regardless if the resource was deleted permanently or simply sent to Trash.  If you delete the document permanently, the ```documentId``` stops being recognized from that point on.
```

If there was something wrong with the request or with the server's ability to perform the operation, the response comes back as a status code and JSON-formatted error message.

#### HTTP status codes

The response provides a standard HTTP status code to indicate success, failure, or some other condition, and to guide the next steps.  Generally 200-299 (esp. 200) means everything went well, and anything greater than 299 means something went wrong.

Read more in [HTTP status codes in AODocs APIs](https://drive.google.com/a/altirnao.com/open?id=10f3WLbxpce247fYG8qWKGIfzaUPtZjxh2l3tqeAWO6M)


## Resources

REST-oriented APIs such as AODocs model each of their objects (such as document, class, or library) as a hierarchy of directly addressable _resources_.

In general, a resource is the _concept_ of any addressable collection of information, such as an AODocs document or a library.

A resource type is the schema that outlines how a resource can be represented.  For example, [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) is the type of resource; an AODocs *document resource* is an instantiation of this type; and the resource has a JSON-formatted *representation* that can be viewed and altered and sent back and forth between the client and the server.

In short, each resource has an address it can be reached at, and a JSON-formatted representation that can be retrieved and manipulated.


Read more about [AODocs resources](https://docs.google.com/document/d/1k5JAfE2TbdDUbxUweDJNVPdT5nf40pL8kCu1Ies8BQY/edit).



## Beta vs. v1 version

Any version marked ```beta``` is still being developed and can change without notice.



## When to use Drive APIs vs. AODocs APIs


### Summary

To manage **Drive file content** — before or after attaching to AODocs — you can only use **[Drive APIs](https://developers.google.com/drive/api/v3/)**.


```
⭑   Note: You can use any available version of Google Drive APIs.
```


To **attach Drive files to AODocs documents**, you have to use **both Drive and AODocs APIs** together.

To manage **folders and permissions**, you have to use **either Drive or AODocs APIs**, depending on what account owns the resource.

To manage and configure **AODocs documents**, you can only use **AODocs APIs**.


### Elaboration

The purpose of **Drive** APIs is to upload, read, alter, copy, and download **Drive** files and their content — use them to put into place and manage Drive files before and after attaching them to AODocs documents.

To attach **Drive** files to **AODocs** documents, you have to use **both Drive and AODocs APIs** together because they need to work in tandem to connect the two worlds.

Once attached, you can do most things you need with only AODocs APIs: you will still use Drive APIs to perform any tasks related to the content of the attachments like reading, copying, and downloading Drive files; but you will use **AODocs APIs exclusively** for all tasks related to the **AODocs documents** wrapped around the Drive files, such as managing and configuring AODocs metadata, roles, and workflows.

Some of the concrete tasks you can perform with the AODocs APIs:

*   List libraries
*   List classes
*   Create a document of a specific class inside a specific library
*   Patch a document
*   Delete a document

To **manage folders** and **edit permissions**, use **either Drive or AODocs APIs** depending on which storage account has ownership of the file: Drive APIs for TF; AODocs APIs for DMS and SF.


> ⭑   Note: It is not a common use case, but some of the things you can do with the `documentId` API can also be done using the ```driveId``` API by using attachment IDs instead of document IDs.



## Next steps

Here are some resources to help you get started working with the AODocs APIs:

*   Try a hands-on tutorial to [learn common operations in an example sequence](https://drive.google.com/a/altirnao.com/open?id=1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA)
*   Use the interactive API Explorer to build requests and queries for the APIs and to see the responses
*   Learn about [each API and its purpose](https://drive.google.com/a/altirnao.com/open?id=1xhBQOKedhNtVtmaviWvvMPjcddScpkkebH3oyqub85I)
*   Review and select the appropriate mechanism for [gaining access to AODocs APIs](https://drive.google.com/a/altirnao.com/open?id=1XEgIlXhQ05oCsOJuuTR0L7JHAohBUNedJGkvg2AFXd4)
*   Check the reference for all the X available through the APIs
*   Check the X page for a list of available X that can be used with X
*   If you need help, visit the forum
*   Read the performance tips
*   Have trouble falling asleep?  Read the [Appendix](https://drive.google.com/a/altirnao.com/open?id=1su4gnY2t94N662H8UNeZ4A5VzlScTky_k7lqHs2ZwyY), which includes all the most essential soporific auth RFCs

