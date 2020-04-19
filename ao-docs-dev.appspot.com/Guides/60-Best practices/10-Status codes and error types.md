# __HTTP status codes and error types in AODocs APIs

The HTTP status code that comes back along with the response indicates whether your request **succeeded**, **failed**, or **something else happened**.

Generally the **200-series codes** indicate some degree of **success**., with **200** and **201** being the most desirable, because the server not only **understood** and **accepted** the request, but also was **completely successful in executing the operation**.  The **400-series codes** indicate some degree of **failure** in fulfilling the request, although anything **above 299** means something went wrong.

When a request **succeeds** it normally returns a JSON-formatted **representation of the requested resource**.  When it **fails**, the response is instead a JSON-formatted **error message** for troubleshooting purposes.  The appropriate HTTP status code is always part of the response.

For example, if you try to **identify** yourself to AODocs with **incorrect credentials**, you will receive a reply that the request was disallowed, with a status code of **403: Forbidden**, with an elaboration in the form of a ```message``` field meant only for humans:


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

> ⭑   **Note**: The status code is the only truly reliable, machine-readable indication of what happened to the request.  The ```reason``` and ```message``` fields are human-readable elaborations on the status code provided to troubleshoot what happened.  The ```reason``` field is part of the HTTP status code, but the ```message``` field can change without warning and applications should not depend on its text content.




## HTTP status code number ranges and meanings


<table>
  <tr>
   <td>Range
   </td>
   <td>Meaning
   </td>
  </tr>
  <tr>
   <td>100-199
   </td>
   <td>Request received, continuing process
   </td>
  </tr>
  <tr>
   <td>200-299
   </td>
   <td>Request received, understood, accepted (and, with <strong>200/201</strong>, fully succeeded)
   </td>
  </tr>
  <tr>
   <td>300-399
   </td>
   <td>Further action needs to be taken to complete the request
   </td>
  </tr>
  <tr>
   <td>400-499
   </td>
   <td>Request contains bad syntax or cannot be fulfilled — the fault is most likely not with the server
   </td>
  </tr>
  <tr>
   <td>500-599
   </td>
   <td>Server failed to fulfill an apparently valid request — the fault is most likely with the server
   </td>
  </tr>
</table>



##


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
   <td>Nothing to do.  Life is beautiful.  La pura vida.
   </td>
  </tr>
  <tr>
   <td>204
   </td>
   <td>No content
   </td>
   <td>We did what you asked but there is no response.
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
   <td>Look at the error message to see what's wrong, but it's probably your parameters.
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
<p>
"Invalid security code"
   </td>
   <td>Your credentials are valid and accepted by the server, but the action is still not authorized.
   </td>
   <td>A deeper permissions issue on the server?
   </td>
  </tr>
  <tr>
   <td>404
   </td>
   <td>Not Found
   </td>
   <td>The resource you are looking for does not exist here at this location.
   </td>
   <td>The resource was either moved to a different location or deleted.
   </td>
  </tr>
  <tr>
   <td>409
   </td>
   <td>Conflict
   </td>
   <td>Simultaneous access is not allowed at the moment, resulting in a conflict condition.
   </td>
   <td><strong>This is the only 400-series condition you should ever retry.</strong>
   </td>
  </tr>
  <tr>
   <td>500
   </td>
   <td>Internal Server Error
   </td>
   <td>Something is wrong on our end but we have no explanation.
   </td>
   <td><strong>Retry</strong>.
   </td>
  </tr>
</table>



## ____Additional HTTP status codes

*   List of errors **unique** to API:
    *   Wrong/invalid path/query params, **code: _____**
    *   parse error, **code: 4xx**
    *   "required" error, **code: 4xx (same as parse but diff reason?)**
    *   Parameters are mismatched with data types, **code:**
    *   API throws an exception, **code:**
    *   No data for the resource to return, **code: 204?**
    *   Parameters are outside of acceptable bounds of definition, **code:**
    *   Error during file import, **code:**
    *   Cannot reattach detached file: "not owned by you or lib stor admin", **code:**
    *   "There is no AODocs parent", **code:**
    *


## __Error types

[Google Ads API Beta > Best Practices > Error types](https://developers.google.com/google-ads/api/docs/best-practices/error-types)


*   Authentication (credentials *and* permissions?)
*   Retryable
*   Validation
*   Sync-related

x

## Resolve errors

AODocs APIs return two kinds of error information:

* HTTP error codes and messages in the header.
* A JSON object in the response body with additional details that can help you determine how to handle the error.

Drive apps should catch and handle all errors that might be encountered when using the REST API. This guide provides instructions on how to resolve specific API errors.


## Retry basics

Some error conditions are temporary and the request can be retried a moment or two later.  Depending on the nature of the request and the perceived circumstance of the user, you can let them know something is wrong after any number of retries that makes sense from a UX perspective (including zero, straight away).

For example, if your resource is not currently in a state to allow simultaneous edits from more than one party, then you could employ [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) and retry several times, letting the user know that their request is being worked on, and asking them to hang on.

For example, if your resource is not currently in a state to allow simultaneous edits from more than one party, then you could let the user know that their request is being worked on, and employ [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff) to retry several times (for each _n_th retry waiting 2<sup>n</sup> seconds + a random fraction of a second, such as **1**.123, **2**.234, **4**.345, **8**.456, etc.).


### Status codes to retry

```409: Conflict```

```500: Internal Server Error```


