# Document field values

AODocs documents are composed of metadata, including (but not limited to) system and custom properties defined as part of a specific document type (also known as class).

System properties are pieces of metadata defined at the document level, found in every document. Most of them are set by the system and are read-only. Some of them can be modified.

Custom properties are document metadata defined by an administrator during the creation of a class. Once defined, each document that belongs to the class takes on all the properties defined in its class.

> ⭑  **Note**: Properties can be added and deleted after class creation.

Read more about [managing custom fields in the UI](https://support.aodocs.com/hc/en-us/articles/115000051523#h_76055d8f-c7aa-4eaa-b9d7-68aaea6a170b).


## Limits

Documents have a 1MB size limit, so any otherwise unlimited field like `richText` or custom fields of type `TEXT` must fit inside this restriction.

Additionally, the ```title``` system field, as well as any other `STRING` fields have a 1500 byte limit.


## Setting system and custom fields

To set any fields in AODocs, you have to pass the correct JSON-formatted field-value pair as part of the request body along with the desired type of HTTP request: ```PUT``` to create a document; and ```PATCH``` to modify it.


### Setting system fields

In a document resource, system fields are top-level fields (not nested), and you can address them by name directly in your request.


#### Sample request

```yaml
    PUT https://aodocs.altirnao.com/api/document/v1
```

```json
    {
    "title": "my-new-doc-023",
    "richText": "my-new-doc-023-richText",
    "creationDate": "123456789000",
    "initialAuthor": "0x0006@gmail.com",
    "updateAuthor": "0x0008@gmail.com",
    "modificationDate": "987654321000",
    "setModifiedDate": true,
    "libraryId": "RsjaTyHw59078Zx7Dk"
    }
```

#### Updatability of system fields

In AODocs APIs, you can define system field values for a document when it is either created or updated. Some of these fields can be created or modified only if you set the ```setModifiedDate``` boolean flag to ```true```.

The following table outlines allowances and requirements for each system field.

[system fields modifiability](https://docs.google.com/spreadsheets/d/1nCqUro-ko9t_jKXGn-V3TBAL9tHsbPNDAgR0OGYcOIo/edit?usp=sharing)



<table>
  <tr>
   <td rowspan="2" ><strong>Are the following</strong>
<p>
<strong>fields modifiable?</strong>
   </td>
   <td colspan="2" >At
<p>
creation
   </td>
   <td colspan="2" >At
<p>
modification
   </td>
  </tr>
  <tr>
   <td>sMD=false
   </td>
   <td>sMD=true
   </td>
   <td>sMD=false
   </td>
   <td>sMD=true
   </td>
  </tr>
  <tr>
   <td>initialAuthor
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>No
   </td>
  </tr>
  <tr>
   <td>creationDate
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>No
   </td>
   <td>No
   </td>
  </tr>
  <tr>
   <td>updateAuthor
   </td>
   <td>No, autopopᵃ   </td>
   <td>Yes
   </td>
   <td>No, autopopᵃ   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>modificationDate
   </td>
   <td>No, autopopᵃ   </td>
   <td>Yes
   </td>
   <td>No, autopopᵃ   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>title
   </td>
   <td>Yesᵇ
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>richText
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
   <td>Yes
   </td>
  </tr>
</table>


ᵃ ```autopop``` means system populates the fields with current system values

ᵇ ```title``` is automatically populated as "Untitled" if left unspecified


#### Use case: setModifiedDate flag

When you update a document with the API, whether it's creation or modification, the document gets updated with your changes and there is an implicit update to two system fields: ```modifiedDate``` and ```updateAuthor```.

This flag allows write access to these two fields: it exists so that tools like a bulk updater can edit fields or other information in the document without the modification date and the modification author getting set to the latest system values. For actions that have the requirement of preserving the ```modifiedDate``` and ```updateAuthor``` fields as is, explicitly pass their previous values along with your document changes and the ```setModifiedDate``` flag  set to ```true```.

##### Sample request

```yaml
    PUT https://aodocs.altirnao.com/api/document/v1
```

```json
    {
        "title": "my new AODocs document",
        "richText": "Hello, world!",
        "creationDate": "123456789000",
        "initialAuthor": "mypersonalemail@gmail.com",
        "updateAuthor": "mypersonal@gmail.com",
        "setModifiedDate": true,
        "modificationDate": "987654321000",
        "libraryId": "RsjaTyH8w59078Zx7Dk",
    }

```


#### Expected formats for system fields


<table>
  <tr>
   <td><strong>TYPE OF SYSTEM FIELD</strong>
   </td>
   <td><strong>EXPECTED API FORMAT</strong>
   </td>
  </tr>
  <tr>
   <td>TEXT (like <code>title</code>)
   </td>
   <td>Text with no HTML parsing; you can add line breaks
   </td>
  </tr>
  <tr>
   <td>RICH TEXT (like <code>richText</code> AKA Description in the UI)
   </td>
   <td>Text that is rendered as HTML
   </td>
  </tr>
  <tr>
   <td>DATETIME (like <code>creationDate</code> and <code>modificationDate</code> )
   </td>
   <td>Unix timestamp in milliseconds since the beginning of 1 January 1970, as a JSON string (will not accept integers)
   </td>
  </tr>
  <tr>
   <td>PERSON (like <code>initialAuthor</code> and <code>updateAuthor</code>)
   </td>
   <td>Any string value; we recommend valid Google account email addresses to benefit from the workflow features on these fields
   </td>
  </tr>
</table>


### Setting custom fields

In a document resource, custom fields are found inside the ```fields``` array.  Custom fields are defined in the document's class when it's created; and you or a client app populate their values when creating or modifying a document.

In order to populate custom fields, you must know the ```fieldId``` of the particular property defined within the target class. You then use it to tell the server which values of this particular property should be set. To do this, populate ```fields[].fieldId``` with your target class's ```fieldId```.

> ⭑  **Note**: Alternatively, you can populate ```fields[].fieldName``` with the target class's ```fieldName```. However, this is **not recommended**, as the name of a field can change.

Once the target class is identified, populate ```fields[].values[]``` with the desired values.


#### Sample request

```yaml
    PUT https://aodocs.altirnao.com/api/document/v1
```

```json
    {
    "title": "my-new-doc-024",
    "libraryId": "RsjaTyH8w59078Zx7Dk",
    "fields": [
     {
      "fieldId": "RxUjYCe8AAx2YAju5NW",
      "values": [
       "a@a.com",
       "b@b.com"
      ]
     }
    ]
    }
```


#### Expected API formats for custom fields


<table>
  <tr>
   <td><strong>TYPE OF CUSTOM FIELD</strong>
   </td>
   <td><strong>EXPECTED JSON FORMAT</strong>
   </td>
   <td><strong>CAN BE MULTIVALUE?</strong>
   </td>
  </tr>
  <tr>
   <td>STRING
   </td>
   <td>A JSON string of alphanumeric and special characters; 400-character limit
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>TEXT
   </td>
   <td>A JSON string with no HTML parsing; you can add line breaks + no limit
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>PERSON
   </td>
   <td>A JSON string  representing a user or group email address (this field type only accepts groups when it is multivalued)
   </td>
   <td>Yes
   </td>
  </tr>
  <tr>
   <td>DATETIME
   </td>
   <td>Unix timestamp in milliseconds since the beginning of 1 January 1970, as a JSON string (will not accept integers)
   </td>
   <td>No
   </td>
  </tr>
  <tr>
   <td>INTEGER
   </td>
   <td>JSON integer values (0, 1, 2, -1,.. limited to +/- 2,147,483,647)
   </td>
   <td>No
   </td>
  </tr>
  <tr>
   <td>DECIMAL
   </td>
   <td>JSON decimal values (0.1, -5.1, 1.655,..) with maximum 3 decimal digits
   </td>
   <td>No
   </td>
  </tr>
  <tr>
   <td>BOOLEAN
   </td>
   <td><code>true</code> or <code>false</code>
   </td>
   <td>No
   </td>
  </tr>
</table>

---
