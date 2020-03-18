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
GET https://ao-docs.appspot.com/_ah/api/documentType/v1/libraries/Rs4xtue6axGNklquDP/documentTypes/Rs4xuIg6e45fvAsn9L
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