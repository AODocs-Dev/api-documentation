# [DRAFT] Overview

## Methods

Generally, the methods work as follows:
*   GET (gets single or list)
*   POST (creates)
*   DELETE (deletes)
*   PATCH (updates). we don't do UPDATE, 'cause PATCH suffices [but under documentId POST updates?

## Global fields

Global fields
*   domain
*   securityCode (link to authentication article)
*   <span style="text-decoration:underline;">fields</span> (link to performance article)

## APIs of note


The most useful and commonly used AODocs APIs

---

useful format?

[File | Apps Script API](https://developers.google.com/apps-script/api/reference/rest/v1/File)

---

### [documentId](https://drive.google.com/a/altirnao.com/open?id=11PiT5MuYn6BXiJ5dh_PSW2LK5eo4HfMMRYbEFg4Up8s)

Operate on AODocs documents.


### [search](https://docs.google.com/document/d/1QAIPQZWM_5iQolBjO0_5mBgGyZRde4_4_9vD0DD4MHI/edit)

Search AODocs documents and libraries.


### category



*   AODocs categories
*   Read more (link to full document API: category)


### referenceCatalog



*   AODocs reference catalogs (**API-only**)
*   Read more (link to full document API: referenceCatalog)


### relation



*   x
*   Read more (link to full document API: relation)


### documentType



*   AODocs document classes
*   Read more (link to full document API: documentType)


### workflow



*   AODocs workflows
*   Read more (link to full document API: workflow)


### library



*   AODocs libraries
*   Read more (link to full document API: library)


### job



*   x
*   Read more (link to full document API: job)


### view



*   x
*   Read more (link to full document API: view)


### folder



*   AODocs storage account folders (**TF/SF-only**)
*   Read more (link to full document API: folder)
*   The three places where you can (and sometimes must) enable DMS folder stuff are:
    *   Class mgmt
    *   Security tab > Inherited permissions: from class vs. from folder
    *   Advanced tab > Folders: allow vs. disallow


### user



*   AODocs users and **Google Groups **a
    *   getCurrentUser (and also domain, groups, defaultDomain, availableDomains, lastLogin, lastEdit, superAdmin, canCreateLibraries, external, impersonable
*   Read more (link to full document API: user)


### domain



*   AODocs domain actions (**domain admins only**)
*   Read more (link to full document API: domain)
