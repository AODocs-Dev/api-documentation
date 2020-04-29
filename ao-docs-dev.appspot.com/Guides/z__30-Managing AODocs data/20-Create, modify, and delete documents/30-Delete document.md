# Delete a specific document by ID

You can delete a specific document if you have its ````documentId````.  You can either delete it permanently, or just send it to Trash.  You can retrieve it from the Trash, or leave it there and it will get deleted after some designated amount of time.

## Method and API

Play with the API Explorer and note the code examples (such as cURL and Java):

### [DELETE /document/v1/{documentId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/get)

## Guidelines

### Request

Only ````documentId```` is mandatory, and it must be an AODocs ````documentId```` not a Drive ````fileId````.

> ⭑   **Note**: To get an AODocs document (including its ```documentId```) by the Drive ID of one of its attachments, use the ```GET /document/v1/drive/{driveId}``` method.

### Sample request

```
DELETE https://aodocs.altirnao.com/api/document/v1/RssP0ol81I2JjwfFgxk?deleteMode=TRASH
```

### Response

Because this is a deletion of a resource, there is no resource to return in the response.  The response returns an HTTP code of ```204 (NO CONTENT)```.

### Sample response

```
204
```
---