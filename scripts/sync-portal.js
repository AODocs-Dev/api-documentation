let syncDir = require('sync-directory');

[
  'ao-docs-dev.appspot.com',
  'aodocs-staging.altirnao.com',
  'aodocs.altirnao.com',
  //add new hosts here
]
.forEach(dest => {
  syncDir('src', dest, {deleteOrphaned: true});
  //TODO check links, host, images and other things to validate
  //TODO add the page title as header 
  //TODO remove number prefixes on folders and files
  //TODO add footer for feedback, based on env
});
