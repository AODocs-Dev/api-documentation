# Get library info

AODocs content is contained in libraries. Your libraries should already exist; if they don't, a library administrator needs to [create them first](https://support.aodocs.com/hc/en-us/articles/115002366923-Create-a-library-from-scratch).

Once your libraries exist, you can list them to get an idea of where to place your content.

The most useful methods to list and get libraries are the following:

*   [List libraries](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/put) (legacy v1)
*   [List and search libraries](/docs/aodocs-staging.altirnao.com/1/routes/library/v2beta1/search/get) (v2beta1)
*   [List libraries plain](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/plain/put) (alternative to List libraries)
*   [Get a specific library by ID](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/%7BlibId%7D/get)

What follows are elaborations on these methods.

---

## List libraries and find target library ID for your documents (legacy v1)

To list target libraries on your domain, select a target library for your AODocs documents to be a part of, and note the target library's unique identifier, `libraryId`.


### Method and API

Play with the API Explorer:

#### [PUT /library/v1](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/put)

### Usage/notes/guidelines

#### Request

> ⚠ **Warning/Alert**: This method requests all metadata for all libraries on the domain. Not recommended without filtering!

This method has no mandatory parameters, but without setting any filtering it tries to return all metadata for all libraries, which is often overwhelming to the server and might not produce any response. We strongly recommend you set the `include` query parameter to `NONE`.

#### Sample request

```yaml
PUT https://aodocs.altirnao.com/api/library/v1?include=NONE
```

Alternatively use the [List plain libraries](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/plain/put) method (see below) to get just the key-value pairs of `name` and `id`.


#### Response

The response returns an [ApiLibraryList](/docs/aodocs-staging.altirnao.com/1/types/ApiLibraryList) resource, listing all libraries accessible to you on the domain. With the recommended parameter `include=NONE` the response is smaller and far more manageable.

Take note of the `libraryId` of your target library. The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional fields to note:

*   `name` (of the library)
*   `defaultDocumentType` (the library's default class ID)
*   `rootFolderId` (the ID of the topmost level of the library's hierarchy)
*   `favorited` (whether or not the library is starred as a favorite)
*   any other fields of interest


#### Sample response


```json
{
  "kind": "aodocs#libraryList",
  "libraries": [
    {
      "kind": "aodocs#library",
      "libraryId": "RnTG8PD8u8ZqTuDVHcv",
      "name": "my-DMS-lib-001",
      "defaultDocumentType": "RnTbOft844KfZYkfBpV",
      "rootFolderId": "1S7ayht8i78VtuNl-SebgGTu_wliznnR47",
      "favorited": false,
      ...
    },
    {
      "kind": "aodocs#library",
      "libraryId": "Rngc1ug8K6WmL3IjZ8",
      "name": "my-sf-lib-005",
      "defaultDocumentType": "Rngc4rL89JCj5xwTtrF",
      "rootFolderId": "1yAMvoT8BFEvI_8GXghiyTEJqevJeW7q9C",
      "favorited": true
    }
}
```

---

## List and search libraries (v2beta1)

This method allows you to search for target libraries on your domain with string queries (including quoted phrases) as well as several parameters to help narrow the scope. Without them, what comes back in the response is the full list of libraries available to you.

### Method and API

Play with the API Explorer:

#### [GET /search/v2beta1/search](/docs/aodocs-staging.altirnao.com/1/routes/library/v2beta1/search/get)


### Usage/notes/guidelines

The search can be conducted without any parameters, returning all libraries that you are authorized to access, in an undefined order.

#### Request

Several useful parameters are available to help narrow the search.

#### Request parameters of note

**`query`**

The `query` query parameter is what ultimately determines what results come back, filtering them on a text string. You can search for the following:

*   a word (like _blue_)
*   several words in any order (_document big blue_)
*   an exact phrase (_"big blue document"_ — two or more words in exact order in double quotes)
*   an inexact phrase (_~"big blue document"_ — exact phrase but allowing for common variants of its constituent words, like _bigger_, _blues_, and _documenting_)
*   a substring of characters in a word (only at the prefix position, e.g. _docu_)
*   a library ID (equivalent of get library)

> ⭑  **Note**: The double quotes return only adjacent words in a phrase. For example, if your document is called _big blue document_, then sending _"big blue"_ or _"blue document"_ (with the double quotes) as a phrase in the ```query``` query parameter finds _big blue document_, but sending _"big document"_ as a phrase does not.

**`userSuperAdminAccess`** (default: `false`)

By default, you receive a response containing no more information than you need. If you are a domain administrator (superadmin), you can change the `userSuperAdminAccess`'s default value of `false` to `true` to elevate your privileges to return libraries accessible to all domain administrators.

**`minimumCurrentUserRole`**

Use this flag if you want to have access to libraries you are at least an `ADMIN` of. For example, if you want to know which libraries you're authorized to import content into, then you don't want to consider libraries you only have `READER` privileges for (since you can't import at that level).

**`libtypes`**

You can specify which of the three types of libraries you get in the response in any combination. Specifying none is the same as specifying all.

**`storageAccount`**

You can either request results from all storage accounts available to you, or you can specify one storage account at a time.

**`labelIds`**

When you list all libraries in the UI, you can see a list of labels in the left panel ordered alphabetically. With this parameter, you can request libraries by label, including several at a time.

**`favorite`**

If set to `true`, returns just this user's favorite libraries.

**`orderBy`**

You can either get your results ordered arbitrarily, or you can use this parameter to sort your results by one and only one of the following:

*   `NAME` (ascending)
*   `LAST_ACCESSED` (descending)
*   `TASK_COUNT` (descending)
*   `FAVORITE_FIRST`

> ⭑  **Note**: The `orderBy` parameter bears a performance penalty and has a limit of 10,000 results. Check the `incompleteResults` flag in the response.

**`limit`** (default: `20`)

You can choose an arbitrary number of results to display, up to 1000.

**`requirePreciseResults`** (default: `false`)

If you don't specify this parameter, the result will contain a `totalResultCount` field that is an estimate of the total number of results matching your query (not only for the current page). The `estimatedResultCount` field in the response will be set to `true`.

This is the default behavior: the query is usually much faster when all it has to do is estimate the total number of results (instead of counting). The downside is that it's just an estimate — within about an order of magnitude — so the higher the values, the more significant the divergence.

If `requirePreciseResults` is set to `true`, then up to 25,000 results, the response's `totalResultCount` will contain the exact number of results that match your initial request, and beyond that, it'll contain an estimate. The `estimatedResultCount` will be set to `true` in either case.

**`include`** (default: `nothing`)

If you want information in addition to the default `nothing` setting, change the `include` parameter to one of the following:

*   `STATISTICS` (only for domain administrators)
*   `LABELS`
*   `IS_FAVORITE`
*   `LAST_ACCESSED`
*   `TASK_COUNT`

> ⭑  **Note**: There are some performance costs associated with each of these values, and the more of them are included, the more the performance degrades.

**`pageToken`**

This parameter is used for [pagination](/docs/aodocs-staging.altirnao.com/1/c/Guides/60-Best%20practices/20-Performance%20considerations) purposes. If you need to request the next page of results, populate this parameter with the value of the `nextPageToken` from the last response (keeping all other parameter values exactly the same).

#### Sample request (no parameters: list all)

```yaml
GET https://aodocs.altirnao.com/api/library/v2beta1/search
```

Alternatively use the [List plain libraries](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/plain/put) method (see below) to get just the key-value pairs of `name` and `id`.


#### Sample request (specific search)


```yaml
GET https://aodocs.altirnao.com/api/library/v2beta1/search?query=001&minimumCurrentUserRole=WRITER&libTypes=TF&favorite=true&orderBy=LAST_ACCESSED&limit=3&requirePreciseResults=true&facets=true&include=LAST_ACCESSED HTTP/1.1
```

#### Response

The response returns an [ApiLibrarySearchResultList](/docs/aodocs-staging.altirnao.com/1/types/ApiLibrarySearchResultList) resource, listing all libraries which are accessible to you on the domain and which match the specified query (no query means "all").

Take note of the `libraryId` of your target library. The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional fields to note:

*   `name` (of the library)
*   `defaultDocumentType` (the library's default class ID)
*   `rootFolderId` (the ID of the topmost level of the library's hierarchy)
*   `favorited` (whether or not the library is starred as a favorite)
*   any other fields of interest


#### Sample response


```json
{
  "kind": "aodocs#librarySearchResultList",
  "libraries": [
    {
      "id": "R6l0hkc80sxwUgY987R",
      "name": "my TF library 001",
      "libraryType": "TF",
      "storageAccount": "storage-account@test.altirnao.com",
      "rootFolderId": "1Rxi3ir8tGD1ektc6M5NnEP8Lz2NVNen9A",
      "folderVisibility": "PUBLICLY_EDITABLE",
      "onlyAdminsCanManageFolders": false,
      "currentUserRole": "ADMIN",
      "kind": "aodocs#librarySearchResult",
      "lastAccessed": null
    },
    ...
  ],
  "nextPageToken": "eyJpbk18lbW9yeSI6Z...c0Mn0=",
  "totalResultCount": 51,
  "estimatedResultCount": false,
  "incompleteResults": false
  }
```

---

### List libraries and find <code>libraryId</code> in UI

You can also locate the `libraryId` of your target library inside the AODocs UI. Go to your homepage > My libraries by clicking on the "My libraries" link in the upper left corner of most pages:

![libraryid-in-ui.png](/img/libraryid-in-ui.png)

Open the desired target library, and note the library ID in the URL. It's the long string of numbers and letters after `LibraryId_` (up to and _excluding_ the next slash):

<code>/LibraryId_<strong>\<libraryId\></strong></code>

#### Example

<code>/LibraryId_<strong>RnTG8PD8u8ZqTuDVHcv</strong></code>


Learn more about [navigating homepages](https://support.aodocs.com/hc/en-us/articles/208769506-What-is-the-AODocs-homepage-#h_594b6e3a-aebb-4b71-8d8e-a4c8aad7cc51) inside your AODocs and specific libraries.


---

## List libraries plain (alternative to List libraries)

If you only need the library name and ID in the response, then you can use the plain library list ([ApiPlainLibraryList](/docs/aodocs-staging.altirnao.com/1/types/ApiPlainLibraryList) as an alternative to the full library list ([ApiLibraryList](/docs/aodocs-staging.altirnao.com/1/types/ApiLibraryList). It is usually much faster than the standard library list API method, but returns much less information.


### Method and API

Play with the API Explorer:


#### [PUT /library/v1/plain](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/plain/put)


### Usage/notes/guidelines


#### Request

There are no mandatory or recommended parameters to send.


#### Sample request


```yaml
PUT https://aodocs.altirnao.com/api/library/v1/plain
```


#### Response

The response returns an [ApiPlainLibraryList](/docs/aodocs-staging.altirnao.com/1/types/ApiPlainLibraryList) resource, listing all libraries accessible to you on the domain, but only listing the following for each:

*   library name
*   library ID
*   modification dates

Take note of the `libraryId` of your target library. The library ID is one of the most commonly used identifiers in the AODocs APIs.

Additional response fields to note:

*   `name` (of the library)


#### Sample response


```json
 {
      "kind": "aodocs#plainLibrary",
      "libraryId": "RnTG8PD8u8ZqTuDVHcv",
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

---

## Get a specific library by ID

You can retrieve to parse something from its metadata (or to confirm it exists) if you have its `libraryId`.


### Method and API

Play with the API Explorer:


#### [GET /library/{libId}](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/%7BlibId%7D/get)


### Usage/notes/guidelines


#### Request

To get your desired library back in the response you have to provide the library ID. This is the only mandatory field. If you want the response to come back with only a core set of metadata for your library, set the `include` parameter to `NONE`.


#### Sample request


```yaml
GET https://aodocs.altirnao.com/api/library/v1/RrVcEFb8wtDeNAnlmNN
```

#### Response

The response returns an [ApiLibrary](/docs/aodocs-staging.altirnao.com/1/types/ApiLibrary) resource, listing the library associated with the provided library ID.

Response fields of note:

*   `libraryId`
*   `name` / homeUrl
*   `rootFolderId` (the ID of the topmost level of the library's hierarchy)
*   `defaultDocumentType` (the library's default class ID)
*   `favorited` (whether or not the library is starred as a favorite)
*   any other fields of interest


#### Sample response (include=NONE)


```json
{
  "kind": "aodocs#library",
  "libraryId": "RnTG8PD8u8ZqTuDVHcv",
  "name": "my-DMS-lib-001",
  "homeUrl": "my-dms-lib-001",
  "daysBeforeDelete": 30,
  "welcomeText": "<p>Welcome to your new Document Management library: my-DMS-lib-001</p><br><p>To get started...</p>",
  "storageAdmin": "storage.account@test.aodocs.com",
  "pushToMyDrive": false,
  "onlyAdminsCanManageFolders": false,
  "onlyAdminsCanEditRootFolder": false,
  "defaultDocumentType": "RnTbOft844KfZYkfBpV",
  "rootFolderId": "1S7ayhti78VtuNl-SebgGTu_wliznnR47",
  "defaultView": "RnTbOoS8wQ32JuKPEi1",
  "favorited": true
  ...
}
```

