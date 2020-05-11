# Common error scenarios and fixes

AODocs APIs return two kinds of error information:

*   HTTP error codes (with some information in the header)
*   A response-body JSON object with additional details to help you determine how to handle the error (specifically ```reason``` and ```message``` fields)

It is the client app's responsibility to catch and handle all standard errors encountered when using the REST API. The following list guides you toward that end.

---

## Resolve a 204 error: No content

This error means that everything was executed according to plan, but no response could be produced or sent back to confirm the effects of the action.

To make sure the action was performed correctly, send another request testing the effects of the previous request. This usually means issuing a GET request to retrieve the resource from the server for analysis.

> ⭑  **Note**: If the original request was a DELETE, the response is always a 204, effectively stating: "There is no resource the server can send back because it got deleted as requested".

---

## Resolve a 400 error: Bad Request

This error means the input is incorrect — something in the query is missing or not valid. Some examples include:

*   Using mutually exclusive parameters at the same time: *"Parameters libraryTemplateId, sourceLibraryId and driveFolderId are mutually exclusive"*
*   Trying to violate the one-attachement restriction of TF/SF libraries: *"In the google libraries the documents should always have exactly one attachment."*
*   Trying to attach a Drive file without specifying its ID: *"The file id is mandatory in attachments"*
*   Using a method on the wrong library type: *"This method cannot be used in a Document Management library"*

> ⭑   Note: This is not a complete list: errors with a status code of 400 are a broad category encompassing many kinds of incorrect queries.

Here is an example of a 400 error, this one resulting from providing more than one mutually exclusive parameter:

```json
{
    "error": {
        "errors": [
        {
            "domain": "global",
            "reason": "badRequest",
            "message": "Parameters libraryTemplateId, sourceLibraryId and driveFolderId are \
            mutually exclusive"
        }
        ],
        "code": 400,
        "message": "Parameters libraryTemplateId, sourceLibraryId and driveFolderId are \
        mutually exclusive"
    }
}
```

To fix this specific error, provide only one of the indicated mutually exclusive parameters. In general, when encountering a 400 error, follow the hint provided in the ```message``` field.

---

## Resolve a 401 error: Unauthorized

This error means credentials were incorrect or not provided.

```json
{
  "error": {
    "errors": [
    {
        "domain": "global",
        "reason": "required",
        "message": "You must use oauth 2 to authenticate"
    }
    ],
    "code": 401,
    "message": "You must use oauth 2 to authenticate"
  }
}
```


---

## Resolve a 403 error: Forbidden

This error can occur for the following reasons:

*   Invalid security code
*   Unauthorized access to a resource
    *  Incorrect permissions
    *  No AODocs parent

### Invalid security code

```json
{
  "error": {
    "errors": [
    {
      "domain": "global",
      "reason": "forbidden",
      "message": "Invalid security code"
    }
    ],
    "code": 403,
    "message": "Invalid security code"
  }
}
```

To fix this error, make sure your security code is correct.

### Unauthorized access to a resource

#### Incorrect permissions

This means the client app does not have the correct permission levels to access the resource.

Sample response message 1:

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

Sample response message 2:

```json
{
"error": {
  "errors": [
    {
      "domain": "global",
      "reason": "forbidden",
      "message": "Access denied to library with id: 'OtbBk6G8Am0ATUEy8P8' Required permission \
      level: 'CONTRIBUTOR'"
    }
    ],
    "code": 403,
    "message": "Access denied to library with id: 'OtbBk6G8Am0ATUEy8P8' Required permission \
    level: 'CONTRIBUTOR'"
  }
}
```

Sample response message 3:

```json
{
  "error": {
    "errors": [
    {
      "domain": "global",
      "reason": "forbidden",
      "message": "File '1OHbt3F8VOc2Wh68K8iqX2R4RWnP4_N4xkRGFXX3qVMnQ' cannot be attached \
      to the document: not owned by you or the library storage admin"
    }
    ],
    "code": 403,
    "message": "File '1OHbt3F8VOc2Wh68K8iqX2R4RWnP4_N4xkRGFXX3qVMnQ' cannot be attached \
    to the document: not owned by you or the library storage admin"
  }
}
```

To fix this error contact the domain administrator.


#### No AODocs parent

This is not a permission error as such; rather, it is a NO that answers the question "Is this Drive file attached to an AODocs document?" asked using the [POST /document/v1/drive/{driveId}/check](/docs/aodocs-staging.altirnao.com/1/routes/document/v1/drive/%7BdriveId%7D/check/post) method.

If the response is positive, its JSON body contains the ID of the AODocs document.

The negative response comes back with a status code `403` and looks like this:

```json
{
  "error": {
    "errors": [
      {
        "domain": "global",
        "reason": "forbidden",
        "message": "There is no aodocs parent."
      }
    ],
    "code": 403,
    "message": "There is no aodocs parent."
  }
}
```

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

To fix this error, check the ```message``` field for the "missing" object in question (in this case a library), and verify its ID is provided and correct.

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

## Resolve a 409 error: Conflict (retry)

This error can occur because the resource is being accessed by more than one caller at the same time. The best strategy is to retry.

> ⭑  **Note**: Of all 400-series errors, this is the only one that should be retried.

---

## Resolve a 500 error: Internal server error (retry)

This error occurs because of some unforeseen condition on the server. The best strategy is to retry.


---
