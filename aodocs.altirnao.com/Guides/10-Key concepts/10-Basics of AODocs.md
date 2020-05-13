# Basics of AODocs

## Prerequisites

To proceed, you need to have an AODocs licence, have access to an AODocs domain, and be familiar with the basics of interacting with AODocs through the [AODocs user interface](https://aodocs-staging.altirnao.com/) (UI). Most of the tasks we explain here that a client app can do with the API can also be done by a user in the user interface as explained in the [AODocs Knowledge Base](https://support.aodocs.com/hc/en-us).


## AODocs and Google Drive

AODocs is an enterprise document management system that exists as a layer on top of Google Drive to enable the management of Drive files. [Google Drive remains the file storage solution](https://support.aodocs.com/hc/en-us/articles/217739043-Switch-between-the-AODocs-interface-and-Google-Drive), but AODocs enables additional search, security, control, customizability features  on top of Drive files and folders. It also provides [advanced workflow capabilities](https://support.aodocs.com/hc/en-us/articles/205749346-What-are-workflows-). This is done via the concept of an AODocs document, which is a grouping of metadata that acts as a fine-grained wrapper for Drive files. Furthermore, concepts like [library, folder, and class](https://support.aodocs.com/hc/en-us/articles/115005405943-AODocs-basic-terms) play a supporting role to documents within the AODocs ecosystem.


## AODocs hierarchy and key concepts

AODocs documents exist in the following hierarchy:

*   **domain**
    *   **library** (three available types: [Team Folder/Secured Folder/DMS](https://support.aodocs.com/hc/en-us/articles/206115120))
        *   folder (mandatory or optional depending on type of library)
            *   document class/documentType (two names, UI and API, for the same concept)
                *   **document** (of a specific type and library)
                    *   System properties
                    *   Sections (containers for custom properties)
                        *   Custom properties
                    *   Rich text / description
                    *   **Attachments** (a reference to a Drive file)
                    *   Related documents
                    *   Versions

A **domain** contains **libraries** (of 3 types) that contain **documents** (of different types) that have zero, one, or more **attachments** (references to managed **Drive files**) depending on the library type. Read more about [Recommended limits in AODocs](https://support.aodocs.com/hc/en-us/articles/115005944243).


### Library types and attachment limits

An AODocs **domain** contains libraries of **three types**:


* **Team Folders (TF)**: each document must have one and only one attachment
* **Secured Folders (SF)**: same as TF — one and only one attachment
* **Document Management libraries (DMS)**: a document can have **any number of attachments**: zero, one, or more

**Libraries** contain **documents** of unlimited types called **classes** (or `documentType` in the API). An AODocs document is not the colloquial sense of the word "document". Instead, it is a versioned collection of predefined, structured metadata divided into logical groupings like System and Custom properties, along with a rich-text description, a list of related documents, as well as **attachments** (references to managed Drive files).

The **number of Drive files** you can **attach to a document** in a specific type of library is a **critical concept in AODocs**. In **TF/SF**, each document _must_ have **one and only one attachment**. In **DMS** libraries, each document _can_ have **any number of attachments**: zero, one, or more.


### Attachment ownership transfer

When you attach a Drive file to an AODocs document, you create a reference to the file inside the document. The file remains in Drive, but the ownership of the file transfers from you to the **AODocs storage account**, which in turn shares the file to you with specific permissions. An AODocs storage account is a Google account belonging to your GSuite domain. The company owns the file, but it allows AODocs to manage and organize your Drive files in a predefined way. **A Drive file can be attached to one and only one AODocs document** (trying to attach it to another document will fail).

> ⭑ **Note**: Each library is associated with a specific storage account, and that storage account can be associated with multiple libraries.

Read more about the storage account in the Knowledge Base: [What is the AODocs storage account?](https://support.aodocs.com/hc/en-us/articles/205648334-What-is-the-AODocs-storage-account-)


### Versions

Every time a version of a document is created, AODocs saves a version of the document metadata and its attachments that can be restored later as a new version. Meanwhile, attachments themselves are versioned using the built-in file revision capabilities of Drive.


### Folders

Structurally, a **library** is like a folder in the sense that it is the top-level (root) container of various types of **documents**. This is organized into a hierarchy of zero or more "subfolder" containers.

A folder hierarchy is mandatory in TF/SF: the library mirrors the structure of what's inside your corresponding Drive folder. In DMS, however, folders are optional: the functionality can be turned on or off depending on whether you need to put in place a folder-like hierarchy. You can toggle this in each class's [Advanced settings](https://support.aodocs.com/hc/en-us/articles/360030865991).


### Default library class

A library's whole purpose is to contain documents. In order to do so, it has to declare the types (classes) of documents that can be created within it. One of those types is the **default class**: if you ask for a document to be created in a specific library but don't provide a class, that library's default class gets used as the source class for the new document.


### Default document title

For any newly created document, if you don't specify a **title** then the system assigns to it the default title of "**Untitled**".

