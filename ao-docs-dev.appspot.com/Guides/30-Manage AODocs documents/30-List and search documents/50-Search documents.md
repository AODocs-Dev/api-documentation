# Search documents of a class

<!-- > **Note**: This is available only to library administrators. -->

You can search for documents associated with a particular library and a particular class as follows.

## Method and API

Play with the API Explorer:


### [POST /search/v1/libraries/{libraryId}/search](/docs/aodocs-staging.altirnao.com/1/routes/search/v1/libraries/%7BlibraryId%7D/search/post)

## Usage/notes/guidelines

### Usage/notes/guidelines

This method searches documents of a class matching the provided query. It might become very slow or time out when iterating over many pages of results. If the result set contains more than 10,000 documents, it's highly likely the response will get truncated and some results will be missing. You should always check if ```precision=INCOMPLETE_RESULT``` in the response.

> **Note**: By default, the method includes attachments in the search. You can exclude searching in attachments by setting the `searchInAttachments` parameter to `false`.


### Request

`libraryId` is a path parameter and `classId` is a query parameter. These are the only mandatory arguments. However, the `searchQuery` query parameter is what ultimately determines what results come back, filtering them on a text string.

> **Note**: If you want to search for a specific phrase as a singular whole, put double quotes around the phrase being passed as a ```searchQuery``` query parameter. For example, if your document is called "big blue document", then sending "big blue" or "blue document" (with the double quotes) as the ```searchQuery``` query parameter finds it, but "big document" does not.


### Sample request


```yaml
POST https://aodocs.altirnao.com/api/search/v1/libraries/RrVWqiT8059P4t8aVYI/search?classId=RrVWtjs801GlsyxIDJe&searchQuery=%22blue%20document%22
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
