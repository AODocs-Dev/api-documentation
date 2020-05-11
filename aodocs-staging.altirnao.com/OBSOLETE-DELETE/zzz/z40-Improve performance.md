# Improve performance

[Google Drive APIs' improve performance page](https://developers.google.com/drive/api/v3/performance)

* [the `fields` field as described on Google Drive API documentation](https://developers.google.com/drive/api/v3/fields-parameter)
    * You can filter the results by populating the ````fields```` query parameter with ````items(displayName,id,kind),kind```` as follows:

```
fields=items(displayName%2Cid%2Ckind)%2Ckind
```

* batch requests
* other


## Color block test (inline HTML hack, no CSS)

<p style="background-color:#ECEFF1; text-color:red;"> > **Dogfood** </p>

<p style="background-color:#E8EAF6;"> > Key point</p>

<p style="background-color:#E1F5F6;"> > Note</p>

<p style="background-color:#FEE5ED;"> > Caution</p>

<p style="background-color:#FCE8E6;"> > Warning/DON'T</p>

<p style="background-color:#E0F2F1;"> > DO</p>













