# List documents of a library

> **Note**: This is available only to library administrators.


```diff
+ this text is highlighted in green
- this text is highlighted in red
```

RED APPLE (&#x1F34E;): 🍎
GREEN APPLE (&#x1F34F;): 🍏
BLUE HEART (&#x1F499;): 💙
GREEN HEART (&#x1F49A;): 💚
YELLOW HEART (&#x1F49B;): 💛
PURPLE HEART (&#x1F49C;): 💜
GREEN BOOK (&#x1F4D7;): 📗
BLUE BOOK (&#x1F4D8;): 📘
ORANGE BOOK (&#x1F4D9;): 📙
LARGE RED CIRCLE (&#x1F534;): 🔴
LARGE BLUE CIRCLE (&#x1F535;): 🔵
LARGE ORANGE DIAMOND (&#x1F536;): 🔶
LARGE BLUE DIAMOND (&#x1F537;): 🔷
SMALL ORANGE DIAMOND (&#x1F538;): 🔸
SMALL BLUE DIAMOND (&#x1F539;): 🔹
UP-POINTING RED TRIANGLE (&#x1F53A;): 🔺
DOWN-POINTING RED TRIANGLE (&#x1F53B;): 🔻
UP-POINTING SMALL RED TRIANGLE (&#x1F53C;): 🔼
DOWN-POINTING SMALL RED TRIANGLE (&#x1F53D;): 🔽

You can list documents associated with a particular library as follows.

## Method and API

Play with the API Explorer and note the code examples (such as cURL and Java):

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


Response fields of note:

*   ````richText```` (document's Description field; supports HTML tags like ```<b>Hello</b> world!```; read more about editing this field in [Modifying documents with PATCH](https://docs.google.com/document/d/1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA/edit#heading=h.jqqjrnnjon39)

### Sample response

```
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


