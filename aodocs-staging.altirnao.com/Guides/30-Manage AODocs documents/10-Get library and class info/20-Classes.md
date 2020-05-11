# Get class info

Libraries contain documents of various types. These document types, defined ahead of time, are called [classes](https://support.aodocs.com/hc/en-us/articles/205655634). When a library is first created, it automatically gets outfitted with a default document type, or class. Other classes in your target library might already have been created for you.

These methods are useful when working with classes:

*   [List all available AODocs classes in a specific library](/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibraryId%7D/get)
*   [Get a specific class](/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibId%7D/documentTypes/%7BdocumentTypeId%7D/get)

What follows is an elaboration on each of these methods.

---


## List classes (to find target classes for your documents)

You can list available target classes for your documents as follows:


### Method and API

Play with the API Explorer:

### [PUT /documentType/v1/libraries/{libraryId}](/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibraryId%7D/get)


### Guidelines


#### Request

Only `libraryId` is mandatory.


#### Sample request


```yaml
GET https://aodocs.altirnao.com/api/documentType/v1/libraries/RrVcEFb8wtDeNAnlmNN
```


To return just the bare minimum of class ID and displayName in the response, you can filter the results by populating the `fields` query parameter with `items(displayName,id,kind),kind` with `%2C` in place of each comma as follows:


```yaml
?fields=items(displayName%2Cid%2Ckind)%2Ckind
```


#### Response

The response returns an [ApiDocumentTypeList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentTypeList) resource, listing all document classes available as part of the specified library.

Response fields of note:



*   `id` (of the class)
*   `displayName`(of the class)
*   `libraryId` (of the library we searched)
*   `defaultClass` (whether or not this is the library's default class)
*   any other fields of interest


#### Sample full response


```json
{
  "kind": "aodocs#classList",
  "items": [
    {
      "kind": "aodocs#classId",
      "id": "RnTbOft44KfZYkfBpV",
      "displayName": "mfie-stag-dms-class-001-default",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "defaultClass": true,
    },
    {
      "kind": "aodocs#classId",
      "id": "RnTf1mx35gaTJLzoFp",
      "displayName": "mfie-stag-dms-class-002-not-default",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "defaultClass": false,
    }
  ]
}
```



#### Sample filtered response


```json
{
  "kind": "aodocs#classList",
  "items": [
    {
      "kind": "aodocs#classId",
      "id": "Rmk8LOJ1y0Jlwq8cxz",
      "displayName": "testClassInsideDMS"
    },
    {
      "kind": "aodocs#classId",
      "id": "Rmn9gYNz9JwCVfQaIK",
      "displayName": "testClass2insideDMS"
    }
  ]
}
```



## List classes in the UI

You can also list your library classes in the UI, on the Library Administration page.

Go to Administration > Library administration. In the left-hand pane, go to Library configuration > Document classes. This is where your classes are listed. Note the singular green checkmark signifying the library's default class.

![list-classes-in-ui.png](/img/list-classes-in-ui.png)

---

## Get a specific class by ID

You can retrieve (the configuration of) a specific class/documentType to confirm it exists or to parse something from its metadata if you have its `documentTypeId` (class ID).

### Method and API

Play with the API Explorer:

### [GET /documentType/v1/libraries/{libId}/documentTypes/{documentTypeId}](/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibId%7D/documentTypes/%7BdocumentTypeId%7D/get)

In the command above:

*   `documentType` is the API
*   `v1` is the API version
*   `libraries` is the top-level resource
*   `documentTypes` or class is the nested resource

### Guidelines

#### Request

Pass the mandatory class ID (`documentTypeId`) and the library ID (`libId`) of the library the class resides in — both as **_path_ parameters** (not in the query string).


```yaml
GET https://aodocs.altirnao.com/api/_ah/api/documentType/v1/libraries/Rs4xtue86axGNklquDP/documentTypes/Rs4xuIg86e45fvAsn9L
```

#### Response

The response returns an [ApiDocumentType](/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentType) resource, listing the specified class.

Response fields of note:

*   `id` (of the class)
*   `displayName` (of the class)
*   `libraryId` (of the library you searched)
*   `defaultClass` (whether or not this is the library's default class)


#### Sample response


```json
{
  {
    "kind": "aodocs#documentType",
    "id": "RnTbOft44KfZYkfBpV",
    "displayName": "mfie-stag-dms-class-001-not-default",
    "libraryId": "RnTG8PDu8ZqTuDVHcv",
  },
  "defaultClass": true,
}
```

---
