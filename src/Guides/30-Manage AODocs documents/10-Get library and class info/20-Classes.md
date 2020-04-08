# Get class info

Libraries contain documents of various **types**.  These document types, defined ahead of time, are called **[classes](https://support.aodocs.com/hc/en-us/articles/205655634)**.  When a library is first created, it automatically gets outfitted with a default document type, or class.  Other classes in your target library might already have been created for you.

These methods are useful when working with classes:

* [List all available AODocs classes in a specific library](#heading=h.z5cmdwh1c18a)
* [Get a specific class](#heading=h.z5cmdwh1c18a)

---


# List classes (to find target classes for your documents)

You can list available target classes for your documents as follows:

## Method and API

Play with the API Explorer and note the code examples (such as cURL and Java):

### [PUT /documentType/v1/libraries/{libraryId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibraryId%7D/get)

## Guidelines

### Request

Only ````libraryId```` is mandatory.

### Sample request

```
GET https://aodocs.altirnao.com/api/documentType/v1/libraries/RrVcEFb8wtDeNAnlmNN
```

To return just the bare minimum of class ID and displayName in the response, you can filter the results by populating the ````fields```` query parameter with ````items(displayName,id,kind),kind```` as follows:

```
fields=items(displayName%2Cid%2Ckind)%2Ckind
```

### Response

The response returns an [ApiDocumentTypeList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentTypeList) resource, listing all document classes available as part of the specified library.

Response fields of note:

*   ````id```` (of the class)
*   ```displayName```(of the class)
*   ```libraryId``` (of the library we searched)
*   ```defaultClass``` (whether or not this is the library's default class)
*   any other fields of interest

### Sample full (abridged) response

```
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

### Sample filtered response (complete)

```
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

# List classes in the UI

You can also list your library classes in the UI, on the Library Administration page.

Go to Administration > Library administration.  In the left-hand pane, go to Library configuration > Document classes.  This is where your classes are listed.  Note the singular green checkmark signifying the library's default class.

![list-classes-in-ui.png](/img/list-classes-in-ui.png)


_____________________________

# Get a specific class by ID

You can retrieve (the configuration of) a specific class/documentType to confirm it exists or to parse something from its metadata if you have its `classId`/`documentTypeId`.

## Method and API

Play with the API Explorer and note the code examples (such as cURL and Java):

### [GET /documentType/v1/libraries/{libId}/documentTypes/{documentTypeId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibId%7D/documentTypes/%7BdocumentTypeId%7D/get)

In the command above:
* ```documentType``` is the API
* ```v1``` is the API version
* ```libraries``` is the top-level resource
* ```documentTypes``` or class is the nested resource

## Guidelines

### Request

Pass the mandatory ````classId````/````documentId````, as well as the ````libId```` of the library the class resides in as **_path_ parameters** (not in the query string).


### Sample request
```
GET https://aodocs.altirnao.com/api/_ah/api/documentType/v1/libraries/Rs4xtue6axGNklquDP/documentTypes/Rs4xuIg6e45fvAsn9L
```

### Response

The response returns an [ApiDocumentType](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentType) resource, listing the specified class.

Response fields of note:

*   ```id``` (of the class)
*   ```displayName``` (of the class)
*   ```libraryId``` (of the library you searched)
*   ```defaultClass``` (whether or not this is the library's default class)

### Sample response

```
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