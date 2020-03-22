# Basics of AODocs

## Prerequisites

To proceed, you have to have an AODocs licence, and be familiar with the basics of interacting with AODocs through the UI.  The [AODocs Knowledge Base](https://support.aodocs.com/hc/en-us) explains in detail how to accomplish most of the tasks you will now perform with the API.


## AODocs hierarchy and key concepts

AODocs documents exist in the following hierarchy:

* **domain**
    * **library** (TF/SF/DMS)
        * (folder)
            * class/documentType
                * **document** (of a specific type and library)
                    * System properties
                    * Custom properties
                        * Sections (containers for custom properties)
                    * Rich text / description
                    * **Attachments** (a reference to a Drive file)
                    * Related documents

A **domain** contains **libraries** (of 3 types) that contain **documents** (of unlimited types) that have zero, one, or more **attachments** (links to **Drive files**) depending on the library type.


### Library types and attachment limits

An AODocs **domain** contains libraries of **three types**:



* **Team Folders (TF)**: each document must have one and only one attachment
* **Secured Folders (SF)**: same as TF — one and only one attachment
* **Document Management libraries (DMS)**: a document can have **any number of attachments**: zero, one or more

**Libraries** contain **documents** of unlimited types called **classes** (or documentType in the API).  An AODocs document is not the colloquial sense of the word "document".  Instead, it is a versioned collection of predefined, structured metadata divided into logical groupings like System and Custom properties, with a rich-text description, a list of related documents, and **attachments** (links to Drive files).

The **number of Drive files** you can **attach to a document** in a specific type of library is a **critical concept in AODocs**. In **TF/SF**, each document _must_ have **one and only one attachment**. In **DMS** libraries, each document _can_ have **any number of attachments**: zero, one or more.


### Attachment ownership transfer

When you attach a Drive file to an AODocs document, the ownership of the file transfers from the original owner to the corporate owner.


### Attachment versioning

Attachments have their own concept of versioning depending on whether or not it's a Drive-native file.


### Folders

Structurally, a **library** is like a folder in the sense that it is the top-level (root) container of various types of **documents**.  This is organized into a hierarchy of zero or more "subfolder" containers.

A folder hierarchy is mandatory in TF/SF: the library mirrors the structure of what's inside your corresponding Drive folder.  In DMS, however, folders are optional: the functionality can be turned on or off depending on whether you need to put in place a folder-like hierarchy.  You can toggle this in each class's Advanced settings.


### Default library class

A library's whole purpose is to contain documents.  In order to do so, it has to declare the types (classes) of documents that can be created within it.  One of those types is the **default class**: if you ask for a document to be created in a specific library but don't provide a class, that library's default class gets used as the template for the new document.


### Default document title

For any newly created document, if you don't specify a **title** then the system assigns to it the default title of "**Untitled**".

