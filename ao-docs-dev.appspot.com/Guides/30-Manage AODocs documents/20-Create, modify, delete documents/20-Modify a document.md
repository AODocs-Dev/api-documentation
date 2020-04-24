# Modify a document

In AODocs, you can modify resources (such as a document) with the ````PATCH```` operation which **replaces/overwrites** the fields of the target resource.  Specifically, with ````PATCH````, anything you specify in your request resource replaces its corresponding part in the server resource; and what you don't specify remains unmodified.

## Modifying simple fields

One simple example of modifying is changing one of the document's properties, like its title.  Or even replacing all its attachments with new links to new Drive files.

An easy way to try this out is to create a test AODocs document and modify its ```Description``` property (called ````richText```` in the API).  Take any document where this Description field contains nothing important, and replace what's currently there with some new text by using the `PATCH` operation (see [following](#heading=h.8gzunnbam38t)).

To modify a specific document by its ID, you send a request resource to replace corresponding fields in a target resource.  More specifically, you send a (partial) ```ApiDocument``` resource where the specific target resource resides on the server, making sure that:

*   the request **resource** contains _only_ the resource fields you want modified
*   the resource **fields** included in the request are _not empty_ unless you actually want the target resource fields to become empty/deleted

## Modifying array fields

In general, modifying is perfectly benign.  However, things are riskier with any parts of the resource arranged in arrays.  One example is using the ```attachments``` array field in DMS documents.  However, this extends to any request containing array fields.

There are two cases to consider:

*   array field **not included** in request: corresponding target array does not get modified on the server
*   array field **included** in request (**including empty!**): completely **overwrites** target array field with whatever is in the square brackets in the order provided:
    *   object specified in array position X: object placed in target array at position X
    *   object not specified: object is removed from target array


> ⚠  Warning/Alert: The list of objects you specify in your array field in the order you specify completely replaces whatever currently exists in the corresponding resource array on the server.

> If you include an empty array field in your payload (without specifying any objects), you are saying to the server "I want this complete array field to be(come) empty."  For example, if you use the ```attachments``` array field with DMS documents, the result is a target DMS document with no more attachments.

> (The one-attachment restriction in TF/SF prevents this possibility; however it still applies for other types of array field.)

> Additionally, if you want any of the current objects to remain in the array field (as you alter it), you have to specify them each time in the array field in your request, including their current position).  For example, if you use the ```attachments``` array field with DMS documents, then you have to deliberately send the complete list of what you want the array to contain from then on, in the order you want.

> (Missteps such as accidental detaching or re-ordering of attachments are not possible with TF/SF documents because you only ever modify the one attachment.)


## Method and API

---

Play with the API Explorer and note the code examples (such as cURL and Java):

### [PATCH /document/v1/{documentId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/patch)

---

Play with the API Explorer and note the code examples (such as cURL and Java):

#### [PATCH /document/v1/{documentId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/patch)

---

Play with the [API Explorer](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/patch) and note the code examples (such as cURL and Java):


```yaml
PATCH /document/v1/{documentId}
```


---

## Guidelines

### Prerequisites

Because this is an overwrite operation, you have to know which pieces you want to replace with your new changes, including overwriting with nothing (deleting).  And you have to be aware of the power of this operation to make changes that are somewhat complicated to undo.

### Request

Only ````documentId```` is mandatory (to identify which document's metadata to alter).  However,  including only the ```documentId``` parameter is the degenerate case: if that's all you specify, and specify no changes, then the Last Modified date of the document gets reset, but otherwise no changes take place.

For this method to do anything, you must specify the parts you want changed, and you must send them as **request-body parameters** (not as query parameters).

#### Example: Modify document with new/modified metadata

In the request body, you can include some text in the ````richText```` field, which corresponds to your document's ```Description``` property.  If you send the request with this field set to (arbitrarily) ```This is my <b>Hello world!</b> document```, then the server will change the ```richText```  field inside the server resource when you execute the request.  This will appear in the AODocs UI like this:

![ricthtext-patch-ui.png](/img/ricthtext-patch-ui.png)

Similarly, if you send the ```title``` as ```Hello-world-doc-001```, you will change the title of your target document:

![title-patch-in-ui](/img/title-patch-in-ui.png)

#### Sample request body (generic)

```json
{
  "richText": "This is my <b>Hello world!</b> document.",
  "title": "Hello-world-doc-001",
}
```


#### Example: Modify document with attachments

Attachments are represented in the ```ApiDocument``` resource as an array field (see preceding warning under "Modifying array fields").  As with any other field, when the field is sent to the server, its contents will ```PATCH`` (overwrite) the contents of the corresponding field on the target resource residing on the server.

To alter what files are currently attached to your document, use the array field called ````attachments```` in the body of the request.  This array field holds the file ID(s) of Drive files you want to become the current attachments to your document.

In the case of TF/SF documents, this is relatively foolproof since you are limited to a single attachment.  There is only one action that carries any risk, and that's replacing the attachment with another one by accidentally sending a [non-empty ```attachments``` array field](#heading=h.tb6iuzrmzm9x).

However, when dealing with DMS-document attachments, you must proceed more cautiously because DMS documents have no attachment restrictions, and you must thus consider multiple potential outcomes depending on how you phrase ```attachments```.

If you are using the ```attachments``` array field in your request and you happen to be dealing with a DMS document, then you must **exercise caution**: **whatever you include in the array (including _nothing_) becomes your new list of attachments, in the order you provide**.

This means that if you are actually including the ```attachments``` array field in your request, then **you must explicitly specify what you want to keep each time**; and if you send it to the server **empty**, the server will **empty** the target document of all its attachments.

For example, if you have an existing DMS document with one attachment, but want to add another attachment to it, you must specify both attachments (the existing _and_ the new), and in the correct order.  If you only specify the new attachment, the original attachment will get detached, and your new attachment will get attached in its place, replacing the original.  Result: a single attachment (the new one).

Therefore, if you do not need to change anything to do with attachments, do not send the ```attachments``` array field at all.  This ensures that the ```attachments``` array field in the resource on the server remains unmodified, keeping your attachments as they are.

> 💡   Tip: You can avoid some of the pitfalls of array fields by sampling the contents of the array field from the previous `PATCH` operation, which returns the ```ApiDocument``` resource in full (or partial if you used the ```fields``` field to filter the response).  This is the same result as sending a ```GET``` request to get a document.  This way you always have an up-to-date listing of what the target resource looks like on the server.  Read the array field(s) you need, and feed the fields into your next request.


> ⭑   **Note**: Notwithstanding attachment-restriction differences between DMS documents and TF/SF ones, the preceding guidelines for using the ```attachments``` array fields are generalizable to other array fields.

#### Sample request body (```attachments``` non-empty)

When you send the  ```attachments``` array field filled out with file ID(s), you are saying to the server that you want these files in this specific order to be the attachments from now on, regardless of what used to be attached up until now.

 In the case of TF/SF, you are restricted to exactly one file ID inside the ```attachments``` array field.  In the case of DMS, this restriction does not exist.

 To keep any current attachments in your DMS document, you must explicitly state them here.  Also, if you want to keep their existing ordering, then you also must specify them in that order.

```yaml
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM
```

```json
{
  "attachments": // ⇐ removes all current links to Drive files and replaces them with whatever is specified in the square brackets that follow

  [
    {
      "fileId": "1s1uFfWGHPZ0fUpvwdT-oCsrY7G9QndAU"
    },
    {
      "fileId": "1QvvRHbXmLYlB66ZZf-fzoTVVDYfrNxO0"
    }
  ]
}
```

#### Sample request body (DMS-only, with ```attachments``` array field empty)

In DMS, this is how you detach ("delete") attachments all at once.  The (ex-)attachments are still owned by the storage account.  With no parent document, however, no reference to them exists in either AODocs libraries or in Drive (except in logs).  To regain access to them you need the intervention of a domain administrator.

```yaml
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM
```

```json
{
  "attachments": []  // ⇐ removes all current links to Drive files and replaces them with whatever is specified in the square brackets (empty square brackets means all attachments get detached!)
}
```

#### Sample request body (with ```attachments``` array field not included)

```yaml
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM
```

```json
{
}   // not including the attachments array field in the body keeps attachments as they are, unmodified

```

### Response

The response returns an [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource, listing the freshly modified document with the overwritten fields (here just ````title```` and ````richText````, and everything else remains unmodified).  If you altered the ```attachments``` array field, the response includes the new content.

Response fields of note:

*   ````title```` (whatever you set it to)
*   ````richText```` (document's Description field; supports HTML tags like “`<b>Hello</b> world!`”

### Sample response

```json
{
  "kind": "aodocs#document",
  "libraryName": "mfie-stag-DMS-lib-001",
  "className": "mfie-stag-dms-class-002",
  "className_i18n": "mfie-stag-dms-class-002",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "classId": "RnTf1mx35gaTJLzoFp",
  "id": "RnTzVT2x5Sb48h3vSQ",
  "title": "Hello-world-doc-001", // ⇐ new, overwrote the old
  "richText": "This is my <b>Hello world!</b> document." // ⇐ new, overwrote the old
  ...
}
```

---
