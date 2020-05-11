# Get a specific library by ID

You can retrieve to parse something from its metadata (or to confirm it exists) if you have its ```libraryId```.

## Method and API

Play with the API Explorer:

### [GET /library/{libId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/library/v1/%7BlibId%7D/get)

## Usage/notes/guidelines

### Request

To get your desired library back in the response you have to provide the library ID.  This is the only mandatory field.  If you want the response to come back with only a core set of metadata for your library, set the `include` parameter to `NONE`.

##### Sample request


```
GET https://aodocs.altirnao.com/api/library/v1/RrVcEFb8wtDeNAnlmNN
```



##### Response

The response returns an [ApiLibrary](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiLibrary) resource, listing the library associated with the provided library ID.

Response fields of note:



*   ````libraryId````
*   `name` / homeUrl
*   `rootFolderId` (the ID of the topmost level of the library's hierarchy)
*   `defaultDocumentType` (the library's default class ID)
*   `favorited` (whether or not the library is starred as a favorite)
*   any other fields of interest


##### Sample response (include=NONE)


```
{
  "kind": "aodocs#library",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "name": "my-DMS-lib-001",
  "homeUrl": "my-dms-lib-001",
  "daysBeforeDelete": 30,
  "welcomeText": "<p>Welcome to your new Document Management library: my-DMS-lib-001</p><br><p>To get started...</p>",
  "storageAdmin": "storage.account@test.aodocs.com",
  "pushToMyDrive": false,
  "onlyAdminsCanManageFolders": false,
  "onlyAdminsCanEditRootFolder": false,
  "defaultDocumentType": "RnTbOft44KfZYkfBpV",
  "rootFolderId": "1S7ayhti78VtuNl-SebgGTu_wliznnR47",
  "defaultView": "RnTbOoSwQ32JuKPEi1",
  "favorited": true
  ...
}
```


---