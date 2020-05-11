# Count documents of a library

> **Note**: This is available only to library administrators.

You can count the number of documents associated with a particular library (and optionally class) as follows.

## **Method and API**

Play with the API Explorer:

### **[POST /search/v1/libraries/{libraryId}/count](/docs/aodocs-staging.altirnao.com/1/routes/search/v1/libraries/%7BlibraryId%7D/count/post)**

## **Usage/notes/guidelines**

### **Request**

`libraryId` is a path parameter. It is the only mandatory parameter. However, using the ```classId``` helps narrow the response to documents of a specific class you want.

### **Sample request**

```yaml
POST https://aodocs.altirnao.com/api/search/v1/libraries/RrVcEFb8wtDeNAnlmNN/count?classId=RrVcdN280MKJwPyE7sh
```


### **Response**

The response returns an [ApiDocumentCount](/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentCount) resource, giving a count of all documents associated with the specified library (and class if you specified the ```classId```).

### Sample response


```json
{
  "kind": "aodocs#documentCount",
  "count": 12
}
