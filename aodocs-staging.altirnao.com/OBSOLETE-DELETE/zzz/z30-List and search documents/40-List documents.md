# List documents of a library

> **Note**: This is available only to library administrators.

You can list documents associated with a particular library as follows.

## Method and API

Play with the API Explorer:

### [POST /search/v1/libraries/{libraryId}/list](../../../../routes/search/v1/libraries/{libraryId}/post)

## Usage/notes/guidelines

### Request

```libraryId``` is a path parameter. It is the only mandatory parameter.

### Sample request

```yaml
POST https://aodocs.altirnao.com/api/search/v1/libraries/Rs511XR8xAxGXu7nZYj/list
```

### Response

The response returns an [ApiDocumentList](../../../../types/ApiDocumentList) resource, listing all documents associated with the specified library.

### Sample Response

```json
{
    "kind": "aodocs#documentList",
    "documentList": [
    {
        "kind": "aodocs#document",
        "libraryName": "my-DMS-lib-001",
        "className": "my-dms-class-002",
        "libraryId": "RnTG8PDu8ZqTuDVHcv",
        "classId": "RnTf1mx35gaTJLzoFp",
        "id": "RnTzVT28x5Sb48h3vSQ",  <— documentId
        "title": "my-dms-doc-002",
        "richText"": "",
        ...
    }
    ...
    {
        "kind": "aodocs#document",
        ...
    }
    ]
}
```


