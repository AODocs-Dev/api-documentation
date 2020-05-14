# Modify document attachments

Using AODocs APIs, you can modify the document resource using the `PATCH` operation. You can modify attachments as well as [system and custom fields](/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/20-Create,%20modify,%20delete%20documents/20-Modify%20field%20values%20of%20document%20properties). To modify the list of document attachments (i.e. references to Drive files), use `PATCH` to replace/overwrite the `attachments[]` array field of the target resource.

In general, modifying is perfectly benign. However, things carry extra risk with any parts of the resource arranged in arrays. Using the `attachments` array field in DMS documents, is one example; however, the caution extends to any request containing array fields.

There are two cases to consider:

*   array field not included in request: corresponding target array does not get modified on the server
*   array field included in request (including empty!): completely overwrites target array field with whatever is in the square brackets in the order provided:
    *   object specified in array position _n_: object placed in target array at position _n_
    *   object not specified: object is removed from target array

> ⚠ **Warning/Alert**: The list of objects you specify in your array field in the order you specify completely replaces whatever currently exists in the corresponding resource array on the server.
>
> If you include an empty array field in your payload (without specifying any objects), you are saying to the server "I want this complete array field to be(come) empty." For example, if you use the `attachments` array field with DMS documents, the result is a target DMS document with no attachments.
>
> (The one-attachment restriction in TF/SF prevents this possibility; however this still applies for other types of array field.)
>
> Additionally, if you want any of the current objects to remain in the array field (as you alter it), you have to specify them each time inside the array field in your request, including their current position). For example, if you use the `attachments` array field with DMS documents, then you have to deliberately send the complete list of what you want the array to contain from then on, **in the order you want**.
>
> (Missteps such as accidental detaching or re-ordering of attachments are not possible with TF/SF documents because you only ever modify the one attachment.)

## Method and API

Play with the API Explorer:

### [PATCH /document/v1/{documentId}](/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/patch)


## Guidelines


### Prerequisites

Because this is an overwrite operation, you have to know which pieces you want to replace with your new changes, including overwriting with nothing (deleting). And you have to be aware of the power of this operation to make changes that are somewhat complicated to undo.


### Request

Only `documentId` is mandatory (to identify which document's metadata to alter). However, including only the `documentId` parameter is the degenerate case: if that's all you specify, and specify no changes, then the `modificationDate` and `updateAuthor` of the document get reset, but otherwise no changes take place.

For this method to do anything, you must specify the parts you want changed, and you must send them as request-body parameters (not as query parameters).


#### Attachment array fields

Attachments are represented in the `ApiDocument` resource as an array field (see preceding warning under "Modifying array fields"). As with any other field, when the field is sent to the server, its contents will ```PATCH`` (overwrite) the contents of the corresponding field on the target resource residing on the server.

To alter what files are currently attached to your document, use the array field called `attachments` in the body of the request. This array field holds the file ID(s) of Drive files you want to become the current attachments to your document.


##### TF/SF

In the case of TF/SF documents, this is relatively foolproof since you are limited to a single attachment. There is only one action that carries any risk, and that's replacing the attachment with another one by accidentally sending a non-empty attachments array field. See the following "Sample request body (`attachments` non-empty)".


##### DMS

On the other hand, when dealing with DMS-document attachments, you must proceed more cautiously because DMS documents have no attachment restrictions, and you must thus consider multiple potential outcomes depending on how you phrase `attachments`.

If you are using the `attachments` array field in your request and you happen to be dealing with a DMS document, then you must exercise caution: whatever you include in the array (including _nothing_) becomes your new list of attachments, in the order you provide.


##### Sending array field with data vs. empty

This means that if you are actually including the `attachments` array field in your request, then you must explicitly specify what you want to keep each time; and if you send it to the server empty, the server will empty the target document of all its attachments.

For example, if you have an existing DMS document with one attachment, but want to add another attachment to it, you must specify both attachments (the existing _and_ the new), and in the correct order. If you only specify the new attachment, the original attachment will get detached, and your new attachment will get attached in its place, replacing the original. Result: a single attachment (the new one).

Therefore, if you do not need to change anything to do with attachments, do not send the `attachments` array field at all. This ensures that the `attachments` array field in the resource on the server remains unmodified, keeping your attachments as they are.

> 💡 **Tip**: You can avoid some of the pitfalls of array fields by sampling the contents of the array field from the previous `PATCH` operation which returns the `ApiDocument` resource in full (or partial if you used the `fields` field to [filter the response](/docs/aodocs-staging.altirnao.com/1/c/Guides/60-Best%20practices/20-Performance%20considerations). This is the same result as sending a `GET` request to get a document. This way you always have an up-to-date listing of what the target resource looks like on the server. Read the array field(s) you need, and feed the fields into your next request.

> ⭑ **Note**: Notwithstanding attachment-restriction differences between DMS documents and TF/SF ones, the preceding guidelines for using the `attachments` array fields are generalizable to other array fields.


#### Sample request body (`attachments` non-empty)

When you send the `attachments` array field filled out with file ID(s), you are saying to the server that you want these files in this specific order to be the attachments from now on, regardless of what used to be attached up until now.

In the case of TF/SF, you are restricted to exactly one file ID inside the `attachments` array field. In the case of DMS, this restriction does not exist.

To keep any current attachments in your DMS document, you must explicitly state them here. Also, if you want to keep their existing ordering, then you also must specify them in that order.


```yaml
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM
```

```json
{
  "attachments": // ⇐ removes all current links to Drive files and replaces them with whatever is specified in the square brackets that follow
  [
    {
      "fileId": "1s1uFfW8GHPZ0fUpvwdT-oCsrY7G9QndAU"
    },
    {
      "fileId": "1QvvRHb8XmLYlB66ZZf-fzoTVVDYfrNxO0"
    }
  ]
}
```

#### Sample request body (DMS-only, with `attachments` array field empty)

In DMS, this is how you detach ("delete") attachments all at once. The (ex-)attachments are still owned by the storage account. With no parent document, however, no reference to them exists in either AODocs libraries or in Drive (except in logs). To regain access to them you need the intervention of a domain administrator.


```yaml
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM
```

```json
{
  "attachments": []  // ⇐ removes all current links to Drive files and replaces them with whatever is specified in the square brackets (empty square brackets means all attachments get detached!)
}
```

#### Sample request body (with `attachments` array field not included)


```yaml
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM
```

```json
{
}   // not including the attachments array field in the body keeps attachments as they are, unmodified
```

### Response

The response returns an [ApiDocument](/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource, listing the freshly modified document with the overwritten fields and everything else unmodified). If you included the `attachments` array field in your request, the response includes the new content.


### Sample response

```json
{
  "kind": "aodocs#document",
  "libraryName": "my-DMS-lib-001",
  "className": "my-dms-class-002",
  "className_i18n": "my-dms-class-002",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "classId": "RnTf1mx35gaTJLzoFp",
  "id": "RnTzVT2x5Sb48h3vSQ",
  "title": "Hello-world-doc-001", // ⇐ new, overwrote the old
  "richText": "This is my <b>Hello world!</b> document." // ⇐ new, overwrote the old
  ...
}
```

---
