# Overview

We put the most useful data-handling API methods together into a loose sequence you can follow in the [API portal](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/put).  Or you can pick and choose the parts that help you accomplish your immediate goals with AODocs.

> ⭑   **Note**: You can perform most of the tasks in this tutorial either using the API or on your homepage in the AODocs user interface (UI).  Use the one that suits your needs, or you can do them both to understand how they map to each other.

## Before you begin

If you haven't yet, make sure you familiarize yourself with the [key concepts of the AODocs universe](https://support.aodocs.com/hc/en-us/articles/115005405943-AODocs-basic-terms).  Also, if you don't follow this section in sequence, one page is devoted to help you [create some test files and folders](#heading=h.x1k4y4foz0cu) to work with in your Google Drive: the files are going to become attachments to the AODocs documents you're about to create.

## What you'll do

If you follow the sequence in this section, you'll port some Drive files to become attached to AODocs **documents** inside some AODocs **libraries**.  Once attached, you'll create/add/patch/update/delete **documents**, **attachments**, **properties**, and **metadata**.  Whenever appropriate, for each task, you'll get a link to the specific part of the API portal needed to accomplish the task.

> ⭑   **Note**: We recommend following the sequence as some steps depend on previous steps.

The list of steps is as follows:

*   [Get library and class info](/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/10-Get%20library%20and%20class%20info/00-Overview)
    *   [Libraries](/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/10-Get%20library%20and%20class%20info/10-Libraries)
        * List all available AODocs libraries (full)
        * List all available AODocs libraries (plain)
        * Get a specific library by ID
    *   [Classes](/docs/aodocs-staging.altirnao.com/1/c/Guides/30-Manage%20AODocs%20documents/10-Get%20library%20and%20class%20info/20-Classes)
        * List classes (to find target classes for your documents)
        * Get a specific class by ID
*   Create, modify, delete documents
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

Let's [get started](docs/src/Managing AODocs data/01-Getting required IDs/Libraries/02-Libraries-intro)!
