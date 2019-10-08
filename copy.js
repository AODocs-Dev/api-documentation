let ncp = require('ncp').ncp;

[
  'ao-docs-dev.appspot.com',
  'aodocs-staging.altirnao.com',
  //add new hosts here
]
.forEach(dest => ncp('src', dest));

