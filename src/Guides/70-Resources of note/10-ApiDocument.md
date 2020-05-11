# [DRAFT] Resource: ```ApiDocument```


## What it is

The [ApiDocument](/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource is a representation of an AODocs document: that is, a JSON-formatted listing of all of the metadata that an AODocs document is made up of.

This includes, but is not limited to the following:

*   system properties like modifiedDate, title, and rich-text description field
*   user-defined custom properties
*   a listing of Google Drive attachments, if any

> ⭑   Note: The AODocs ```ApiDocument``` resource is not the same as the [Google Drive Files resource](https://developers.google.com/drive/api/v3/reference/files). They are both core resources of their respective APIs, and they do interact, but they are two different and distinct things: a Drive file is what becomes an attachment to an AODocs document. That is, an AODocs document acquires a reference/link to a managed Drive file.

The ```ApiDocument``` resource lives on the AODocs resource server, and you interact with it there. You send calls to the server to operate on the resource, and the server performs the operation and sends back the result of the operation to you.

Most of the time, you include in your request a subset of the resource. For example, if you need to write to a resource (with ```PUT``` or ```PATCH```), you send an abridged representation of the resource in question, such as ```ApiDocument``` to the server, specifying just the parts you want altered.

If you are retrieving a resource as part of a ```GET``` operation (read-only), the ```ApiDocument``` resource you send to the server is even smaller, specifying mostly just the fields that identify the resource you want.

The server receives the abridged ```ApiDocument``` resource from your request, maps your fields to the fields of its resident resource, and reconciles the resource from the request with the resource on the server using the operation you specified. If successful, the resulting ```ApiDocument``` resource is sent back to you for analysis.


## What it's used for, with example

```ApiDocument``` is the core piece of AODocs and one of the most commonly-used. In DMS libraries, you can create documents with any number of attachments from Google Drive files (in TF/SF it's exactly one attachment per document). You can create and retrieve a document, update it with new attachments and properties, and delete one or more documents.

For example, let's say you want to [create a new document with an attachment](/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/20-Create,%20modify,%20delete%20documents/10-Create%20new%20documents%20with%20attachments/00-Overview). An AODocs document attachment is a reference to a managed Google Drive file. You procure the file ID of your Drive file, and you tell the resource server to create (`PUT`) a new document with a link to that file ID inside a specific library.


## Example code snippet


```yaml
// creates a new document with an attachment from a Drive fileId, and puts it in a specific library by libraryId

PUT https://aodocs-apis.com/api/document/v1?securityCode=abc123
```

```json
{
    "libraryId":"RnTG8PDu8ZqTuDVHcv",
    "attachments":[
        {
            "fileId":"1xAk25p8Xt...ICVjBg"
        }
    ]
}
```



## JSON representation (full?  sample?)

____________________________________________


```
{
  "kind": "aodocs#document",
  "domainName": "test.aodocs.com",
  "libraryName": "my-DMS-lib-001",
  "className": "my-dms-class-002",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "classId": "RnTf1mx35gaTJLzoFp",
  "id": "RnTzVT2x5Sb48h3vSQ",  <— documentId
  "title": "my-dms-doc-002",
  "richText"": "",
  ...
}
```


____________________________________________


## ApiDocument subresources

![resource-fields.png](/img/resource-fields.png)

[Needs description of main subresources of each important resource.]

## Fields

[different from API ref how?]


## Methods

[different from API ref how?]