# List and search documents

In this section, we explore the following:

* [Get document by ID](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/30-List%20and%20search%20documents/30-Get%20document%20by%20ID)

* [List documents](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/30-List%20and%20search%20documents/40-List%20documents)

* [Search documents](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/30-List%20and%20search%20documents/50-Search%20documents)

* [Count documents](/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/30-List%20and%20search%20documents/45-Count%20documents)

---

# Get specific document by ID

You can retrieve (the configuration of) a specific document to parse something from its metadata (or just confirm it exists) if you have its ```documentId```.

> ⭑   **Note**: As always, you can look for the file in the UI as well.  If for whatever reason it does not appear there after you've created a new document, it might be because of the way your Views are set up.  Go to your Library administration page, go to Views, and select the checkbox called "View documents from other classes".


## Method and API

Play with the API Explorer:

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

# List documents of a library

> **Note**: This is available only to library administrators.

You can list documents associated with a particular library as follows.

## Method and API

Play with the API Explorer:

### [POST /search/v1/libraries/{libraryId}/list](../../../../routes/search/v1/libraries/{libraryId}/post)

## Usage/notes/guidelines

### Request

```libraryId``` is a path parameter.  It is the only mandatory parameter.

### Sample request

```yaml
POST https://aodocs-staging.altirnao.com/api/search/v1/libraries/Rs511XR8xAxGXu7nZYj/list
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
        "libraryName": "mfie-stag-DMS-lib-001",
        "className": "mfie-stag-dms-class-002",
        "libraryId": "RnTG8PDu8ZqTuDVHcv",
        "classId": "RnTf1mx35gaTJLzoFp",
        "id": "RnTzVT28x5Sb48h3vSQ",  <— documentId
        "title": "mfie-stag-dms-doc-002",
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

---

# Count documents of a library

> **Note**: This is available only to library administrators.

You can count the number of documents associated with a particular library (and optionally class) as follows.

## **Method and API**

Play with the API Explorer:

### **[POST /search/v1/libraries/{libraryId}/count](/docs/aodocs-staging.altirnao.com/1/routes/search/v1/libraries/%7BlibraryId%7D/count/post)**

## **Usage/notes/guidelines**

### **Request**

`libraryId` is a path parameter. It is the only mandatory parameter.  However, using the ```classId``` helps narrow the response to documents of a specific class you want.

### **Sample request**

```http
POST https://aodocs-staging.altirnao.com/api/search/v1/libraries/RrVcEFb8wtDeNAnlmNN/count?classId=RrVcdN280MKJwPyE7sh
```


### **Response**

The response returns an [ApiDocumentCount](/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentCount) resource, giving a count of all documents associated with the specified library (and class if you specified the ```classId```).

### Sample response


```json
{
  "kind": "aodocs#documentCount",
  "count": 12
}


---

# Search documents of a class

<!-- > **Note**: This is available only to library administrators. -->

You can search for documents associated with a particular library and a particular class as follows.

## Method and API

Play with the API Explorer:


### [POST /search/v1/libraries/{libraryId}/search](/docs/aodocs-staging.altirnao.com/1/routes/search/v1/libraries/%7BlibraryId%7D/search/post)

## Usage/notes/guidelines

### Usage/notes/guidelines

This method searches documents of a class matching the provided query.  It might become very slow or time out when iterating over many pages of results. If the result set contains more than 10,000 documents, it's highly likely the response will get truncated and some results will be missing. You should always check if ```precision=INCOMPLETE_RESULT``` in the response.

> **Note**: By default, the method includes attachments in the search.  You can exclude searching in attachments by setting the `searchInAttachments` parameter to `false`.


### Request

`libraryId` is a path parameter and `classId` is a query parameter. These are the only mandatory arguments. However, the `searchQuery` query parameter is what ultimately determines what results come back, filtering them on a text string.

> **Note**: If you want to search for a specific phrase as a singular whole, put double quotes around the phrase being passed as a ```searchQuery``` query parameter.  For example, if your document is called "big blue document", then sending "big blue" or "blue document" (with the double quotes) as the ```searchQuery``` query parameter finds it, but "big document" does not.


### Sample request


```yaml
POST https://aodocs-staging.altirnao.com/api/search/v1/libraries/RrVWqiT8059P4t8aVYI/search?classId=RrVWtjs801GlsyxIDJe&searchQuery=%22blue%20document%22
```

### Response

The response returns an [ApiSearchResult](/docs/aodocs-staging.altirnao.com/1/types/ApiSearchResult) resource, listing all documents that match the specified query.


### Sample response


```json
{
    "kind": "aodocs#documentList",
    "documentList": [
    {
        "kind": "aodocs#document",
        "libraryName": "my-DMS-lib-001",
        "className": "my-dms-class-002",
        "libraryId": "RrVWqiT8059P4t8aVYI",
        "classId": "RrVWtjs801GlsyxIDJe",
        "id": "RnTzVT28x5Sb48h3vSQ",  <— documentId
        "title": "big blue document",
        ...
    }
    ...
    ]
}


---

