
# List classes (to find target classes for your documents)

You can list available target classes for your documents as follows:

## Method and API

Play with the API Explorer:

### [PUT /documentType/v1/libraries/{libraryId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibraryId%7D/get)

## Guidelines

### Request

Only ````libraryId```` is mandatory.

### Sample Request

```yaml
GET https://aodocs.altirnao.com/api/documentType/v1/libraries/RrVcEFb8wtDeNAnlmNN
```

To return just the bare minimum of class ID and displayName in the response, you can filter the results by populating the ````fields```` query parameter with ````items(displayName,id,kind),kind```` as follows:

```
fields=items(displayName%2Cid%2Ckind)%2Ckind
```

### Response

The response returns an [ApiDocumentTypeList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentTypeList) resource, listing all document classes available as part of the specified library.

Response fields of note:

*   ````id```` (of the class)
*   ```displayName```(of the class)
*   ```libraryId``` (of the library we searched)
*   ```defaultClass``` (whether or not this is the library's default class)
*   any other fields of interest

### Sample full (abridged) response

```
{
  "kind": "aodocs#classList",
  "items": [
    {
      "kind": "aodocs#classId",
      "id": "RnTbOft44KfZYkfBpV",
      "displayName": "my-dms-class-001-default",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "defaultClass": true,
    },
    {
      "kind": "aodocs#classId",
      "id": "RnTf1mx35gaTJLzoFp",
      "displayName": "my-dms-class-002-not-default",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "defaultClass": false,
    }
  ]
}
```

### Sample filtered response (complete)

```
{
"kind": "aodocs#classList",
"items": [
 {
  "kind": "aodocs#classId",
  "id": "Rmk8LOJ1y0Jlwq8cxz",
  "displayName": "testClassInsideDMS"
 },
 {
  "kind": "aodocs#classId",
  "id": "Rmn9gYNz9JwCVfQaIK",
  "displayName": "testClass2insideDMS"
 }
]
}
```

# List classes in the UI

You can also list your library classes in the UI, on the Library Administration page.

Go to Administration > Library administration.  In the left-hand pane, go to Library configuration > Document classes.  This is where your classes are listed.  Note the singular green checkmark signifying the library's default class.

![image placeholder](/docs/img/api.png)


_____________________________