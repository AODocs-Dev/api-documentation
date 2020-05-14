let syncDir = require('sync-directory');

syncDir('aodocs.altirnao.com', '../api-documentation.wiki', {
    exclude: ['navigation.yaml'],
    deleteOrphaned: false
});
//TODO move Guides/00-Getting Started.md to Home.md
//TODO rename the Overview pages with a prefix (their parent folder?)
//TODO prefix all images src's with "https://github.com/AODocs-Dev/api-documentation/blob/master/src"
//TODO Generate the _Sidebar.md file based on the navigation.yaml file