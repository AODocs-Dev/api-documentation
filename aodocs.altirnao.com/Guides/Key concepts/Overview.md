# Key concepts

AODocs APIs let you _programmatically_ access, manage, and configure AODocs objects and their associated metadata, including libraries, classes, documents, attachments, and properties.

Most of the features available to users accessing the AODocs UI through a web browser are also available with the AODocs API.

The APIs also let you interact indirectly with some AODocs-related [Google Drive API](https://developers.google.com/drive/api/v3/about-sdk) functionality, including some mediated access to files and folders in Drive.

The following diagram shows the interactions between the major components:

![architecture-diagram.png](/img/architecture-diagram.png)

**Figure 1**: AODocs architecture diagram (AODocs components in blue, Google components in gray)

The following terms define key components shown in Figure 1:

**_Google Drive_**

Google's cloud file storage service that provides users with a personal storage space, called _My Drive_, and the option to access collaborative shared folders, called _shared drives_.

**_Google Drive API_**

The REST API that allows you to leverage Google Drive storage from within your app.

**_AODocs API_**

The REST API that allows you to leverage AODocs functionality from within your app.

**_Third-party app_**

An app that leverages AODocs APIs (and, indirectly, Google Drive APIs) as its document management and file storage solution.

**_AODocs Web UI_**

The AODocs user interface used by an end-user to manage AODocs documents and Google Drive files attached to them.

**_Google Drive Customer Files_**

A Google Drive storage location that a specific user owns. Ownership of the content of the files stored on Google Drive remains specific to an individual user, unless the file gets attached to an AODocs document, at which point the ownership is transferred to the corporate account.

**_OAuth 2.0_**

The protocol that Google Drive API requires to authenticate your app users. If your application uses [Google Sign-in](https://developers.google.com/identity/sign-in/web/sign-in), it handles the OAuth 2.0 flow and application access tokens.


## Next steps

In the _Key concepts_ section you can read more about [AODocs basics](/docs/aodocs.altirnao.com/1/c/Guides/Key%20concepts/Basics%20of%20AODocs), as well as about leveraging [concepts and components of AODocs APIs](/docs/aodocs.altirnao.com/1/c/Guides/Key%20concepts/Basics%20of%20AODocs%20APIs) to accomplish your goals.
