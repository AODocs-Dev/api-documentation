# Search documents of a library

<!-- > **Note**: This is available only to library administrators. -->

You can search for documents associated with a particular library and a particular class as follows.


## Method and API

Play with the API Explorer and note the code examples (such as cURL and Java):

### [POST /search/v1/libraries/{libraryId}/search](../../../../routes/search/v1/libraries/{libraryId}/search/post)


## Usage/notes/guidelines

Searches documents of a class matching the provided query. Might become very slow or timeout when iterating over many results pages. If the result set contains more than 10k documents, it's highly likely some results will be missing. You should always check if precision=INCOMPLETE_RESULT in the response.

> **Note**: By default, the method includes attachments in the search.  You can exclude searching in attachments by setting the `searchInAttachments` parameter to `false`.


### Request

```libraryId``` is a path parameter and ```classId``` is a query parameter.  These are the only mandatory arguments.  However, the ```searchQuery``` query parameter is what ultimately determines what results come back, filtering them on a text string.

> **Note**: If you want to search for a specific phrase as a singular whole, put double quotes around the phrase being passed as a ```searchQuery``` query parameter.  For example, if your document is called "big blue document", then sending "big blue" or "blue document" (with the double quotes) as the ```searchQuery``` query parameter finds it, but "big document" does not.


### Sample request

```yaml
POST https://aodocs-staging.altirnao.com/api/search/v1/libraries/{libraryId}/search
```

### Response

The response returns an [ApiSearchResult](../../../../types/ApiSearchResult) resource, listing all documents that match the specified query.


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


