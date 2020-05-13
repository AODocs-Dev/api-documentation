let syncDir = require('sync-directory');

[
  'ao-docs-dev.appspot.com',
  'aodocs-staging.altirnao.com',
  //add new hosts here
]
.forEach(dest => syncDir('src', dest, {deleteOrphaned: true}));

