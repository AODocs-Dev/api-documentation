# Test page (markdown syntax, links, etc.)

Test relative and root-relative links to [https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/Guides/00-Getting%20Started](https://api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/Guides/00-Getting%20Started):

nothing below works either clicking or trying to download:

[/Guides/00-Getting started.md](/Guides/00-Getting%20Started)

[../../Guides/00-Getting started.md](../../Guides/00-Getting%20Started)

[../Guides/00-Getting started.md](../Guides/00-Getting%20Started)

[./Guides/00-Getting started.md](./Guides/00-Getting%20Started)

---

[/dls/00-Overview.md](/dls/00-Overview)

[../../dls/00-Overview.md](../../dls/00-Overview)

[../dls/00-Overview.md](../dls/00-Overview)

[./dls/00-Overview.md](./dls/00-Overview)


---

[/dls/tree.txt](/dls/tree.txt)

[../../dls/tree.txt](../../dls/tree.txt)

[../dls/tree.txt](../dls/tree.txt)

[./dls/tree.txt](./dls/tree.txt)



[api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/dls/tree.txt](api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/dls/tree.txt)

[//api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/dls/tree.txt](api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/dls/tree.txt)

[api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/dls/tree.txt](api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/dls/tree.txt)

[//api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/dls/tree.txt](api.aodocs-staging.com/docs/aodocs-staging.altirnao.com/1/c/dls/tree.txt)


---

[/dls/test.json](../../dls/test.json)

[../../dls/test.json](../../dls/test.json)

[../dls/test.json](../../dls/test.json)

[./dls/test.json](../../dls/test.json)


---

[../../dls/api.png as a link](../../dls/api.png "../../dls/api.png as a link")

`WORKS: ../../dls/api.png as an image`:

![../../dls/api.png as an image](../../dls/api.png "../../dls/api.png as an image")

---

[/dls/api.png as a link](/dls/api.png "/dls/api.png as a link")


`WORKS: /dls/api.png as an image`:

![/dls/api.png as an image](/dls/api.png "/dls/api.png as an image")

---

## Direct BLOB link {: #direct-blob-link }

![direct blob link as an image, minus the blob part: https://api.aodocs-staging.com/31697444-378d-49a9-84a2-393731a1cd68](https://api.aodocs-staging.com/31697444-378d-49a9-84a2-393731a1cd68)

[direct blob link as a link, minus the blob part: https://api.aodocs-staging.com/31697444-378d-49a9-84a2-393731a1cd68](https://api.aodocs-staging.com/31697444-378d-49a9-84a2-393731a1cd68)


![direct blob link as an image, with the blob part: blob:https://api.aodocs-staging.com/31697444-378d-49a9-84a2-393731a1cd68](blob:https://api.aodocs-staging.com/31697444-378d-49a9-84a2-393731a1cd68)

[direct blob link as a link, with the blob part: blob:https://api.aodocs-staging.com/31697444-378d-49a9-84a2-393731a1cd68](blob:https://api.aodocs-staging.com/31697444-378d-49a9-84a2-393731a1cd68)

## formula test

$-b \pm \sqrt{b^2 - 4ac} \over 2a$

## icon test

<walkthrough-inline-icon-name>cloud-shell-icon</walkthrough-inline-icon-name>
