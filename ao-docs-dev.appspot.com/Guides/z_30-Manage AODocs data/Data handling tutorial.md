# Data handling tutorial

We put the most useful API methods together into a sequence you can follow in the [API portal](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/library/v1/put) to acquire the know-how needed to accomplish the most common data-handling goals, as well as to gain the confidence to tackle more advanced API tasks, including configuration and administration.

> ⭑   **Note**: You can perform most of the tasks in this tutorial either using the API or on your homepage in the UI. Use the one that suits your needs, or you can do them both to understand how they map to each other.

## Before you begin

If you haven't yet, make sure you familiarize yourself with the [basic terminology of the AODocs universe](https://support.aodocs.com/hc/en-us/articles/115005405943-AODocs-basic-terms). Also, [create some test files and folders](#heading=h.x1k4y4foz0cu) to work with in your Google Drive: the files are going to become attachments to the AODocs documents you're about to create.

## What you'll do

In this tutorial you'll port some Drive files to become attached to AODocs **documents** inside some AODocs **libraries**. Once attached, you'll create/add/patch/update/delete **documents**, **attachments**, **properties**, and **metadata**. Whenever appropriate, for each task, you'll get a link to the specific part of the API portal needed to accomplish the task.

> ⭑   **Note**: We recommend following all the steps in sequence, as they mostly depend on the previous steps.

The list of steps is as follows:

*   Getting the required IDs (Get AODocs library info / list all available libraries)
    *   Libraries
        * [List all available AODocs libraries (full)](#heading=h.vxpu1a1fihqk)
        * [List all available AODocs libraries (plain)](#heading=h.l3tpn8bxn8c)
        * [Get a specific library by ID](#heading=h.sgixsybfrj2a)
    *   Classes
        * [List all available classes in a specific library](#heading=h.z5cmdwh1c18a)
        * [Get a specific class by ID](#heading=h.sdm6hvqbjhiq)
*   Creating, patching, and deleting documents
    *   Creating new documents with attachments
        * [Create test Drive folder and some files to work with as attachments](#heading=h.x1k4y4foz0cu)
        * [Create a new document and attach a Drive file](#heading=h.vllmj75wrdzj)
        * [Get a document by ID (like the one you've just created)](#heading=h.who3eqr2ftgr)
    * [Patching document's metadata and attachments](#heading=h.rplwmpu4br0n)
    *   [Delete document](#heading=h.rplwmpu4br0n)
*   Further:
    *   categories
    *   versions
    *   relations (should be for a more advanced tutorial)
    * [attachmentsToCopy](#heading=h.eqmetzsyjltr)

Let's [get started](#heading=h.vxpu1a1fihqk)!

## Get AODocs library info (list all available libraries)

AODocs content is contained in libraries. Your libraries should already exist; if they don't, a library administrator needs to [create them first](https://support.aodocs.com/hc/en-us/articles/115002366923-Create-a-library-from-scratch).

Once your libraries exist, you can list them to get an idea of where to place your content.

The most useful methods to list and get libraries are the following:

* [List all available AODocs libraries (full)](#heading=h.knrq1657a8lv)
* [List all available AODocs libraries (plain)](#heading=h.l3tpn8bxn8c)
* [Get a specific library](#heading=h.sgixsybfrj2a)

### List libraries and find target library ID for your documents

List target libraries on your domain, select a target library for your AODocs documents to live in, and note the target library's unique identifier ````libraryId````

#### Method and API

Play with the API Explorer:

#### [PUT /library/v1](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/library/v1/put)

#### Usage/notes/guidelines

##### Request


> ⚠  Warning/Alert: This method requests all metadata for all libraries on the domain. Not recommended without filtering!

This method has no mandatory parameters, but without setting any filtering it tries to return all metadata for all libraries, which is often overwhelming to the server and might not produce any response. We strongly recommend you set the ````include```` query parameter to ````NONE````. Alternatively use the **[List plain libraries](#heading=h.l3tpn8bxn8c)** method to get just the key-value pairs.

##### Response

The response returns an [ApiLibraryList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiLibraryList) resource, listing all libraries accessible to you on the domain. With the recommended parameter ````include=NONE```` the response is smaller and far more manageable.

Take note of the ````libraryId```` of your target library. The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional fields to note:

*   ````name```` (of the library)
*   ````defaultDocumentType```` (the library's default class ID)
*   ````rootFolderId```` (the ID of the topmost level of the library's hierarchy)
*   ````favorited```` (whether or not the library is starred as a favorite)
*   any other fields of interest

##### Sample Response

```json
  {
  "kind": "aodocs#libraryList",
  "libraries": [
    {
      "kind": "aodocs#library",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "name": "my-DMS-lib-001",
      "defaultDocumentType": "RnTbOft44KfZYkfBpV",
      "rootFolderId": "1S7ayhti78VtuNl-SebgGTu_wliznnR47",
      "favorited": false,
	 ...
    },
    {
      "kind": "aodocs#library",
      "libraryId": "Rngc1ug8K6WmL3IjZ8",
      "name": "my-sf-lib-005",
      "defaultDocumentType": "Rngc4rL9JCj5xwTtrF",
      "rootFolderId": "1yAMvoTBFEvI_8GXghiyTEJqevJeW7q9C",
      "favorited": true
    }
  ]
}
```

#### List libraries and find ```libraryId``` in UI

You can also locate the ````libraryId```` of your target library inside the AODocs UI. Go to your homepage > My libraries by clicking on the "My libraries" link in the upper left corner of most pages:

Open the desired target library, and note the library ID in the URL. It's the long string of numbers and letters after `LibraryId_` (up to and _excluding_ the next slash):

```<code>/LibraryId_<strong><libraryId></strong>/</code>```

##### Example

```<code>/LibraryId_<strong>RnTG8PDu8ZqTuDVHcv</strong>/</code>```

Learn more about [navigating homepages](https://support.aodocs.com/hc/en-us/articles/208769506-What-is-the-AODocs-homepage-#h_594b6e3a-aebb-4b71-8d8e-a4c8aad7cc51) inside your AODocs and specific libraries.

---

### List libraries plain (alternative to List libraries)

If you want just the library name and ID in your response, use the plain list as an alternative to the full library listing.

#### Method and API

Play with the API Explorer:

##### [PUT /library/v1/plain](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/library/v1/plain/put)

#### Usage/notes/guidelines

##### Request

There are no mandatory or recommended parameters to send.

##### Response

The response returns an [ApiPlainLibraryList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiPlainLibraryList) resource, listing all libraries accessible to you on the domain, but only listing the following for each:

*   library name
*   library ID
*   modification dates

Take note of the ````libraryId```` of your target library. The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional response fields to note:

*   `name` (of the library)

#####

##### Sample Response

```json
  {
      "kind": "aodocs#plainLibrary",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "name": "my-DMS-lib-001",
      "lastModified": "1579005945318",
      "lastConfigModified": "1579005945318"
    },
    {
      "kind": "aodocs#plainLibrary",
      "libraryId": "Rngc1ug8K6WmL3IjZ8",
      "name": "my-sf-lib-005",
      "lastModified": "1579619340936",
      "lastConfigModified": "1579619340936"
    }
    ...
```

###

### Get a specific library by ID

You can retrieve (the configuration of) a specific library to confirm it exists or to parse something from its metadata if you have its ````libraryId````

#### Method and API

Play with the API Explorer:

##### [GET /library/{libId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/library/v1/%7BlibId%7D/get)

#### Usage/notes/guidelines

##### Request

To get your desired library back in the response you have to provide the library ID. This is the only mandatory field. If you want the response to come back with only a core set of metadata for your library, set the `include` parameterto `NONE`.

##### Response

The response returns an [ApiLibrary](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiLibrary) resource, listing the library associated with the provided library ID.

Response fields of note:

*   ````libraryId````
*   `name` / homeUrl
*   `rootFolderId` (the ID of the topmost level of the library's hierarchy)
*   `defaultDocumentType` (the library's default class ID)
*   `favorited` (whether or not the library is starred as a favorite)
*   any other fields of interest

##### Sample response (include=NONE)

```
{
  "kind": "aodocs#library",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "name": "my-DMS-lib-001",
  "name_i18n": "my-DMS-lib-001",
  "domainName": "test.aodocs.com",
  "lastModified": "1579005945318",
  "lastConfigModified": "1579005945318",
  "createdAt": "1578929230251",
  "homeUrl": "my-dms-lib-001",
  "daysBeforeDelete": 30,
  "welcomeText": "<p>Welcome to your new Document Management library: my-DMS-lib-001</p><br><p>To get started...</p>",
  "storageAdmin": "storage.account@test.aodocs.com",
  "pushToMyDrive": false,
  "notifyUsersAboutPushToMyDrive": true,
  "onlyAdminsCanManageFolders": false,
  "onlyAdminsCanEditRootFolder": false,
  "defaultDocumentType": "RnTbOft44KfZYkfBpV",
  "rootFolderId": "1S7ayhti78VtuNl-SebgGTu_wliznnR47",
  "lastAccessed": "1579179234197",
  "defaultView": "RnTbOoSwQ32JuKPEi1",
  "favorited": true
  ...
}
```

---

## Get class info

Libraries contain documents of various **types**. These document types, defined ahead of time, are called **[classes](https://support.aodocs.com/hc/en-us/articles/205655634)**. When a library is first created, it automatically gets outfitted with a default document type, or class. Other classes in your target library might already have been created for you.

These methods are useful when working with classes:

* [List all available AODocs classes in a specific library](#heading=h.z5cmdwh1c18a)
* [Get a specific class](#heading=h.z5cmdwh1c18a)

---

### List classes (to find target classes for your documents)

You can list available target classes for your documents as follows:

#### Method and API

Play with the API Explorer:

##### [PUT /documentType/v1/libraries/{libraryId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibraryId%7D/get)

#### Guidelines

##### Request

Only ````libraryId```` is mandatory.

To return just the bare minimum of class ID and displayName in the response, you can filter the results by populating the ````fields```` query parameter with ````items(displayName,id,kind),kind```` as follows:

```
fields=items(displayName%2Cid%2Ckind)%2Ckind
```

##### Response

The response returns an [ApiDocumentTypeList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentTypeList) resource, listing all document classes available as part of the specified library.

Response fields of note:

*   ````id```` (of the class)
*   ```displayName```(of the class)
*   ```libraryId``` (of the library we searched)
*   ```defaultClass``` (whether or not this is the library's default class)
*   any other fields of interest

##### Sample full (abridged) response

```
{
  "kind": "aodocs#classList",
  "items": [
    {
      "kind": "aodocs#classId",
      "id": "RnTbOft44KfZYkfBpV",
      "displayName": "my-dms-class-001-default",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "defaultClass": true,
    },
    {
      "kind": "aodocs#classId",
      "id": "RnTf1mx35gaTJLzoFp",
      "displayName": "my-dms-class-002-not-default",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "defaultClass": false,
    }
  ]
}
```

#####

##### Sample filtered response (complete)

```
{
"kind": "aodocs#classList",
"items": [
 {
  "kind": "aodocs#classId",
  "id": "Rmk8LOJ1y0Jlwq8cxz",
  "displayName": "testClassInsideDMS"
 },
 {
  "kind": "aodocs#classId",
  "id": "Rmn9gYNz9JwCVfQaIK",
  "displayName": "testClass2insideDMS"
 }
]
}
```

### List classes in the UI

You can also list your library classes in the UI, on the Library Administration page.

Go to Administration > Library administration. In the left-hand pane, go to Library configuration > Document classes. This is where your classes are listed. Note the singular green checkmark signifying the library's default class.

_____________________________

### Get a specific class by ID

You can retrieve (the configuration of) a specific class/documentType to confirm it exists or to parse something from its metadata if you have its `classId`/`documentTypeId`.

#### Method and API

Play with the API Explorer:

##### [GET /documentType/v1/libraries/{libId}/documentTypes/{documentTypeId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/documentType/v1/libraries/%7BlibId%7D/documentTypes/%7BdocumentTypeId%7D/get)

#### Guidelines

##### Request

Pass the mandatory ````classId````/````documentId````, as well as the ````libId```` of the library the class resides in as **_path_ parameters** (not in the query string).

##### Response

The response returns an [ApiDocumentType](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentType) resource, listing the specified class.

Response fields of note:

*   ```id``` (of the class)
*   ```displayName``` (of the class)
*   ```libraryId``` (of the library you searched)
*   ```defaultClass``` (whether or not this is the library's default class)

##### Sample Response

```json
{
  "kind": "aodocs#documentType",
  "id": "RnTbOft44KfZYkfBpV",
  "displayName": "my-dms-class-001-not-default",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  },
  "defaultClass": true,
}
```
---

## Create new documents with attachments

In AODocs, you can create new documents with either just a single attachment (TF/SF/DMS), or any number of attachments including zero (DMS-only).

To create AODocs documents with and without attachments, follow these steps:

* [Get a few Drive test files and folders ready (to become AODocs document attachments)](#heading=h.x1k4y4foz0cu)
* [Create a new document and attach a Drive file](#heading=h.vllmj75wrdzj)
* [Get the specific document you've created](https://docs.google.com/document/d/1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA/edit#heading=h.g9k67owiq7yi)

You can also [Create AODocs documents in the UI](https://support.aodocs.com/hc/en-us/articles/115005892403-Create-AODocs-documents).

---

### Before creating AODocs documents: create test Drive folder and files

In order to have some test files and folders to work with, open up your [Google Drive](https://drive.google.com/) and create a Drive folder. Upload or create some files beside it as well as inside it.

Here's an example of what that might look like:

![image placeholder](/img/api.png)

#### Folder ID

In Drive, files and folders are identified by their individual IDs. When the URL says something like ```<code>/drive/folders/<strong>1HczxnMexotWE3H9z8aebZepvkla60UEzz</strong></code>```, the long string of numbers and letters refers to the current Drive <strong>folder</strong> ID:

Make note of the **Drive folder ID** in the URL for later.

####

#### File ID

To get the URL to display the **file** ID of the **file** that's currently open, click on the More options" menu (**⁝**), then on "Open in new window":

Now the URL lists the Drive **file** ID (as opposed to **folder** ID):

> ⭑   **Note**: Certain Drive files such as Google Forms require an additional step of clicking on ```Edit``` (pencil icon usually in the bottom right of the page) and open the file in yet another view. Only then does the URL display the proper file ID.

Make note of the **Drive file ID** for [later](#heading=h.vllmj75wrdzj). It and the **AODocs document ID** are the two most critical and commonly used pieces of identifying information in the **AODocs API**.

> ⭑   **Note**: If you're familiar with the Drive API, the file ID is the ID of the [File](https://developers.google.com/drive/api/v3/reference/files/get) resource.

#### Next steps

Use a Drive file to [create a new AODocs document with an attachment](#heading=h.vllmj75wrdzj).

---

### Create new document and attach Drive file

When you create a TF/SF document, you must attach one and only one attachment (using a Drive file's ````fileId```` ). You create a DMS document the same way, but you can do it with any number of attachments (including zero).

For example, you might have a spreadsheet in Google Drive that you want to manage with AODocs. Wrapping a new AODocs document around your spreadsheet allows you to use all the AODocs document management features and properties like custom properties and workflows.

In DMS, you can also create a new document with no attachments. An example could be an expense-report document that needs to be delivered before the expenses are ready to be attached. You can create the document first, and then attach the receipts whenever appropriate.

To create a new document, you send a request to the server with an ```ApiDocument``` resource, listing:

*   mandatory resource fields required by the server (like target library ID)
*   optional but useful fields (like document title, class ID, and folder ID)
*   any Drive IDs of files to attach — zero or more for DMS libraries; and a mandatory single one for TF/SF

#### Method and API

Play with the API Explorer:

##### [PUT /document/v1](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/put)

#### Guidelines

##### Prerequisites

Before you create a new empty document with one attachment, you **must know** the ````libraryId```` of the library you'll be creating the document in. For a single attachment, any library type works: TF, SF, or DMS — but you still have to know the ID of the specific target library.

You also need the ````fileId```` of any Drive file that you want to attach to your document. Read more about how to [obtain the file ID in the AODocs UI](#heading=h.hhg7itlz0n58).

> ⭑   **Note**: In the API Explorer's "Request body" window, ```fileId``` is part of the ```attachments``` array field; alternatively, if you need to attach by explicitly making a copy of the original file, it is found under ```attachmentsToCopy``` .

Optionally, it's **good to know** your target class (what type of document this will be), but if you don't specify it, the document will automatically become of the same type as your target library's current default class. Lastly, you should give a title to your new document. If you don't, it'll get called "Untitled, which can get confusing.

You might also want to provide the ID of a specific target AODocs folder for your new document to live in. You can do this by specifying the AODocs folder ID (```folderAodocsId```). If you don't know this ID, you can open up your target folder in the UI and retrieve the ID from the URL between the surrounding ```%2522``` strings:

```
<code>%2522<strong>folder</strong>%2522:%2522<strong>1jaPv028i_mrOykI60KavWib2LTzSuYWr8</strong>%2522</code>
```

The preceding is just a URL-encoded version of this ```folder:folderId``` pair:

```
"<strong>folder</strong>":"<strong>1jaPv028i_mrOykI60KavWib2LTzSuYWr8</strong>"
```

> ⭑   **Note**: If you need to attach files from a Google account outside the target domain, the following prerequisites have to be met:
You have to have ownership of each such file.
You or your domain has to be whitelisted in the target domain.
You have to have access to the target library.
If the file is not yet owned by an AODocs storage account, you have to use the ```googleapis.com/auth/drive scope``` during the procedure.

In an out-of-domain case such as this, the file itself gets automatically duplicated and it is this new duplicate that becomes the attachment to your target document, not the original.


##### Request

Pass the **mandatory** parameters of ```fileId``` (for any Drive file to be attached) and ````libraryId```` **in the request body**, not in the query string. Same thing for the **optional** ````classId````, ````title````, and either ```folders[fileId]``` (desired target Drive folder ID) or ```folders[folderAodocsId]``` (target AODocs folder ID).

    Provide the ```fileId`` inside one of the two array fields in the request body:

*   ```attachments```
*   ```attachmentsToCopy```

If you attach a Drive file using ```attachments```, and then edit that attachment's content, the edits happen in the original Drive file because the attachment is a direct link to that file.

> ⭑   **Note**: Once attached to a DMS document, the source Drive file no longer has a visible parent folder in Google Drive. It's still accessible via search and via the "Shared with me" shortcut/folder, but it no longer appears inside its original folder hierarchy (if any).

However, if you attach a Drive file using ```attachmentsToCopy```, that attachment is no longer the original file: it is a copy of it created during the attachment process.

All these fields correspond to fields in the [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource: the fields of the **request resource** map directly to the fields of the **server resource** which gets altered by the ````PUT```` **operation** before being sent back as a **response resource**.

##### Sample Request

```yaml
PUT https://aodocs.altirnao.com/api/document/v1

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

> ⭑   **Note**: In the preceding sample request, note the ```attachments``` part in bold (or ```attachmentsToCopy``` if that's what you're using instead). If you're attaching one or more Drive files, include this part, and list your attachments by ```fileId```. If you're not attaching anything, remove this part altogether.

##### Response

If the request succeeds, the response returns a ```200 OK``` status code and a JSON-formatted representation of an [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource. The JSON object includes metadata describing details and attributes of the newly created document inside the specified library. The document's ID is listed as ````id````, and its ````classId```` is what you specified in the request, else of the library's default type.

````ApiDocument```` response fields of note:

*   ````richText```` (document's Description field; supports HTML tags like ```<b>Hello</b> world!```; read more about changing this field in [Modifying documents with PATCH](https://docs.google.com/document/d/1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA/edit#heading=h.jqqjrnnjon39)

##### Sample response

> ⭑   **Note**: If attaching a Drive file requires making a copy of it instead of directly linking to the original, the file ID in the response ends up being different from the file ID sent in the request. The request identifies the original, the response identifies the copy.

```
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
  "folderAodocsId": "0", ⇐ "0" means root folder
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

You can also [create AODocs documents in the UI](https://support.aodocs.com/hc/en-us/articles/115005892403-Create-AODocs-documents).

---

### Using ```attachmentsToCopy``` instead of ```attachments```

Sometimes it makes more sense to **create an attachment using a copy of a Drive file** instead of the source file itself. This is done using the ````attachmentsToCopy```` alternative to ````attachments````.

This is a rather generic case: you would do this any time you specifically want to start with a duplicate of the original instead of the original itself. For example, certain files and their versions get frozen by a new policy, but their content is still useful as a template for future work.

When you put together your request to create an AODocs document with an attachment, you can tell AODocs to make a physical copy of the original Drive file (with the same name but with AODocs as owner). To do this, specify the ````fileId```` of a specific Drive file as attachment source inside the ````attachmentsToCopy```` array field in the request body **instead of** the usual ````attachments```` array field.

#### Sample Request

```yaml
PUT https://aodocs.altirnao.com/api/document/v1 \

{
  "attachmentsToCopy": [
    {
      "fileId": "1wwO-7T8e_doTw3rK3_wqvyh5zEWL5IKDh"
    }
  ],
  "libraryId": "RnTG8PD8u8ZqTuDVHcv"
}
```

#### Sample Response

```json
{
  "kind": "aodocs#document",
  "libraryName": "my-dms-by-alt-on-test-001",
  "className": "my-dms-by-alt-on-test-001-class-001",
  "libraryId": "RrVcEFbwtDeNAnlmNN",
  "classId": "RrVcdN20MKJwPyE7sh",
  "id": "RrVsvlY0jV2N7NcCIy",  // <— documentId
  "title": "my-important-document-with-spreadsheet-attachment",
  "richText": "",
  ...
  "systemFields": [ ... ],
  "attachments": [
    {
      "fileId": "108JuZK8TqnjYI3YND_GmiIc-tfoZVJ7IJzQrD8lfjNJc", // <— Note: different from original file ID sent in the request, because a copy of the file was created
      "name": "my-important-spreadsheet",
      "mimeType": "application/vnd.google-apps.spreadsheet",
      "link": "https://docs.google.com/spreadsheets/d/108JuZK8TqnjYI3YND_GmiIc-tfoZVJ7IJzQrD8lfjNJc/edit?usp=drivesdk",
      ...
    }
  ],
  "numberOfAttachments": 1,
}
```

Play around with these two approaches using the AODocs [API Explorer](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/put).

---

### Get specific document by ID

You can retrieve (the configuration of) a specific document to confirm it exists or to parse something from its metadata if you have its ````documentId````.

> ⭑   **Note**: As always, you can look for the file in the UI as well. If for whatever reason it does not appear there after you've created a new document, it might be because of the way your Views are set up. Go to your Library administration page, go to Views, and select the checkbox called "View documents from other classes".

#### Method and API

Play with the API Explorer:

##### [GET /document/v1/{documentId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/get)

#### Guidelines

##### Request

Only ````documentId```` is mandatory, and it must be an AODocs ````documentId```` not a Drive ````fileId````.

##### Sample request (asking for a full resource)

```
GET https://aodocs.altirnao.com/api/document/v1/RnTzVT28x5Sb48h3vSQ
```

If you need only some of the fields of the extensive ApiDocument resource to come back, you can specify them in the ```fields``` array field of the request and sending this list as a query parameter. For example, you might want to request only the library name, class name, library ID, class ID, document ID, title, and the document description.

##### Sample request (partial resource)

```
GET https://aodocs.altirnao.com/api/document/v1/RnTzVT28x5Sb48h3vSQ?fields=libraryName%2CclassName%2ClibraryId%2CclassId%2Cid%2Ctitle%2CrichText
```

> ⭑   **Note**: To get an AODocs document (including its ```documentId```) by the Drive ID of one of its attachments, use the ```GET /document/v1/drive/{driveId}``` method.

##### Response

The response returns an [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource, listing the document associated with the provided document ID. The document's ID is ````id````, and its class is what you specified in the request, else of the library's default type.

Response fields of note:

*   ````richText```` (document's Description field; supports HTML tags like ```<b>Hello</b> world!```; read more about editing this field in [Modifying documents with PATCH](https://docs.google.com/document/d/1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA/edit#heading=h.jqqjrnnjon39)

##### Sample Response

```json
{
  "kind": "aodocs#document",
  "libraryName": "my-DMS-lib-001",
  "className": "my-dms-class-002",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "classId": "RnTf1mx35gaTJLzoFp",
  "id": "RnTzVT28x5Sb48h3vSQ",  <— documentId
  "title": "my-dms-doc-002",
  "richText"": "",
}
```

---

## Modifying documents with PATCH

In AODocs, you can modify resources (such as a document) with the ````PATCH```` operation which **replaces/overwrites** the fields of the target resource. Specifically, with ````PATCH````, anything you specify in your request resource replaces its corresponding part in the server resource; and what you don't specify remains unmodified.

##### Patching simple fields

One simple example of patching is changing one of the document's properties, like its title. Or even replacing all its attachments with new links to new Drive files.

An easy way to try this out is to create a test AODocs document and modify its ```Description``` property (called ````richText```` in the API). Take any document where this Description field contains nothing important, and replace what's currently there with some new text by patching (see

[following](#heading=h.8gzunnbam38t)).

To patch a specific document by its ID, you send a request resource to replace corresponding fields in a target resource. More specifically, you send a (partial) ```ApiDocument``` resource where the specific target resource resides on the server, making sure that:

*   the request **resource** contains _only_ the resource fields you want modified
*   the resource **fields** included in the request are _not empty_ unless you actually want the target resource fields to become empty/deleted

##### Patching array fields

In general, patching is perfectly benign. However, things are riskier with any parts of the resource arranged in arrays. One example is using the ```attachments``` array field in DMS documents. However, this extends to any request containing array fields.

There are two cases to consider:

*   array field **not included** in request: corresponding target array does not get modified on the server
*   array field **included** in request (**including empty!**): completely **overwrites** target array field with whatever is in the square brackets in the order provided:
    *   object specified in array position X: object placed in target array at position X
    *   object not specified: object is removed from target array


> ⚠  Warning/Alert: The list of objects you specify in your array field in the order you specify completely replaces whatever currently exists in the corresponding resource array on the server.

> If you include an empty array field in your payload (without specifying any objects), you are saying to the server "I want this complete array field to be(come) empty."  For example, if you use the ```attachments``` array field with DMS documents, the result is a target DMS document with no more attachments.

> (The one-attachment restriction in TF/SF prevents this possibility; however it still applies for other types of array field.)

> Additionally, if you want any of the current objects to remain in the array field (as you alter it), you have to specify them each time in the array field in your request, including their current position). For example, if you use the ```attachments``` array field with DMS documents, then you have to deliberately send the complete list of what you want the array to contain from then on, in the order you want.

> (Missteps such as accidental detaching or re-ordering of attachments are not possible with TF/SF documents because you only ever patch the one attachment.)


#### Method and API

Play with the API Explorer:

##### [PATCH /document/v1/{documentId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/patch)

#### Guidelines

##### Prerequisites

Because this is an overwrite operation, you have to know which pieces you want to replace with your new changes, including overwriting with nothing (deleting). And you have to be aware of the power of this operation to make changes that are somewhat complicated to undo.

##### Request

Only ````documentId```` is mandatory (to identify which document's metadata to alter). However,  including only the ```documentId``` parameter is the degenerate case: if that's all you specify, and specify no changes, then the Last Modified date of the document gets reset, but otherwise no changes take place.

For this method to do anything, you must specify the parts you want changed, and you must send them as **request-body parameters** (not as query parameters).

###### Example: Patch document with new/modified metadata

For example, in the request body, you can include some text in the ````richText```` field, which corresponds to your document's ```Description``` property. If you send the request with this field set to (arbitrarily) ```This is my <b>Hello world!</b> document```, then the server will change the ```richText```  field inside the server resource when you execute the request. Similarly, if you send the ```title``` as ```Hello-world-doc-001```, you will change the title of your target document.

###### Sample request body (generic)

```
{
  "richText": "This is my <b>Hello world!</b> document.",
  "title": "Hello-world-doc-001",
}
```

###### Example: Patch document with attachments

Attachments are represented in the ```ApiDocument``` resource as an array field (see preceding

[warning](#heading=h.uagnrz4vz8kz)). As with any other field, when the field is sent to the server, its contents will ```PATCH`` (overwrite) the contents of the corresponding field on the target resource residing on the server.

To alter what files are currently attached to your document, use the array field called ````attachments```` in the body of the request. This array field holds the file ID(s) of Drive files you want to become the current attachments to your document.

In the case of TF/SF documents, this is relatively foolproof since you are limited to a single attachment. There is only one action that carries any risk, and that's replacing the attachment with another one by accidentally sending a [non-empty ```attachments``` array field](#heading=h.tb6iuzrmzm9x).

However, when dealing with DMS-document attachments, you must proceed more cautiously because DMS documents have no attachment restrictions, and you must thus consider multiple potential outcomes depending on how you phrase ```attachments```.

If you are using the ```attachments``` array field in your request and you happen to be dealing with a DMS document, then you must **exercise caution**: **whatever you include in the array (including _nothing_) becomes your new list of attachments, in the order you provide**.

This means that if you are actually including the ```attachments``` array field in your request, then **you must explicitly specify what you want to keep each time**; and if you send it to the server **empty**, the server will **empty** the target document of all its attachments.

For example, if you have an existing DMS document with one attachment, but want to add another attachment to it, you must specify both attachments (the existing _and_ the new), and in the correct order. If you only specify the new attachment, the original attachment will get detached, and your new attachment will get attached in its place, replacing the original. Result: a single attachment (the new one).

Therefore, if you do not need to change anything to do with attachments, do not send the ```attachments``` array field at all. This ensures that the ```attachments``` array field in the resource on the server remains unmodified, keeping your attachments as they are.

> 💡   Tip: You can avoid some of the pitfalls of array fields by sampling the contents of the array field from the previous patch operation, which returns the ```ApiDocument``` resource in full (or partial if you used the ```fields``` field to filter the response). This is the same result as sending a ```GET``` request to get a document. This way you always have an up-to-date listing of what the target resource looks like on the server. Read the array field(s) you need, and feed the fields into your next request.


> ⭑   **Note**: Notwithstanding attachment-restriction differences between DMS documents and TF/SF ones, the preceding guidelines for using the ```attachments``` array fields are generalizable to other array fields.

###### Sample request body (```attachments``` non-empty)

When you send the  ```attachments``` array field filled out with file ID(s), you are saying to the server that you want these files in this specific order to be the attachments from now on, regardless of what used to be attached up until now.

 In the case of TF/SF, you are restricted to exactly one file ID inside the ```attachments``` array field. In the case of DMS, this restriction does not exist.

 To keep any current attachments in your DMS document, you must explicitly state them here. Also, if you want to keep their existing ordering, then you also must specify them in that order.

```
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM

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

###### Sample request body (DMS-only, with ```attachments``` array field empty)

In DMS, this is how you detach ("delete") attachments all at once. The (ex-)attachments are still owned by the storage account. With no parent document, however, no reference to them exists in either AODocs libraries or in Drive (except in logs). To regain access to them you need the intervention of a domain administrator.

```
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM

{
  "attachments": []  // ⇐ removes all current links to Drive files and replaces them with whatever is specified in the square brackets (empty square brackets means all attachments get detached!)
}
```

###### Sample request body (with ```attachments``` array field not included)

```
PATCH https://aodocs.altirnao.com/api/document/v1/RsjbYc788vqY6WDeUnM

{
  // not including the attachments array field keeps attachments as they are, unmodified
}
```

##### Response

The response returns an [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource, listing the freshly patched document with the overwritten fields (here just ````title```` and ````richText````, and everything else remains unmodified). If you altered the ```attachments``` array field, the response includes the new content.

Response fields of note:

*   ````title```` (whatever you set it to)
*   ````richText```` (document's Description field; supports HTML tags like “`<b>Hello</b> world!`”

##### Sample Response

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

##### Example screenshots from the document page in the UI

You can confirm that the change actually took place by looking at the title and description field of the target document in the UI:

![image placeholder](/img/api.png)

---

### Delete a specific document by ID

You can delete a specific document if you have its ````documentId````. You can either delete it permanently, or just send it to Trash. You can retrieve it from the Trash, or leave it there and it will get deleted after some designated amount of time.

#### Method and API

Play with the API Explorer:

##### [DELETE /document/v1/{documentId}](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/document/v1/%7BdocumentId%7D/get)

#### Guidelines

##### Request

Only ````documentId```` is mandatory, and it must be an AODocs ````documentId```` not a Drive ````fileId````.

> ⭑   **Note**: To get an AODocs document (including its ```documentId```) by the Drive ID of one of its attachments, use the ```GET /document/v1/drive/{driveId}``` method.

##### Sample Request

```yaml
DELETE https://aodocs.altirnao.com/api/document/v1/RssP0ol81I2JjwfFgxk?deleteMode=TRASH
```

##### Response

Because this is a deletion of a resource, there is no resource to return in the response. The response returns an HTTP code of ```204 (NO CONTENT)```.

##### Sample Response

```json
204
```


