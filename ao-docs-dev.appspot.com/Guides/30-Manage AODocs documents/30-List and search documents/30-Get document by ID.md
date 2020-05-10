# Get specific document by ID

You can retrieve (the configuration of) a specific document to parse something from its metadata (or just confirm it exists) if you have its ```documentId```.

> ⭑   **Note**: As always, you can look for the file in the UI as well.  If for whatever reason it does not appear there after you've created a new document, it might be because of the way your Views are set up.  Go to your Library administration page, go to Views, and select the checkbox called "View documents from other classes".


## Method and API

Play with the API Explorer and note the code examples (such as cURL and Java):

### [GET /document/v1/{documentId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/get)

## Guidelines

### Request

Only ```documentId``` is mandatory, and it must be an AODocs ```documentId``` not a Drive ```fileId```.

### Sample request (asking for a full resource)

```yaml
GET https://aodocs.altirnao.com/api/document/v1/RnTzVT28x5Sb48h3vSQ
```

If you need only some of the fields of the extensive ApiDocument resource to come back, you can specify them in the ```fields``` array field of the request and sending this list as a query parameter.  For example, you might want to request only the library name, class name, library ID, class ID, document ID, title, and the document description.

### Sample request (partial resource)

```yaml
GET https://aodocs.altirnao.com/api/document/v1/RnTzVT28x5Sb48h3vSQ?fields=libraryName%2CclassName%2ClibraryId%2CclassId%2Cid%2Ctitle%2CrichText
```

> ⭑   **Note**: To get an AODocs document (including its ```documentId```) by the Drive ID of one of its attachments, use the ```GET /document/v1/drive/{driveId}``` method.

### Response

The response returns an [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource, listing the document associated with the provided document ID.  The document's ID is ````id````, and its class is what you specified in the request, else of the library's default type.

### Sample Response

```json
{
  "kind": "aodocs#document",
  "libraryName": "mfie-stag-DMS-lib-001",
  "className": "mfie-stag-dms-class-002",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "classId": "RnTf1mx35gaTJLzoFp",
  "id": "RnTzVT28x5Sb48h3vSQ",  <— documentId
  "title": "mfie-stag-dms-doc-002",
  "richText"": "",
  ...
}
```

---
