# Get AODocs library info (list all available libraries)

AODocs content is contained in libraries.  Your libraries should already exist; if they don't, a library administrator needs to [create them first](https://support.aodocs.com/hc/en-us/articles/115002366923-Create-a-library-from-scratch).

Once your libraries exist, you can list them to get an idea of where to place your content.

The most useful methods to list and get libraries are the following:

* [List all available AODocs libraries (full)](03-List%20all%20libraries)
* [List all available AODocs libraries (plain)](#heading=h.l3tpn8bxn8c)
* [Get a specific library](#heading=h.sgixsybfrj2a)

---

# List libraries and find target library ID for your documents (v1)

To list target libraries on your domain, select a target library for your AODocs documents to be a part of, and note the target library's unique identifier, ```libraryId```.

## Method and API

Play with the API Explorer:

### [PUT /library/v1](../../../../routes/library/v1/put)

## Usage/notes/guidelines

### Request


> ⚠  **Warning/Alert**: This method requests all metadata for all libraries on the domain.  Not recommended without filtering!

This method has no mandatory parameters, but without setting any filtering it tries to return all metadata for all libraries, which is often overwhelming to the server and might not produce any response.  We strongly recommend you set the ```include``` query parameter to ```NONE```.



### Sample request

```yaml
PUT https://aodocs.altirnao.com/api/library/v1?include=NONE
```

Alternatively use the **[List plain libraries](04-List%20all%20libraries%20plain)** method to get just the key-value pairs of```name``` and ```id```.  This is equivalent to requesting the full ```ApiLibraryList``` resource but with the ```fields``` field to filter out everything except ```name``` and ```id```.

### Response

The response returns an [ApiLibraryList](../../../../types/ApiLibraryList) resource, listing all libraries accessible to you on the domain.  With the recommended parameter ```include=NONE``` the response is smaller and far more manageable.

Take note of the `libraryId` of your target library.  The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional fields to note:

*   ```name``` (of the library)
*   ```defaultDocumentType``` (the library's default class ID)
*   ```rootFolderId``` (the ID of the topmost level of the library's hierarchy)
*   ```favorited``` (whether or not the library is starred as a favorite)
*   any other fields of interest

### Sample response

```json
{
  "kind": "aodocs#libraryList",
  "libraries": [
    {
      "kind": "aodocs#library",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "name": "mfie-stag-DMS-lib-001",
      "defaultDocumentType": "RnTbOft44KfZYkfBpV",
      "rootFolderId": "1S7ayhti78VtuNl-SebgGTu_wliznnR47",
      "favorited": false,
      ...
    },
    {
      "kind": "aodocs#library",
      "libraryId": "Rngc1ug8K6WmL3IjZ8",
      "name": "mfie-sf-lib-005",
      "defaultDocumentType": "Rngc4rL9JCj5xwTtrF",
      "rootFolderId": "1yAMvoTBFEvI_8GXghiyTEJqevJeW7q9C",
      "favorited": true
    }
}
```

## List libraries and find ```libraryId``` in UI

You can also locate the ```libraryId``` of your target library inside the AODocs UI.  Go to your homepage > My libraries by clicking on the "My libraries" link in the upper left corner of most pages:

![libraryid-in-ui.png](/img/libraryid-in-ui.png)


Open the desired target library, and note the library ID in the URL.  It's the long string of numbers and letters after `LibraryId_` (up to and _excluding_ the next slash):

```
/LibraryId_libraryId
```

### Example

```
/LibraryId_RnTG8PDu8ZqTuDVHcv
```

Learn more about [navigating homepages](https://support.aodocs.com/hc/en-us/articles/208769506-What-is-the-AODocs-homepage-#h_594b6e3a-aebb-4b71-8d8e-a4c8aad7cc51) inside your AODocs and specific libraries.

---

# List libraries plain (alternative to List libraries)

If you only need the library name and ID in the response, then you can use the plain library list (```ApiPlainLibraryList```) as an alternative to the full library list (```ApiLibraryList```).

This is the same as asking for the full ```ApiLibraryList``` collection and using the ```fields``` field to filter the response down to just the ```name``` and ```id``` fields.

## Method and API

Play with the API Explorer:

### [PUT /library/v1/plain](../../../../routes/library/v1/plain/put)

## Usage/notes/guidelines

### Request

There are no mandatory or recommended parameters to send.

### Sample Request

```yaml
PUT https://aodocs.altirnao.com/api/library/v1/plain
```


### Response

The response returns an [ApiPlainLibraryList](../../../../types/ApiPlainLibraryList) resource, listing all libraries accessible to you on the domain, but only listing the following for each:

*   library name
*   library ID
*   modification dates

Take note of the ````libraryId```` of your target library.  The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional response fields to note:

*   `name` (of the library)

### Sample Response

```json
  {
      "kind": "aodocs#plainLibrary",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "name": "mfie-stag-DMS-lib-001",
      "lastModified": "1579005945318",
      "lastConfigModified": "1579005945318"
    },
    {
      "kind": "aodocs#plainLibrary",
      "libraryId": "Rngc1ug8K6WmL3IjZ8",
      "name": "mfie-sf-lib-005",
      "lastModified": "1579619340936",
      "lastConfigModified": "1579619340936"
    }
    ...
```

---

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
  "name": "mfie-stag-DMS-lib-001",
  "homeUrl": "mfie-stag-dms-lib-001",
  "daysBeforeDelete": 30,
  "welcomeText": "<p>Welcome to your new Document Management library: mfie-stag-DMS-lib-001</p><br><p>To get started...</p>",
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