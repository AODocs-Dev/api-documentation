# List libraries and find target library ID for your documents

To list target libraries on your domain, select a target library for your AODocs documents to live in, and note the target library's unique identifier, ```libraryId```.

## Method and API

Play with the API Explorer and note the code examples (such as cURL and Java):

### [PUT /library/v1](../../../../routes/library/v1/put)

## Usage/notes/guidelines

### Request


> ⚠  Warning/Alert: This method requests all metadata for all libraries on the domain.  Not recommended without filtering!

This method has no mandatory parameters, but without setting any filtering it tries to return all metadata for all libraries, which is often overwhelming to the server and might not produce any response.  We strongly recommend you set the ```include``` query parameter to ```NONE```.



### Sample request


```html
PUT https://aodocs-apis.com/api/library/v1?include=NONE
```

```vim
PUT https://aodocs-apis.com/api/library/v1?include=NONE
```

```xml
PUT https://aodocs-apis.com/api/library/v1?include=NONE
```

```ruby
PUT https://aodocs-apis.com/api/library/v1?include=NONE
```

```http
PUT https://aodocs-apis.com/api/library/v1?include=NONE
```

```matlab
PUT https://aodocs-apis.com/api/library/v1?include=NONE
```

```nginx
PUT https://aodocs-apis.com/api/library/v1?include=NONE
```

```curl
PUT https://aodocs-apis.com/api/library/v1?include=NONE
```

```perl
PUT https://aodocs-apis.com/api/library/v1?include=NONE
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

`Redcarpet.new("Hello World!")`{:.ruby}
`Redcarpet.new("Hello World!")`{.ruby}

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

```javascript
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

```yaml
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

```python
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

```ruby
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

```http
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

```html
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

```go
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

```scala
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

```csharp
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

```markdown
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

```nginx
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

```perl
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

```vim
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

```xml
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

Open the desired target library, and note the library ID in the URL.  It's the long string of numbers and letters after `LibraryId_` (up to and _excluding_ the next slash):

```
<code>/LibraryId_<strong>&lt;libraryId></strong>/</code>
```

### Example

```
<code>/LibraryId_<strong>RnTG8PDu8ZqTuDVHcv</strong>/</code>
```

Learn more about [navigating homepages](https://support.aodocs.com/hc/en-us/articles/208769506-What-is-the-AODocs-homepage-#h_594b6e3a-aebb-4b71-8d8e-a4c8aad7cc51) inside your AODocs and specific libraries.

---