# Create new document and attach Drive file

When you create a TF/SF document, you must attach one and only one attachment (using a Drive file's `fileId` ). You create a DMS document the same way, but you can do it with any number of attachments (including zero).

For example, you might have a spreadsheet in Google Drive that you want to manage with AODocs. Wrapping a new AODocs document around your spreadsheet allows you to use all the AODocs document management features and properties like custom properties and workflows.

In DMS, you can also create a new document with no attachments. An example could be an expense-report document that needs to be delivered before the expenses are ready to be attached. You can create the document first, and then attach the receipts whenever appropriate.

To get familiar with document creation, try to [create AODocs documents in the UI](https://support.aodocs.com/hc/en-us/articles/115005892403-Create-AODocs-documents).

To create a new document with AODocs APIs, send a request to the server with an `ApiDocument` resource, listing:

*   mandatory resource fields required by the server (like target library ID)
*   optional but useful fields (like document title, class ID, and folder ID)
*   any Drive IDs of files to attach — zero or more for DMS libraries; and a mandatory single one for TF/SF

## **Method and API**

Play with the API Explorer:

### [PUT /document/v1](/docs/ao-docs-dev.appspot.com/1/routes/document/v1/put)

## Guidelines

### Prerequisites

Before you create a new empty document with one attachment, you must know the `libraryId` of the library you'll be creating the document in. For a single attachment, any library type works: TF, SF, or DMS — but you still have to know the ID of the specific target library.

You also need the `fileId` of any Drive file that you want to attach to your document. Read more about how to [obtain the file ID in the AODocs UI](/docs/ao-docs-dev.appspot.com/1/c/Guides/Manage%20AODocs%20documents/Create,%20modify,%20delete%20documents/Create%20new%20documents%20with%20attachments/Create%20test%20Drive%20files%20and%20folders).

> ⭑   **Note**: In the API Explorer's "Request body" window, `fileId` is part of the `attachments` array field; alternatively, if you need to attach by explicitly making a copy of the original file, it is found under `attachmentsToCopy` .

Optionally, it's good to know your target class (what type of document this will be), but if you don't specify it, the document will automatically become of the same type as your target library's current default class. Lastly, you should give a title to your new document. If you don't, it'll get called "Untitled”, which can get confusing.

You might also want to provide the ID of a specific target AODocs folder for your new document to live in. You can do this by specifying the Drive folder ID (`folders[].fileId` field in the document resource). If you don't know this ID, you can open up your target folder in the UI and retrieve the ID from the URL between the surrounding `%2522` strings:

```yaml
%2522𝗳𝗼𝗹𝗱𝗲𝗿%2522:%2522𝗔𝗷𝗮𝗣𝘃𝟬𝟮𝟴𝗶_𝗺𝗿𝗢𝘆𝗸𝗜𝟲𝟬𝗞𝗮𝘃𝗪𝗶𝗯𝟮𝗟𝗧𝘇𝗦𝘂𝗬𝗪𝗿𝟴%2522
```

The preceding is simply a URL-encoded version of this `folder:folderId` pair:

```json
"folder":"AjaPv028i_mrOykI60KavWib2LTzSuYWr8"
```

> ⭑ **Note**: If you need to attach files from a Google account outside the target domain, the following prerequisites have to be met:
>
> *   You have to have ownership of each such file.
> *   You or your domain has to be whitelisted in the target domain.
> *   You have to have access to the target library.
>
> If the file is not yet owned by an AODocs storage account, you have to call the AODocs API using an OAuth2 access token that grants the `https://www.googleapis.com/auth/drive` scope to the user.
>
> In an out-of-domain case such as this, the file itself gets automatically duplicated and it is this new duplicate that becomes the attachment to your target document, not the original.

### Request

Pass the mandatory parameters of `attachments[].fileId` (for any Drive file to be attached) and `libraryId` in the request body, not in the query string. Same thing for the optional `classId`, `title`, and the `folders[].fileId` (desired target Drive folder ID).

Provide the `fileId` inside one of the two array fields (or both) in the request body:

*   `attachments`
*   `attachmentsToCopy`

If you attach a Drive file using `attachments`, and then edit that attachment's content, the edits happen in the original Drive file because the attachment is a direct link to that file.

> ⭑   **Note**: Once attached to a DMS document, the source Drive file no longer has a visible parent folder in Google Drive. It's still accessible via search and via the "Shared with me" shortcut/folder, but it no longer appears inside its original folder hierarchy (if any).

However, if you attach a Drive file using `attachmentsToCopy`, that attachment is no longer the original file: it is a copy of it created during the attachment process.

All these fields correspond to fields in the [ApiDocument](/docs/ao-docs-dev.appspot.com/1/types/ApiDocument) resource: the fields of the request resource map directly to the fields of the server resource which gets altered by the `PUT` operation before being sent back as a response resource.

### Sample request

```yaml
PUT https://aodocs.altirnao.com/api/document/v1
```

```json
{
  "attachments": [
    {
      "fileId": "1wwO-7T8e_doTw3rK3_wqvyh5zEWL5IKDh"
    }
  ],
  "folders": [
    {
      "fileId": "1BaNSFx8JYE04gHoH_H1sqPzyJVwr1cqma"
      "folderAodocsId": "1BaNSFx8JYE04gHoH_H1sqPzyJVwr1cqma"
    }
  ],
  "libraryId": "RnTG8PD8u8ZqTuDVHcv",
  "classId": "RnTf1mx835gaTJLzoFp",
  "title": "my-dms-doc-002"
}
```

> ⭑   **Note**: In the preceding sample request, note the `attachments` part in bold (or `attachmentsToCopy` if that's what you're using instead). If you're attaching one or more Drive files, include this part, and list your attachments by `fileId`. If you're not attaching anything, remove this part altogether.

### Response

If the request succeeds, the response returns a `200 OK` status code and a JSON-formatted representation of an [ApiDocument](/docs/ao-docs-dev.appspot.com/1/types/ApiDocument) resource. The JSON object includes metadata describing details and attributes of the newly created document inside the specified library. The document's ID is listed as `id`, and its `classId` is what you specified in the request, else of the library's default type.

### Sample response

> ⭑   **Note**: If attaching a Drive file requires making a copy of it instead of directly linking to the original, the file ID in the response ends up being different from the file ID sent in the request. The request identifies the original, the response identifies the copy.

```json
{
  "kind": "aodocs#document",
  "libraryName": "my-dms-by-alt-on-test-001",
  "className": "my-dms-by-alt-on-test-001-class-001",
  "className_i18n": "my-dms-by-alt-on-test-001-class-001",
  "libraryId": "RrVcEFb8wtDeNAnlmNN",
  "classId": "RrVcdN280MKJwPyE7sh",
  "id": "RrVsvlY80jV2N7NcCIy",  // <— documentId
  "title": "my-important-document-with-spreadsheet-attachment",
  "richText": "",
  ...
  "attachments": [
    {
      "fileId": "1wwO-7T8e_doTw3rK3_wqvyh5zEWL5IKDh", // ⇐ same as in the request, unlike with the ```attachmentsToCopy``` parameter
      "name": "my-important-spreadsheet",
      "mimeType": "application/vnd.google-apps.spreadsheet",
      "link": "https://docs.google.com/spreadsheets/d/108JuZK8TqnjYI3YND_GmiIc-tfoZVJ7IJzQrD8lfjNJc/edit?usp=drivesdk",
      ...
    }
  ],
  "folders": [
    {  // library root folder
      "kind": "aodocs#folder",
      "libraryId": "Rs4xtue86axGNklquDP",
      "libraryName": "my-sf-prod-001",
      "folderAodocsId": "0", // ⇐ "0" means root folder
      "fileId": "1Q4_rHI8Xzebc7PEOCH9-IjAAmTYvXXBBu", // ⇐ root folder Drive ID
      "name": "my-sf-prod-001",
      "parentFolderIsRoot": false,
      "folderIsRoot": true,
      ...
   },
    { // actual folder the document is in
      "kind": "aodocs#folder",
      "libraryId": "Rs4xtue86axGNklquDP",
      "libraryName": "my-sf-prod-001",
      ...
      "folderAodocsId": "1BaNSFx8JYE04gHoH_H1sqPzyJVwr1cqma",
      "parentFolderAodocsId": "0", // ⇐ we are one level below root
      "parentFolderDriveId": "1Q4_rHI8Xzebc7PEOCH9-IjAAmTYvXXBBu",
      "fileId": "1BaNSFx8JYE04gHoH_H1sqPzyJVwr1cqma", // ⇐ subfolder Drive ID
      "name": "test-sf-prod-001-subfolder1",
      "parentFolderIsRoot": true, // ⇐ we are one level below root
      "folderIsRoot": false,
      ...
   }
  ],
"numberOfAttachments": 1,
}
```
