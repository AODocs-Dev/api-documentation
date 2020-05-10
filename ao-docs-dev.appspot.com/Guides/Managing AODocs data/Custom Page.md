# [OLD] Data handling tutorial

We put the most useful API methods together into a sequence you can follow in the [API portal](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/routes/library/v1/put) to acquire the know-how needed to accomplish the most common data-handling goals, as well as to gain the confidence to tackle more advanced API tasks, including configuration and administration.

> ⭑   **Note**: You can perform most of the tasks in this tutorial either using the API or on your homepage in the UI.  Use the one that suits your needs, or you can do them both to understand how they map to each other.

## Before you begin

If you haven't yet, make sure you familiarize yourself with the [basic terminology of the AODocs universe](https://support.aodocs.com/hc/en-us/articles/115005405943-AODocs-basic-terms).  Also, [create some test files and folders](#heading=h.x1k4y4foz0cu) to work with in your Google Drive: the files are going to become attachments to the AODocs documents you're about to create.

## What you'll do

In this tutorial you'll port some Drive files to become attached to AODocs **documents** inside some AODocs **libraries**.  Once attached, you'll create/add/patch/update/delete **documents**, **attachments**, **properties**, and **metadata**.  Whenever appropriate, for each task, you'll get a link to the specific part of the API portal needed to accomplish the task.

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

AODocs content is contained in libraries.  Your libraries should already exist; if they don't, a library administrator needs to [create them first](https://support.aodocs.com/hc/en-us/articles/115002366923-Create-a-library-from-scratch).

Once your libraries exist, you can list them to get an idea of where to place your content.

The most useful methods to list and get libraries are the following:

* [List/get all available AODocs libraries (full)](#heading=h.uo5k19sxia3)
* [List/get all available AODocs libraries (plain)](#heading=h.l3tpn8bxn8c)
* [List/get a specific library](#heading=h.54nl5zpso1lw)

_____________________________

### List libraries and find target library ID for your documents

List target libraries on your domain, select a target library for your AODocs documents to live in, and note the target library's unique identifier ````libraryId````

#### Method and API

Play with the API Explorer:

```
PUT /library/v1
```

#### Usage/notes/guidelines

##### Request

> ⚠  Warning/Alert: This method requests all metadata for all libraries on the domain.  Not recommended without filtering!

This method has no mandatory parameters, but without setting any filtering it tries to return all metadata for all libraries, which is often overwhelming to the server and might not produce any response.  We strongly recommend you set the ```include``` query parameter to ```NONE```.  Alternatively use the [List plain libraries](#heading=h.l3tpn8bxn8c) method to get just the key-value pairs.

##### Response

The response returns an [ApiLibraryList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiLibraryList) resource, listing all libraries accessible to you on the domain.  With the recommended parameter ````include=NONE```` the response is smaller and far more manageable.

Take note of the ````libraryId```` of your target library.  The library ID is one of the most commonly used identifiers in the AODocs APIs.

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
      "name": "mfie-stag-DMS-lib-001",
      "defaultDocumentType": "RnTbOft44KfZYkfBpV",
      "rootFolderId": "1S7ayhti78VtuNl-SebgGTu_wliznnR47",
      "favorited": false,
	 ...
    },
    {
      "kind": "aodocs#library",
      "libraryId": "Rngc1ug8K6WmL3IjZ8",
      "name": "mfie-sf-lib-005",
      "defaultDocumentType": "Rngc4rL9JCj5xwTtrF",
      "rootFolderId": "1yAMvoTBFEvI_8GXghiyTEJqevJeW7q9C",
      "favorited": true
    }
  ]
}
```

#### List libraries and find ```libraryId``` in UI

You can also locate the ````libraryId```` of your target library inside the AODocs UI.  Go to your homepage > My libraries by clicking on the "My libraries" link in thepper left corner of most pages:

 Ophe desired target library, and note the library ID in t GIt's the long string of numbers and letters after `LibraryId_` (up to and _excluding_ the next slash):

```/LibraryId_<libraryId>/```

##### Example

```/LibraryId_RnTG8PDu8ZqTuDVHcv/```

Learn more about [navigating homepages](https://support.aodocs.com/hc/en-us/articles/208769506-What-is-the-AODocs-homepage-#h_594b6e3a-aebb-4b71-8d8e-a4c8aad7cc51) inside your AODocs and specific libraries.

___________________________________

###

### List libraries plain (alternative to List libraries)

If you want just the library name and ID in your response, use the plain list as an alternative to the full library listing.

#### Method and API

Play with the API Explorer:

```
PUT /library/v1/plain
```

#### Usage/notes/guidelines

##### Request

There are no mandatory or recommended parameters to send.

##### Response

The response returns an [ApiPlainLibraryList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiPlainLibraryList) resource, listing all libraries accessible to you on the domain, but only listing the following for each:

*   library name
*   library ID
*   modification dates

Take note of the ````libraryId```` of your target library.  The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional response fields to note:

*   `name` (of the library)

#####

##### Sample Response

```json
  {
      "kind": "aodocs#plainLibrary",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "name": "mfie-stag-DMS-lib-001",
      "lastModified": "1579005945318",
      "lastConfigModified": "1579005945318"
    },
    {
      "kind": "aodocs#plainLibrary",
      "libraryId": "Rngc1ug8K6WmL3IjZ8",
      "name": "mfie-sf-lib-005",
      "lastModified": "1579619340936",
      "lastConfigModified": "1579619340936"
    }
```

###

_____________________________

### Get a specific library by ID

You can retrieve (the configuration of) a specific library to confirm it exists or to parse something from its metadata if you have its ````libraryId````

#### Method and API

Play with the API Explorer:

```
GET /library/{libId}
```

#### Usage/notes/guidelines

##### Request

To get your desired library back in the response you have to provide the library ID.  This is the only mandatory field.  If you want the response to come back with only a core set of metadata for your library, set the `include` parameterto `NONE`.

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
  "name": "mfie-stag-DMS-lib-001",
  "name_i18n": "mfie-stag-DMS-lib-001",
  "domainName": "test.aodocs.com",
  "lastModified": "1579005945318",
  "lastConfigModified": "1579005945318",
  "createdAt": "1578929230251",
  "homeUrl": "mfie-stag-dms-lib-001",
  "daysBeforeDelete": 30,
  "welcomeText": "<p>Welcome to your new Document Management library: mfie-stag-DMS-lib-001</p><br><p>To get started...</p>",
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

##

## Get class info

Libraries contain documents of various **types**.  These document types, defined ahead of time, are called **[classes](https://support.aodocs.com/hc/en-us/articles/205655634)**.  When a library is first created, it automatically gets outfitted with a default document type, or class.  Other classes in your target library might already have been created for you.

These methods are useful when working with classes:

* [List all available AODocs classes in a specific library](#heading=h.z5cmdwh1c18a)
* Get a specific class

_____________________________

### List classes (to find target classes for your documents)

You can list available target classes for your documents as follows:

#### Method and API

Play with the API Explorer:

```
PUT /documentType/v1/libraries/{libraryId}
```

#### Guidelines

##### Request

Only ````libraryId```` is mandatory.

To return just the bare minimum of class ID and displayName in the response, you can filter the results by populating the ````fields```` query parameter with ````items(displayName,id,kind),kind```` as follows:

````fields=items(displayName%2Cid%2Ckind)%2Ckind````

##### Response

The response returns an [ApiDocumentTypeList](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentTypeList) resource, listing all document classes available as part of the specified library.

Response fields of note:

*   ```id``` (of the class)
*   ```displayName``` (of the class)
*   ```libraryId``` (of the library we searched)
*   ```defaultClass``` (whether or not this is the library's default class)
*   any other fields of interest

##### Sample full response (abridged)

```
{
  "kind": "aodocs#classList",
  "items": [
    {
      "kind": "aodocs#classId",
      "id": "RnTbOft44KfZYkfBpV",
      "displayName": "mfie-stag-dms-class-001-default",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "defaultClass": true,
    },
    {
      "kind": "aodocs#classId",
      "id": "RnTf1mx35gaTJLzoFp",
      "displayName": "mfie-stag-dms-class-002-not-default",
      "libraryId": "RnTG8PDu8ZqTuDVHcv",
      "defaultClass": false,
    }
  ]
}
```

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

_____________________________

### List classes in the UI

You can also list your library classes in the UI, on the Library Administration page.

Go to Administration > Library administration.  In the left-hand pane, go to Library configuration > Document classes.  This is where your classes are listed.  Note the singular green checkmark signifying the library's default class.

_____________________________

### List a specific class by ID

You can retrieve (the configuration of) a specific class/documentType to confirm it exists or to parse something from its metadata if you have its `classId`/`documentTypeId`.

#### Method and API

Play with the API Explorer:

```
GET /documentType/v1/libraries/{libId}/documentTypes/{documentTypeId}
```

#### Guidelines

##### Request

Pass the mandatory ```classId```/```documentId```, as well as the ```libraryId``` of the library the class resides in as **_path_ parameters** (not in the query string).

##### Response

The response returns an [ApiDocumentType](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocumentType) resource, listing the specified class.

Response fields of note:

*   ````id```` (of the class)
*   ```displayName``` (of the class)
*   ```libraryId``` (of the library you searched)
*   ```defaultClass``` (whether or not this is the library's default class)

##### Sample Response

```json
{
  "kind": "aodocs#documentType",
  "id": "RnTbOft44KfZYkfBpV",
  "displayName": "mfie-stag-dms-class-001-not-default",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  },
  "defaultClass": true,
}
```

## Create new documents with attachments

In AODocs, you can create new documents with either just a single attachment (TF/SF/DMS), or any number of attachments including zero (DMS-only).

To create AODocs documents with and without attachments, follow these steps:

* [Get a few Drive test files and folders ready (to become AODocs document attachments)](#heading=h.x1k4y4foz0cu)
* [Create a new document and attach a Drive file](#heading=h.vllmj75wrdzj)
*   [Get the specific document you've created](https://docs.google.com/document/d/1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA/edit#heading=h.g9k67owiq7yi)

You can also [Create AODocs documents in the UI](https://support.aodocs.com/hc/en-us/articles/115005892403-Create-AODocs-documents).

_____________________________

### Before creating AODocs documents: create test Drive folder and files

In order to have some test files and folders to work with, open up your [Google Drive](https://drive.google.com/) and create a Drive folder.  Upload or create some files beside it as well as inside it.

Here's an example of what that might look like:

[image]

[image]

####

#### Folder ID

In Drive, files and folders are identified by their individual IDs.  When the URL says something like ```/drive/folders/**1HczxnMexotWE3H9z8aebZepvkla60UEz*```, the long string of numbers and letters refers to the current Drive **folder** ID:

[image]

[image]

Make note of the **Drive folder ID** in the URL for later.

####

#### File ID

To get the URL to display the **file** ID of the **file** that's currently open, click on the More options" menu (**⁝**), then on "Open in new window":

[image]

Now the URL lists the Drive **file** ID (as opposed to **folder** ID):

[image]

> ⭑   **Note**: Certain Drive files such as Google Forms require an additional step of clicking on ```Edit``` (pencil icon usually in the bottom right of the page) and open the file in yet another view.  Only then does the URL display the proper file ID.

Make note of the **Drive file ID** for [later](#heading=h.vllmj75wrdzj).  It and the **AODocs document ID** are the two most critical and commonly used pieces of identifying information in the **AODocs API**.

> ⭑   **Note**: If you're familiar with the Drive API, the file ID is the ID of the File resource.

#### Next steps

Use a Drive file to [create a new AODocs document with one attachment (TF/SF/DMS)](#heading=h.vllmj75wrdzj).

____________________________________

### Create new document and attach Drive file

When you create a TF/SF document, you must attach one and only one attachment (using a Drive file's ````fileId```` ).  You create a DMS document the same way, but you can do it with any number of attachments (including zero).

For example, you might have a spreadsheet in Google Drive that you want to manage with AODocs.  Wrapping a new AODocs document around your spreadsheet allows you to use all the AODocs document management features and properties like custom properties and workflows.

In DMS, you can also create a new document with no attachments.  An example could be an expense-report document that needs to be delivered before the expenses are ready to be attached.  You can create the document first, and then attach the receipts whenever appropriate.

To create a new document, you send a request to the server with an ```ApiDocument``` resource, listing:

*   mandatory resource fields required by the server (like target library ID)
*   optional but useful fields (like document title, class ID, and folder ID)
*   any Drive IDs of files to attach — zero or more for DMS libraries; and a mandatory single one for TF/SF

#### Method and API

Play with the API Explorer:

```
PUT /document/v1
```

####

#### Guidelines

##### Prerequisites

Before you create a new empty document with one attachment, you **must know** the ````libraryId```` of the library you'll be creating the document in.  For a single attachment, any library type works: TF, SF, or DMS — but you still have to know the ID of the specific target library.

You also need the ````fileId```` of any Drive file that you want to attach to your document.  Read more about how to [obtain the file ID in the AODocs UI](#heading=h.hhg7itlz0n58).

> ⭑   **Note**: In the API Explorer's "Request body" window, ```fileId``` is part of the ```attachments``` array field; alternatively, if you need to attach by explicitly making a copy of the original file, it is found under ```attachmentsToCopy``` .

Optionally, it's **good to know** your target class (what type of document this will be), but if you don't specify it, the document will automatically become of the same type as your target library's current default class.  Lastly, you should give a title to your new document.  If you don't, it'll get called "Untitled, which can get confusing.

You might also want to provide the ID of a specific target AODocs folder for your new document to live in.  You can do this by specifying the AODocs folder ID (```folderAodocsId```).  If you don't know this ID, you can open up your target folder in the UI and retrieve the ID from the URL between the surrounding ```%2522``` strings:

```%2522```folder```%2522```:```%2522```1jaPv028i_mrOykI60KavWib2LTzSuYWr8```%22```

The preceding is just a URL-encoded version of this ```folder:folderId``` pair:

```"folder":"1jaPv028i_mrOykI60KavWib2LTzSuYWr8"```

> ⭑   **Note**: If you need to attach files from a Google account outside the target domain, the following prerequisites have to be met:
You have to have ownership of each such file.
You or your domain has to be whitelisted in the target domain.
You have to have access to the target library.
If the file is not yet owned by an AODocs storage account, you have to use the ```googleapis.com/auth/drive scope``` during the procedure.

In an out-of-domain case such as this, the file itself gets automatically duplicated and it is this new duplicate that becomes the attachment to your target document, not the original.

##### Request

Pass the **mandatory** parameters of ````fileId```` (for any Drive file to be attached) and ````libraryId```` **in the request body**, not in the query string.  Same thing for the **optional** ````classId````, ````title````, and ````folderAodocsId````.

    You provide the ```fileId``` inside either of the two array fields in the request body:

*   ```attachments```
*   ```attachmentsToCopy```

If you attach a Drive file using ```attachments```, and then edit that attachment's content, the edits happen in the original Drive file because the attachment is a direct link to that file.

> ⭑   **Note**: Once attached to a DMS document, the source Drive file no longer has a visible parent folder in Google Drive.  It's still accessible via search and via the "Shared with me" shortcut/folder, but it no longer appears inside its original folder hierarchy (if any).

If you attach a Drive file using ```attachmentsToCopy```, and then edit that attachment's content, the edits happen in the copy of the original Drive file created during the attachment process.

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
  "libraryId": "RnTG8PD8u8ZqTuDVHcv",
  "classId": "RnTf1mx35gaTJLzoFp",
  "title": "mfie-stag-dms-doc-002"
}
```

> ⭑   **Note**: In the preceding sample request, note the ```attachments``` part in bold (or ```attachmentsToCopy``` if that's what you're using instead).  If you're attaching one or more Drive files, include this part, and list your attachments by ```fileId```.  If you're not attaching anything, remove this part altogether.

##### Response

If the request succeeds, the response returns a ```200 OK``` status code and a JSON-formatted representation of an [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource.  The JSON object includes metadata describing details and attributes of the newly created document inside the specified library.  The document's ID is listed as ````id````, and its ````classId```` is what you specified in the request, else of the library's default type.

````ApiDocument```` response fields of note:

*   ````richText```` (document's Description field; supports HTML tags like “`<b>Hello</b> world!`”; read more about [modifying documents with PATCH](https://docs.google.com/document/d/1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA/edit#heading=h.jqqjrnnjon39)

##### Sample response

> ⭑   **Note**: If attaching a Drive file requires making a copy of it instead of directly linking to the original, the file ID in the response ends up being different from the file ID sent in the request.  The request identifies the original, the response identifies the copy.

```
{
  "kind": "aodocs#document",
  "libraryName": "mfie-dms-by-alt-on-test-001",
  "className": "mfie-dms-by-alt-on-test-001-class-001",
  "className_i18n": "mfie-dms-by-alt-on-test-001-class-001",
  "libraryId": "RrVcEFb8wtDeNAnlmNN",
  "classId": "RrVcdN280MKJwPyE7sh",
  "id": "RrVsvlY80jV2N7NcCIy",  // <— documentId
  "title": "my-important-document-with-spreadsheet-attachment",
  "richText": "",
  ...
  "attachments": [
    {
      "fileId": "1wwO-7T8e_doTw3rK3_wqvyh5zEWL5IKDh", // ⇐ same as in request because the file was not copied
      "name": "my-important-spreadsheet",
      "mimeType": "application/vnd.google-apps.spreadsheet",
      "link": "https://docs.google.com/spreadsheets/d/108JuZK8TqnjYI3YND_GmiIc-tfoZVJ7IJzQrD8lfjNJc/edit?usp=drivesdk",
      ...
    }
  ],
  "numberOfAttachments": 1,
}
```

You can also [create AODocs documents in the UI](https://support.aodocs.com/hc/en-us/articles/115005892403-Create-AODocs-documents).

_____________________________

### Using ```attachmentsToCopy``` instead of ```attachments```

Sometimes it makes more sense to **create an attachment using a copy of a Drive file** instead of the source file itself.  This is done using the ````attachmentsToCopy```` alternative to ````attachments````.

This is a rather generic case: you would do this any time you specifically want to start with a duplicate of the original instead of the original itself.  For example, certain files and their versions get frozen by a new policy, but their content is still useful as a template for future work.

When you put together your request to create an AODocs document with an attachment, you can tell AODocs to make a physical copy of the original Drive file (with the same name but with AODocs as owner).  To do this, specify the ````fileId```` of a specific Drive file as attachment source inside the ````attachmentsToCopy```` array field in the request body **instead of** the usual ````attachments```` array field.

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
  "libraryName": "mfie-dms-by-alt-on-test-001",
  "className": "mfie-dms-by-alt-on-test-001-class-001",
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

###

_____________________________

### Get specific document by ID

You can retrieve (the configuration of) a specific document to confirm it exists or to parse something from its metadata if you have its ````documentId````.

> ⭑   **Note**: As always, you can look for the file in the UI as well.  If for whatever reason it does not appear there after you've created a new document, it might be because of the way your Views are set up.  Go to your Library administration page, go to Views, and select the checkbox called "View documents from other classes".

#### Method and API

Play with the API Explorer:

```
GET /document/v1/{documentId}
```

#### Guidelines

##### Request

Only ````documentId```` is mandatory, and it must be an AODocs ````documentId```` not a Drive ````fileId````.

##### Sample request (asking for a full resource)

```
GET https://aodocs.altirnao.com/api/document/v1/RnTzVT28x5Sb48h3vSQ
```

> ⭑ **Note**: If you need only some of the fields of the extensive ApiDocument resource to come back, you can specify them in the ```fields``` array field of the request and sending this list as a query parameter.  For example, you might want to request only the library name, class name, library ID, class ID, document ID, title, and the document description.

##### Sample request (partial resource)

```
GET https://aodocs.altirnao.com/api/document/v1/RnTzVT28x5Sb48h3vSQ?fields=libraryName%2CclassName%2ClibraryId%2CclassId%2Cid%2Ctitle%2CrichText
```

> ⭑   **Note**: To list/get an AODocs document by the Drive ```fileId``` of one of its attachments, use ```GET /document/v1/drive/{driveId}```.

##### Response

The response returns an [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource, listing the document associated with the provided document ID.  The document's ID is ````id````, and its class is what you specified in the request, else of the library's default type.

Response fields of note:

*   ````richText```` (document's Description field; supports HTML tags like “`<b>Hello</b> world!`”; read more about [modifying documents with PATCH](https://docs.google.com/document/d/1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA/edit#heading=h.jqqjrnnjon39)

##### Sample Response

```json
{
  "kind": "aodocs#document",
  "libraryName": "mfie-stag-DMS-lib-001",
  "className": "mfie-stag-dms-class-002",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "classId": "RnTf1mx35gaTJLzoFp",
  "id": "RnTzVT28x5Sb48h3vSQ",  <— documentId
  "title": "mfie-stag-dms-doc-002",
  "richText"": "",
}
```

####    Request

```
    GET https://aodocs.altirnao.com/api/_ah/api/document/v1/RsBDfKJ0y14Ze4hzPl
```

####    Response

```
    200
```

```
     {
    "kind": "aodocs#document",
    "domainName": "altirnao.com",
    "libraryName": "mfie-sf-prod-002",
    "className": "Document",
    "className_i18n": "Document",
    "libraryId": "Rs511XRxAxGXu7nZYj",
    "classId": "Rs513w804jXR8LKnJZ",
    "id": "RsBDfKJ0y14Ze4hzPl",
    "title": ".DS_Store",
    "richText": "",
    ... // <== a lot more
    }
```

###

## Modifying documents with PATCH

In AODocs, you can modify a document or its component parts with the ````PATCH```` operation which **overwrites** the target resource.  Specifically with ````PATCH````, anything you specify in your request replaces its corresponding part in the server resource, and what you don't specify remains unmodified.

In general, this is perfectly benign.  However, things are riskier with any parts of the resource arranged in arrays, such as attachments.

> ⚠  Warning/Alert: Extreme caution is advised, as the list of attachments you specify in your ```attachments[]``` field completely replaces whatever attachments currently exist.  If you include an empty ```attachments``` array field in your payload (without specifying any attachments), you are saying to the server "I want my set of attachments to be empty."  This results in a target document with all the attachments effectively deleted.

If you want any of the current attachments to remain attached, you have to specify them each time in the ```attachments``` array field in your payload (they'll get unattached but reattached as part of the same operation).

###

_____________________________

### Patch document with replacement metadata

You can modify a document's metadata by patching, which is effectively a replacement of the specific piece of metadata with a new "patch", while leaving all other pieces intact.

For example, you could update the permissions of a specific document or an attachment.  Or change one of the document's properties, like its title.

An easy way to try this out is to modify your AODocs document's title, as well as the Description property that exists in each document.  In the API this is called ````richText````.  Take any document where this Description field is empty or has nothing important, and patch it with some test text.

#### Method and API

Play with the API Explorer:

```
PUT /document/v1/{documentId}
```

#### Guidelines

##### Prerequisites

Because this is an overwrite operation, you have to know what you want to overwrite with your new changes.

##### Request

Only ````documentId```` is mandatory (to identify which document's metadata to alter), but if you don't specify anything to change, then nothing will change.  Pass the changes you want as **request-body parameters** (not as query parameters).

For example, set the title field to ````Hello-world-doc-001```` and the ````richText```` field to ````This is my <b>Hello world!</b>````` document.` and execute the request.

##### Sample request body

```
{
  "richText": "This is my <b>Hello world!</b> document.",
  "title": "Hello-world-doc-001",
  // "attachments": [] // ← WARNING!  REMOVES ALL ATTACHMENTS!
}
```

##### Response

The response returns an [ApiDocument](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/types/ApiDocument) resource, listing the freshly patched document with the overwritten fields (here just ````title```` and ````richText````, and everything else remains unmodified).

Response fields of note:

*   ````title```` (whatever you set it to)
*   ````richText```` (document's Description field; supports HTML tags like “`<b>Hello</b> world!`”; read more about [modifying documents with PATCH](https://docs.google.com/document/d/1_xHBm2TSTJU7u3eL1BNo0thYiFlQPGDD3cLTN_ZemrA/edit#heading=h.jqqjrnnjon39)

##### Sample Response

```json
{
  "kind": "aodocs#document",
  "libraryName": "mfie-stag-DMS-lib-001",
  "className": "mfie-stag-dms-class-002",
  "className_i18n": "mfie-stag-dms-class-002",
  "libraryId": "RnTG8PDu8ZqTuDVHcv",
  "classId": "RnTf1mx35gaTJLzoFp",
  "id": "RnTzVT2x5Sb48h3vSQ",
  "title": "Hello-world-doc-001",
  "richText": "This is my <b>Hello world!</b> document.",
}
```

##### Sample screenshots from the document page in the UI

You can confirm that the change actually took place by looking at the title and description field of the target document in the UI:

[IMAGE]

[IMAGE]

