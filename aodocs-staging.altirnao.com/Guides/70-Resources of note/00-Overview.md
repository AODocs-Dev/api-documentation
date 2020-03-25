# Introduction to AODocs resources


## Key concepts


### Resources

An AODocs **object** such as a document or a library is a logical grouping of metadata arranged to serve an organizational purpose.

A **resource** is a schematic **model** of an AODocs object.  It's a map of how individual instances of the object are pieced together as fields and array fields of bits of data.

In AODocs APIs, a particular instance of a resource has a JSON-formatted **representation** , which gets sent back and forth between the server and the client, and the server uses the representation to manipulate the resource itself.

The fields of a representation include, but are not limited to the following:



*   unique identifiers
*   system properties like date and name
*   custom properties, if any
*   references to other resources (documents in a library for example)
*   a listing of any subresources (if applicable)


#### An example resource (library)

```json
{
    "kind": "aodocs#library",
    "libraryId": "PHOv3s48xfbgjJa22iA",
    "name": "Corporate Files",
    "name_i18n": "Corporate Files",
    "domainName": "test.aodocs.com",
    "lastModified": "1556010506520",
    "lastConfigModified": "1556010506520",
    "createdAt": "1435948376818",
    "daysBeforeDelete": 30,
    "welcomeText": "&lt;p>Hello world!&lt;/p>",
    "storageAdmin": "aodocs-aodocs@test.altirnao.com",
},
"documentTypes": {
                    "kind": "aodocs#classList",
                    "items": [
                                {
                                    "kind": "aodocs#classId",
                                    "name": "Document",
                                    "name_i18n": "Document",
                                    "value": "PHOv3eF9uERXEP6NFb"
                                }
                            ]
                }
}
```

### Non-resources


#### Subresources

In AODocs APIs, a **subresource** is an **attribute** of a resource.  It is resource-like only in that it has a schema and can be represented in JSON.  However, no methods operate on it directly, and it cannot exist on its own, without its parent resource.  ```ApiPermission``` and ```ApiLibraryPermission``` are good examples of subresources: you can alter them only as part of the resource they belong to.


#### Collections

An AODocs **collection** is a **list** of resources or subresources.  It is not a resource by itself in the context of AODocs APIs.  What makes a collection meaningful is what it lists.  A list of documents (```ApiDocumentList```) is one example of a resource collection.  A list of libraries (```ApiLibraryList```) is another.  Meanwhile, ```ApiLibraryPermissionList``` is a **collection** of **subresources** (permissions for a specific library).


### Collections vs. resources vs. subresources

One way to explore what makes a collection different from a resource or a subresource is to use the example of permissions.  Permissions are subresources that can be listed both as a collection or as part of a resource.  Both the ```ApiLibraryPermissionsList``` and the ```ApiLibrary``` resource contain an array field of permissions: the former exclusively, the latter as part of its larger construct.

You can get a library's list of permissions in two ways:



*   ```GET``` an ```ApiLibraryPermissionsList``` (collection) for that specific library
*   ```GET``` that specific ```ApiLibrary``` (resource) and use the ```fields``` field to return only the list of permissions for that specific library

The result looks the same in both cases:


    {


    "kind": "aodocs#libraryPermissionList",


    "permissions": [


     {


      "kind": "aodocs#libraryPermission",


      "type": "user",


      "role": "admin",


      "value": "martin@test.altirnao.com",


      "withLink": false,


      "name": "Martin",


     },


     {


      "kind": "aodocs#libraryPermission",


      "type": "user",


      "role": "admin",


      "value": "aodocs.max@test.altirnao.com",


      "withLink": false,


      "name": "AODocs Files",


     },


     {


      "kind": "aodocs#libraryPermission",


      "type": "user",


      "role": "admin",


      "value": "bob@altirnao.com",


      "withLink": false,


      "name": "Bob",


     }


    ]


    }

> **Note**: By definition, a collection contains at least one **array field**.  And, unlike subresources, it is used by at least one method.


## How it works

An AODocs resource lives on the resource server.  You interact with the resource by sending requests to the server to operate on it.  The server performs the requested operation and sends back the result.

Most of the time, you include in your request a subset of the resource.  For example, if you need to _write_ to a resource (with ```PUT``` or ```PATCH```), you send an abridged representation of the resource in question (such as ```ApiDocument```) to the server, specifying just the parts you want altered.

If you are retrieving a resource as part of a ```GET``` operation (read-only), the resource you send to the server is even smaller, specifying mostly just the fields that identify the resource you want.

The server parses your abridged _request resource_, maps your fields to the fields of its _resident resource_, and reconciles the request and resident resource using the operation you specify.  If successful, the resulting resource is sent back to you to consume.


## Common AODocs resources and collections


### [Resource: ApiDocument](https://drive.google.com/a/altirnao.com/open?id=1qEfeA1tumsILjYzeFxdUQlApuEokxajKYrewOBjtU9U)

An AODocs document


### [Collection: ApiLibraryList](https://drive.google.com/a/altirnao.com/open?id=1RUPR8U3qTwLpJECQrkhJitje4v56g2YzO-Pfkngk9TI)

A list of libraries


### [Resource: ApiDocumentType](https://drive.google.com/a/altirnao.com/open?id=12jt__svbizg-W9fWr0fD3_qAiMfwLQwZZujFhMiiId0)

The class (type) of an AODocs document


<!-- Docs to Markdown version 1.0β19 -->
