# Performance considerations

## Filtering API results

The `fields` query parameter is identical in design to [Google's design for JSON resource filtering](https://developers.google.com/drive/api/v3/fields-parameter).  You can filter the results by populating the ```fields``` query parameter with just the fields you want to come back in the response resource.

As an arbitrary example,  let's say you were interested in only the following fields:

*   `defaultClass`
*   `fields(id,readOnly)`
*   `id`
*   `kind`
*   `libraryId`
*   `name`
*   `permissions(role,type,value)`
*   `sections(fields/id,id)`
*   `value`

You can tell the server to return your requested resource with just those fields and omit all others.  Populate the ````fields```` query parameter of your request with the preceding list as follows:

```http
defaultClass,fields(id,readOnly),id,kind,libraryId,name,permissions(role,type,value),sections(fields/id,id),value
```

The value should be URL-encoded when passed as the query parameter (comma should be replaced by `%2C`).

### Example request

For example, if you were adding a new class and wanted the response resource to contain the fields above, the request might look like this:

```http
POST https://aodocs.altirnao.com/api/documentType/v1/libraries/Rrisfh406YlzF1PZqg/documentTypes?fields=defaultClass%2Cfields(id%2CreadOnly)%2Cid%2Ckind%2ClibraryId%2Cname%2Cpermissions(role%2Ctype%2Cvalue)%2Csections(fields%2Fid%2Cid)%2Cvalue
```

```json
{
  "displayName": "my-new-class-002",
  "managedPermissionSource": "FOLDER"
}
```

### Example response

Here is what the response to that request looks like, filtered with your list:

```http
200
```


```json
{
  "kind": "aodocs#documentType",
  "id": "RxT56Tp8z7Yvkjj1VU1",
  "libraryId": "Rrisfh4806YlzF1PZqg",
  "fields": [
    {
      "id": "RxT56WG8FCtarmOAAW",
      "readOnly": false
    }
  ],
  "permissions": [
    {
      "type": "ROLE",
      "role": "WRITER",
      "value": "DOCUMENT_CREATOR"
    }
  ],
  "sections": [
    {
      "id": "defaultSectionId",
      "fields": [
      {
        "id": "RxT56WG8FCtarmOAAW"
      }
    ]
    }
  ],
  "defaultClass": false,
  "name": "my-new-class-002",
  "value": "RxT56Tp8z7Yvkjj1VU1"
}
```

## Paginating resource collection responses

For API methods that return a collection of resources, there’s usually the need to be able to paginate the results, as there might be too many of them to fit in a single response. The API methods that support pagination usually have two parameters:

*   A `limit` parameter (also named `pageSize` or `maxResults` in some methods) to indicate the maximum number of results to return in a single page
*   A `pageToken` parameter, used to get subsequent result pages

A successful response on these methods will return a collection of resources, and IF (and only if) there are more results matching the user’s query / criteria, a `nextPageToken` field.

To get the next page of results, you have to take this ```nextPageToken``` from the response and pass it as the ```pageToken``` query parameter in the next request (with the other parameters unchanged) to get to the next page.

> **Note**: For performance reasons, we recommend adjusting the number of requested results to the needs of the user.  The more results are requested, the larger the latency.