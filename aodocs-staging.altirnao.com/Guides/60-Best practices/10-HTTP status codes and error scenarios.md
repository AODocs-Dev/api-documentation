# HTTP status codes and error scenarios

The HTTP status code that comes back along with the response indicates whether your request **succeeded**, **failed**, or **something else happened**.

Generally the **200-series codes** indicate some degree of **success**., with **200** and **201 and 204** being the usual ones, because the server not only **understood** and **accepted** the request, but also was **completely successful in executing the operation**.

The **400-series codes** indicate the server understood your request correctly, but could  fulfil it for some  reason which resulted in a failure. This kind of failure should usually not be retried, except in specific cases (se below).

The **500-series codes** indicate an unexpected failure on the server, that might be temporary or not. This kind of failure should usually be retried.

When a request **succeeds** it normally returns a JSON-formatted **representation of the requested resource**.  When it **fails**, the response is instead a JSON-formatted **error message** for troubleshooting purposes.  The appropriate HTTP status code is always part of the response.

For example, if you try to **identify** yourself to AODocs with **incorrect security code**, you will receive a reply that the request was disallowed, with a status code of **403 Forbidden**, with an elaboration in the form of a ```message``` field meant only for humans:


```json
403
{
 "error": {
  "errors": [
   {
    "domain": "global",
    "reason": "forbidden",
    "message": "Invalid security code."
   }
  ],
  "code": 403,
  "message": "Invalid security code."
 }
}
```



> ⭑   Note: The status code is the only truly reliable, machine-readable indication of what happened to the request.
>
> The ```reason``` and ```message``` fields are provided to help troubleshoot what happened.  They are both human-readable elaborations on the status code.
>
> The ```reason``` field is concise and generally has a default value that maps to its associated status code.  However, it can also be overridden by AODocs APIs to provide a more precise reason than its default, generic phrase.   The ```reason``` field also aims to be stable enough (part of the API "contract") to be machine-readable for error analysis, but might get amended between major AODocs versions (usually to make it more precise).
>
> The ```message``` field is verbose and human-readable but not machine-usable in any stable or meaningful way.  It can change without warning (including without major version release) and applications should not depend on its content.

## Common status codes in the AODocs API

<table>
  <tr>
   <td>Code
   </td>
   <td>Message
   </td>
   <td>Description
   </td>
   <td>Recommended action
   </td>
  </tr>
  <tr>
   <td>200
   </td>
   <td>OK
   </td>
   <td>Everything worked out great.
   </td>
   <td>Nothing to do.
   </td>
  </tr>
  <tr>
   <td>204
   </td>
   <td>No content
   </td>
   <td>We did what you asked but there is no response. Usually used for resource deletion.
   </td>
   <td>Double-check the effects of your action.
   </td>
  </tr>
  <tr>
   <td>400
   </td>
   <td>Bad Request
   </td>
   <td>You provided something wrong in the input — something in the query is missing or not valid.
   </td>
   <td>Look at the error message to see what's wrong, but it's usually your parameters.
   </td>
  </tr>
  <tr>
   <td>401
   </td>
   <td>Unauthorized
   </td>
   <td>Authentication has failed or has not been provided.
   </td>
   <td>Check if you included your credentials, and if they are correct.
   </td>
  </tr>
  <tr>
   <td>403
   </td>
   <td>Forbidden
   </td>
   <td>Your credentials are valid and accepted by the server, but the action is still not authorized.
   </td>
   <td>Check if you have access to the resource / action you’re trying to access / perform
   </td>
  </tr>
  <tr>
   <td>404
   </td>
   <td>Not Found
   </td>
   <td>The resource you are looking for does not exist here at this location.
   </td>
   <td>The resource was either moved to a different location or deleted. You might also have an invalid request URL.
   </td>
  </tr>
  <tr>
   <td>409
   </td>
   <td>Conflict
   </td>
   <td>Concurrent modification is not allowed at the moment, resulting in a conflict condition.
   </td>
   <td><strong>This is the only 400-series condition you should ever retry.</strong>
   </td>
  </tr>
  <tr>
   <td>412
   </td>
   <td>Precondition failed
   </td>
   <td>The current status of the resource does not allow the requested operation
   </td>
   <td>Check error message for information on the invalid status
   </td>
  </tr>
  <tr>
   <td>500
   </td>
   <td>Internal Server Error
   </td>
   <td>Something is wrong on our end but we have no explanation.
   </td>
   <td><strong>Retry</strong> with exponential backoff
   </td>
  </tr>
</table>

## Error response format

AODocs APIs return two kinds of error information:

*   HTTP error codes (with some information in the header)
*   A response-body JSON object with additional details to help you determine how to handle the error (specifically ```reason``` and ```message``` fields)

AODocs APIs report errors in the standard HTTP way with JSON-formatted response bodies that look like the following (not including the header information):

```http
[HTTP STATUS CODE (400-599)] [DEFAULT HTTP STATUS MESSAGE]
```

```json
{
  "error": {
    "errors": [
      {
        "domain": "[domain]",
        "reason": "[CONCISE DEFAULT OR CUSTOMIZED HTTP STATUS REASON]",
        "message": "[VERBOSE CUSTOM MESSAGE]"
      }
    ],
    "code": [HTTPS STATUS CODE (same as above)],
    "message": "[VERBOSE CUSTOM MESSAGE (same as above)]"
 }
}
```



```json
[HTTP STATUS CODE (400-599)] [DEFAULT HTTP STATUS MESSAGE]

{
  "error": {
    "errors": [
      {
        "domain": "[domain]",
        "reason": "[CONCISE DEFAULT OR CUSTOMIZED HTTP STATUS REASON]",
        "message": "[VERBOSE CUSTOM MESSAGE]"
      }
    ],
    "code": [HTTPS STATUS CODE (same as above)],
    "message": "[VERBOSE CUSTOM MESSAGE (same as above)]"
 }
}
```


It is the client app's responsibility to catch and handle all standard errors encountered when using the REST API. The following list guides you toward that end.


## Retry basics

Some error conditions are temporary and the request can be retried later.  Depending on the nature of the request and the perceived circumstance of the user, you can let them know something is wrong after any number of retries that makes sense from a UX perspective (including zero, straight away).

Usually, 4xx errors should not be retried, while 5xx should.  The only exception in the 4xx range is the 409 error, that indicates that a resource is being worked on by another user while trying to edit it.  It should sometimes be retried.  To confirm that this is the case, AODocs provides an additional hint, through a response header called “X-aodocs-retryable”: if the value of this error is “true”, then the error is expected to be transient, and the request should be retried until it succeeds.

For example, if your resource is not currently in a state to allow concurrent edits from more than one party, then you could employ [exponential backoff](https://developers.google.com/drive/api/v3/handle-errors#exponential-backoff) and retry several times, letting the user know that their request is being worked on, and asking them to hang on.



---



## Resolve a 400 error: Bad Request

This error means the input is incorrect — something in the query is missing or not valid.

Some examples of 400 errors include:



*   Using mutually exclusive parameters at the same time:
    *   ""Parameters libraryTemplateId, sourceLibraryId and driveFolderId are mutually exclusive"
*   Trying to violate the one-attachement restriction of TF/SF libraries:
    *   "In the google libraries the documents should always have exactly one attachment."
*   Trying to attach a Drive file without specifying its ID:
    *   "The file id is mandatory in attachments"
*   Using a method on a library type that does not permit the method:
    *   "This method cannot be used in a Document Management library"
*   Invalid or missing or conflicting parameter or resource field values or formats:
    *   "The libraryId can't be null or empty"
    *   "Display name can't be null"
    *   "The managed permission source can't be null"
    *   "The classes with Folder acl source must contain a security category."
    *   "The name of the class must be unique in the library"

        ```
> ⭑   Note: This is not a complete list: 400 errors are a broad category encompassing all kinds of incorrect requests.
```



Here is an example of a 400 error, this one resulting from providing more than one mutually exclusive parameter:


```
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


To fix this specific error, provide only one of the indicated mutually exclusive parameters. When encountering a 400 error in general, follow the hint provided in the `message` field.



---



## Resolve a 401 error: Unauthorized

This error means credentials were missing or invalid (expired or unauthorized access token).


```
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


To fix this error, check whether you've provided credentials, and if you have, whether they're correct.  Furthermore, check the expiry date of your token and authorization levels of your credentials.` `

---




---



## Resolve a 403 error: Forbidden

This error can occur for the following reasons:



*   Invalid security code
*   Insufficient access to a resource
    *   No read access to the resource
    *   Insufficient permission to perform a specification modification on the resource


### Invalid security code


```
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


To fix this error, make sure your security code is correct.  The request should not be repeated with the same credentials, but may resend with a new or different security code.


### Unauthorized access to a resource


#### Incorrect permissions

This means the client app does not have the correct permission levels to access the resource.


##### Sample response message 1:


```
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



##### Sample response message 2:


```
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


To fix this error check your permission levels or whether you own the target resource.



---



## Resolve a 404 error: Not Found

This error can occur because of any of the following:



*   Missing or incorrect resource-ID ("There is no library with id: 'OtbBk6G8Am0ATEy8P8'")
*   Resource doesn't exist: _"No entity was found matching the key: !altirnao.com:Document(\"RwMUllP8yrBZFx9BWlN\")"_


### Incorrect resource ID parameter

For example, if the ```libraryId``` parameter is incorrect (not existing or misspelled), you get the following error:


```
{
  "error": {
    "errors": [
      {
        "domain": "global",
        "reason": "notFound",
        "message": "Library with id 'OtbBk68GAm0ATEy8P8' does not exist"
      }
    ],
    "code": 404,
    "message": "Library with id 'OtbBk68G8Am0ATEy8P8' does not exist"
  }
}
```


To fix this error, check the ```message``` field for the "incorrect" parameter in question (in this case "`Library with id `'OtbBk68GAm0ATEy8P8'"), and verify its ID is correct.


### Resource not found

If your mandatory parameter is correct, but the resource has moved or doesn't exist, you might get the following error:


```
{
    "error": {
     "errors": [
      {
        "domain": "global",
        "reason": "notFound",
        "message": "No entity was found matching the key: !altirnao.com:Document(\"RwMUllP8yrBZFx9BWlN\")"
      }
     ],
     "code": 404,
     "message": "No entity was found matching the key: !altirnao.com:Document(\"RwMUllP8yrBZFx9BWlN\")"
    }
}
```




---



### **Resolve a 409 error: Conflict (retry)**

This error can occur because the resource is being accessed by more than one caller at the same time. The best strategy is to retry.

> **Note**: Of all 400-series errors, this is the only one that should be retried.

> **Note**: Of all 400-series errors, this is the only one that should be retried.



---



### **Resolve a 500 error: Internal server error (retry)**

This error occurs because of some unforeseen condition on the server. The best strategy is to retry.
