# Basics of AODocs APIs

AODocs APIs are the under-the-hood mechanisms which let you issue direct requests to the resource server to perform many of the manual tasks done in the AODocs UI:

* list and search for resources such as libraries, classes, or documents
* create (insert), change (patch), and remove (delete) documents, their properties, and their attachments
* configure AODocs folders, roles, versions, and permissions

## When to use Drive APIs vs. AODocs APIs


The purpose of **Drive** APIs is to upload, read, alter, copy, and download **Drive** files and their content — use them to put into place and manage Drive files before and after attaching them to AODocs documents.

> ⭑   Note: You can use any available version of Google Drive APIs.

To attach **Drive** files to **AODocs** documents, you have to use **both Drive and AODocs APIs** together because they need to work in tandem to connect the two worlds.


Once attached, you can do most things you need with only AODocs APIs: you will still use Drive APIs to perform any tasks related to the content of the attachments like reading, copying, and downloading Drive files; but you will use **AODocs APIs exclusively** for all tasks related to the **AODocs documents** wrapped around the Drive files, such as managing and configuring AODocs metadata, roles, and workflows.

Some of the concrete tasks you can perform with the AODocs APIs:

* List libraries
* List classes
* Create a document of a specific class inside a specific library
* Patch a document
* Delete a document

To **manage folders** and **edit permissions**, use **either Drive or AODocs APIs** depending on which storage account has ownership of the file: Drive APIs for TF; AODocs APIs for DMS and SF.



---

## Interacting with APIs

You interact with the API by asking the server to use simple HTTP operations (```GET```, ```PUT```, ```PATCH```) to perform read and write actions on a specified resource (and by providing certain parameters to focus the request).

You send these HTTP commands/requests to the resource server, and parse the responses that come back.  You can do this using the following methods:

* in person, manually, using the interactive [API Explorer](/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/get)
* using a third-party service provider like [Postman](https://learning.postman.com/docs/postman/launching-postman/introduction/)
* programmatically, using code to automate request/response interactions

On a high level, the interaction consists of three stages:

* request to perform an operation on a resource sent to the server
* operation performed server-side
* response sent from the resource server


### Step 1: Client sends request to the server


#### Request structure

You send a request containing the following information to the resource server:

* **operation** to be performed (mandatory 100% of the time)
* URI of the API **endpoint** (mandatory 100% of the time)
* parameters (not all mandatory, and not all the time)
    * header
        * auth info
        * MIME types
        * other
    * path (before the ```?``` in the URL)
        * target API
        * name/ID of **resources** and subresources to operate on
    * query (after the ```?``` in the URL)
        * **securityCode**
        * search filters
        * other
* JSON request body containing specific **target resource fields** you want populated (sometimes mandatory depending on operation and resource)



##### Types of parameters

Different parts of the request naturally lend themselves to carrying certain kinds of parameters, or at least are used that way customarily.

There are generally three ways you can send parameters inside a request:

* as a **path** parameter (```GET /library/v1/**abcd12345**?include=NONE```)
* as a **query** parameter (```GET /library/v1?**documentId=abcd12345**```)
* as one of the JSON-formatted resource fields inside the **request body** (```**{"documentId": "abcd12345"}**```)

Specific API names (like AODocs ```/search/v1/``` or ```/library/v1/``` APIs) are considered **path parameters**.  These parameters get outlined in the part of the URL before the ```?```.  The server expects to find target API names in the path.

Search filters, security codes, and other **query parameters** are commonly strung into a key-value list in the part of the URL after the ```?```, and the server has built-in mechanisms to parse this information.

The following query parameters exist globally across the API:

* domain
* security code (auth mechanism)
* fields query parameter (to filter results and improve performance)


### Step 2: Server performs operation on the requested resource

The resource server hosts and performs operations on a requested resource (such as a library), subresources (such as a glossary of a library), or a collection of resources (such as a list of libraries).

If the resource server accepts your request, it then does the following:



* performs requested operation on target resource (library, etc.) or subresource (glossary, etc.)
* sends back response containing:
    * HTTP status code outlining what kind of outcome occurred (success/fail/other)
    * the targeted resource (usually; one exception is after DELETE)

For example, the server might apply a ```GET``` request to an ```ApiLibraryList``` resource/collection and return the resource/collection to the requesting party.


### Step 3: Server sends a response

The server either succeeds in fulfilling the request, or something goes wrong.  The latter case is uncommon, but when it does occur, many things can be the culprit.


#### Server succeeds

If the server succeeds in fulfilling the request, it responds with a 200-series status code (usually ```200 OK```) and a response body which is a full or filtered JSON representation of the resource the server operated on.  Each resource type returned as part of a successful response has a different structure ("schema"): you can look up the schema for each such resource type in the reference, such as [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument).



> ⭑   Note: If the requested operation is ```DELETE```, the server sends back ```204 OK``` and ```null``` instead of a representation of a resource, regardless if the resource was sent to Trash (retrievable) or deleted permanently.  If you delete the document permanently, the ```documentId``` stops being recognized from that point on.  If you send the document to Trash, the document ID persists.


#### Server does not succeed

If there was something wrong with the request or with the server's ability to perform the operation, the response comes back as a status code and JSON-formatted error message to help guide your next steps.


##### Error handling and troubleshooting

The response provides a standard HTTP status code to indicate success, failure, or some other condition, and to guide the next steps.  Generally 200-299 (especially 200) means most everything went well, and anything greater than 299 means something went wrong.

Read more in [HTTP status codes in AODocs APIs](https://drive.google.com/a/altirnao.com/open?id=10f3WLbxpce247fYG8qWKGIfzaUPtZjxh2l3tqeAWO6M) to determine the [type of issue](https://drive.google.com/a/altirnao.com/open?id=1AG_735FJv2x1EJSxchd3BQ1B-ZUVitUCsB8M3gITO4w) and how to resolve it.

## Pagination


## Beta vs. v1 version

Any version marked ```beta``` is still being developed and can change without notice.



## Next steps

Here are some resources to help you get started working with the AODocs APIs:

* Try a hands-on tutorial to [learn common operations in an example sequence](https://drive.google.com/a/altirnao.com/open?id=1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA).
* Use the interactive API Explorer to build requests and queries for the APIs and to see the responses.
* Learn about [each API and its purpose](https://drive.google.com/a/altirnao.com/open?id=1xhBQOKedhNtVtmaviWvvMPjcddScpkkebH3oyqub85I).
* Review and select the appropriate mechanism for [gaining access to AODocs APIs](https://drive.google.com/a/altirnao.com/open?id=1XEgIlXhQ05oCsOJuuTR0L7JHAohBUNedJGkvg2AFXd4).
* Check the reference for all the X available through the APIs.
* Check the X page for a list of available X that can be used with X.
* If you need help, visit the forum.
* Read the performance tips.
* Have trouble falling asleep?  Read the [Appendix](https://drive.google.com/a/altirnao.com/open?id=1su4gnY2t94N662H8UNeZ4A5VzlScTky_k7lqHs2ZwyY), which includes all the most essential soporific auth RFCs.



