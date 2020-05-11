# Overview


### **Resources**

An AODocs object such as a document or a library is a logical grouping of metadata arranged to serve an organizational purpose.

An AODocs resource is a schematic model of an AODocs object. It's a map of how individual instances of the object are pieced together as fields and array fields of bits of data.

AODocs adheres loosely to the Resource-oriented API designed [as defined by Google](https://cloud.google.com/apis/design/resources), so you might find similarities in AODocs API resources and resources from the Drive API for example.

In AODocs APIs, a particular instance of a resource has a JSON-formatted representation , which gets sent back and forth between the server and the client, and the server uses the representation to manipulate the resource itself.

The fields of a representation include, but are not limited to the following:

*   Unique identifiers
*   Common global system fields like creation or modification date, name, last modifying user (these concepts are not necessarily named the same way)
*   Specific (custom) fields
*   References by ID to other resources (library ID in a document for example)
*   A listing of any subresources (if applicable)


### An example resource (library)

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
    "welcomeText": "<p>Hello world!</p>",
    "storageAdmin": "aodocs-aodocs@test.altirnao.com",
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

## Non-resources

### Subresources

In AODocs APIs, a **subresource** is an **attribute** of a resource. It is resource-like only in that it has a schema and can be represented in JSON. However, no methods operate on it directly, and it cannot exist on its own, without its parent resource. ```ApiPermission``` and ```ApiLibraryPermission``` are good examples of subresources: you can alter them only as part of the resource they belong to.

### Collections

An AODocs **collection** is a **list** of resources or subresources. It is not a resource by itself in the context of AODocs APIs. What makes a collection meaningful is what it lists. A list of documents (```ApiDocumentList```) is one example of a resource collection. A list of libraries (```ApiLibraryList```) is another. Meanwhile, ```ApiLibraryPermissionList``` is a **collection** of **subresources** (permissions for a specific library).

> ⭑  **Note**: Requests for collections often return too many results and are best handled using [pagination](https://drive.google.com/a/altirnao.com/open?id=1rUH-H2uGCp4xMwOV_XtKld1FJo6qai_60ZZZ3JP3ePI).

## Collections vs. resources vs. subresources

One way to explore what makes a collection different from a resource or a subresource is to use the example of permissions. Permissions are subresources that can be listed both as a collection or as part of a resource. Both the ```ApiLibraryPermissionsList``` and the ```ApiLibrary``` resource contain an array field of permissions: the former exclusively, the latter as part of its larger construct.

You can get a library's list of permissions in two ways:

*   `GET` an `ApiLibraryPermissionsList` (collection) for that specific library
*   `GET` that specific `ApiLibrary` (resource) and use the `fields` field to return only the list of permissions for that specific library

The result looks the same in both cases:


```json
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
```

> ⭑  **Note**: By definition, a collection contains at least one **array field**. And, unlike subresources, it is used by at least one method.

### **How to interact with resources**

An AODocs resource lives on the resource server. You interact with the resource by sending requests to the server to operate on it. The server performs the requested operation and sends back the result.

Most of the time, you include in your request a subset of the resource:


*   When creating a resource (with a ```PUT```) or updating it fully (with a ```POST```), you are not required to send the complete resource, as most fields have a default value.
*   If you need to update a resource _partially_ (with a `PATCH` request), send an abridged representation of the resource in question (such as `ApiDocument`) to the server, specifying just the parts you want altered.

In all cases, the server parses your abridged _request resource_, maps your fields to the fields of its _resident resource_, possibly fills some fields with their default values, and reconciles the request and resident resources using the operation you specify. If successful, the complete resulting resource is sent back to you to consume.

## Common AODocs resources and collections

[Resource: ApiDocument](docs/aodocs-staging.altirnao.com/1/types/ApiDocument) (an AODocs document)

[Collection: ApiLibraryList](/docs/aodocs-staging.altirnao.com/1/types/ApiLibraryList) (a list of libraries)

[Resource: ApiDocumentType](/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentType) (the class/type of an AODocs document)