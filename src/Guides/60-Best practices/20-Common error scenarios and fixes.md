# Common error scenarios and fixes

AODocs APIs return two kinds of error information:

*   HTTP error codes (with some information in the header)
*   A response-body JSON object with additional details to help you determine how to handle the error (specifically ```reason``` and ```message``` fields)

It is the client app's responsibility to catch and handle all standard errors encountered when using the REST API. The following list guides you toward that end.

_______________________________________


## Resolve a 400 error: Bad Request

This error means the input is incorrect — something in the query is missing or not valid.  Some examples include:

*   Using mutually exclusive parameters at the same time: **"Parameters libraryTemplateId, sourceLibraryId and driveFolderId are mutually exclusive"*
*   Trying to violate the one-attachement restriction of TF/SF libraries: *"In the google libraries the documents should always have exactly one attachment."*
*   Trying to attach a Drive file without specifying its ID: *"The file id is mandatory in attachments"*
*   Using a method on the wrong library type: *"This method cannot be used in a Document Management library"*

> ⭑   Note: This is not a complete list: 400 errors are a broad category encompassing all kinds of incorrect queries.

Here is an example of such an error:

```json
{
    "error": {
        "errors": [
        {
            "domain": "global",
            "reason": "badRequest",
            "message": "Parameters libraryTemplateId, sourceLibraryId and driveFolderId are mutually exclusive"
        }
        ],
        "code": 400,
        "message": "Parameters libraryTemplateId, sourceLibraryId and driveFolderId are mutually exclusive"
    }
}
```

To fix this error, follow the hint provided in the ```message``` field.

---

## Resolve a 403 error: Forbidden

This error can occur for the following reasons:

*   Invalid security code
*   No authorized access to a resource

```json
{
    "error": {
        "errors": [
        {
            "domain": "global",
            "reason": "forbidden",
            "message": "You don't have rights to access the page"
        }
        ],
        "code": 403,
        "message": "You don't have rights to access the page"
    }
}
```

To fix this error, contact your domain administrator.

---

## Resolve a 404 error: Not Found

This error can occur because of any of the following:

*   Missing resource ID: *"Library with id 'null' does not exist"*
*   Incorrect resource ID: *"There is no library with id: 'OtbBk6GAm0ATEy8P8'"*
*   Resource has moved or doesn't exist: *"No entity was found matching the key: !altirnao.com:Document(\"RwMUllPyrBZFx9BWlN\")"*

### Missing mandatory parameter

For example, if the ```libraryId``` parameter is mandatory and you don't provide it, you get the following error:


```json
{
  "error": {
    "errors": [
      {
        "domain": "global",
        "reason": "notFound",
        "message": "Library with id 'null' does not exist"
      }
    ],
    "code": 404,
    "message": "Library with id 'null' does not exist"
  }
}
```

To fix this error, check the ```message``` field for the "missing" object in question (in this case a library), and verify its ID is correct.

### Resource not found

If your mandatory parameter is correct, but the resource has moved or doesn't exist, you might get the following error:

```json
{
    "error": {
     "errors": [
      {
        "domain": "global",
        "reason": "notFound",
        "message": "No entity was found matching the key: !altirnao.com:Document(\"RwMUllPyrBZFx9BWlN\")"
      }
     ],
     "code": 404,
     "message": "No entity was found matching the key: !altirnao.com:Document(\"RwMUllPyrBZFx9BWlN\")"
    }
}
```



---

TBC