# Overview

We put the most useful API methods together into a sequence you can follow in the [API portal](/docs/aodocs-staging.altirnao.com/1/routes/library/v1/put) to acquire the know-how needed to accomplish the most common data-handling goals, as well as to gain the confidence to tackle more advanced API tasks, including configuration and administration.

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

Let's [get started](docs/src/Managing AODocs data/01-Getting required IDs/Libraries/02-Libraries-intro)!
