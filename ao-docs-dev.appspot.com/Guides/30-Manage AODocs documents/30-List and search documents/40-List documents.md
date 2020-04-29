# List documents of a library

> **Note**: This is available only to library administrators.


```diff
+ > **Note**: This is available only to library administrators.
- > **Note**: This is available only to library administrators.
! > **Note**: This is available only to library administrators.
# > **Note**: This is available only to library administrators.
```

```json
> **Note**: This is available only to library administrators.
```

```json
**Note**: This is available only to library administrators.
```

---

```html
> **Note**: This is available only to library administrators.
```

```html
**Note**: This is available only to library administrators.
```

---

```csharp
> **Note**: This is available only to library administrators.
```

```csharp
**Note**: This is available only to library administrators.
```

---

```css
> **Note**: This is available only to library administrators.
```

```css
**Note**: This is available only to library administrators.
```

---

```javascript
> **Note**: This is available only to library administrators.
```

```javascript
**Note**: This is available only to library administrators.
```

---

```java
> **Note**: This is available only to library administrators.
```

```java
**Note**: This is available only to library administrators.
```

---

```go
> **Note**: This is available only to library administrators.
```

```go
**Note**: This is available only to library administrators.
```

---

```scala
> **Note**: This is available only to library administrators.
```

```scala
**Note**: This is available only to library administrators.
```

---

```rust
> **Note**: This is available only to library administrators.
```

```rust
**Note**: This is available only to library administrators.
```

---

```http
> **Note**: This is available only to library administrators.
```

```http
**Note**: This is available only to library administrators.
```

---

```python
> **Note**: This is available only to library administrators.
```

```python
**Note**: This is available only to library administrators.
```

---


[https://lingtalfi.com/services/pngtext?color=cc0000&size=10&text=Hello%20World](https://lingtalfi.com/services/pngtext?color=cc0000&size=10&text=Hello%20World)

![https://lingtalfi.com/services/pngtext?color=cc0000&size=10&text=Hello%20World](https://lingtalfi.com/services/pngtext?color=cc0000&size=10&text=Hello%20World)

`#00ff00`


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


