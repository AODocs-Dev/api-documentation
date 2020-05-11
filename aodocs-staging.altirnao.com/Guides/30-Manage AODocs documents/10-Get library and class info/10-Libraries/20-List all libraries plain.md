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

Take note of the ````libraryId```` of your target library. The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional response fields to note:

*   `name` (of the library)

### Sample Response

```json
  {
      "kind": "aodocs#plainLibrary",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "name": "my-DMS-lib-001",
      "lastModified": "1579005945318",
      "lastConfigModified": "1579005945318"
    },
    {
      "kind": "aodocs#plainLibrary",
      "libraryId": "Rngc1ug8K6WmL3IjZ8",
      "name": "my-sf-lib-005",
      "lastModified": "1579619340936",
      "lastConfigModified": "1579619340936"
    }
    ...
```

---