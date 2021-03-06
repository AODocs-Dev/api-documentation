const assert = require('assert').strict;
const yaml = require('js-yaml');
const fs = require('fs');
const commonmark = require('commonmark');
const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

const services = [
  'ao-docs-dev.appspot.com',
  'aodocs-staging.altirnao.com',
  'aodocs.altirnao.com',
  //add new hosts here
];

function walkNode(folderPath, navigationNode, onFile) {
  let dirEnts = fs.readdirSync(`src/${folderPath}`, {withFileTypes: true});
  let folders = [];
  let files = [];
  dirEnts.forEach(dirEnt => {
    if (dirEnt.isDirectory()) 
      folders.push(dirEnt.name) 
    else 
      files.push(dirEnt.name)
  });
  let folderNames = Object.keys(navigationNode.folders || {});
  navigationNode.ordering.forEach(section => {
    if (folderNames.includes(section)) {
      assert(folders.includes(section), `parent section ${section} does not have corresponding folder`);
    } else {
      assert(files.includes(`${section}.md`), `leaf section ${section} does not have corresponding md file`);
      onFile(folderPath, section);
    }
  })
  folderNames.forEach(folder => walkNode(`${folderPath}/${folder}`, navigationNode.folders[folder], onFile));
}

function generateHtml(folderPath, section) {
  let markdownContent = fs.readFileSync(`src/${folderPath}/${section}.md`, 'utf8');
  let parsed = reader.parse(markdownContent);
  let body = writer.render(parsed);
  let finalFolder = 'html/' + folderPath.replace(/\/\d{2}-/g, '/');
  fs.mkdirSync(`${finalFolder}`, {recursive: true});
  let finalSection = section.replace(/^\d{2}-/, '');
  //inline images
  body = body.replace(/<img src="\/img\/([^"]+)"/g, (match, image) => {
    let imageAsBase64 = fs.readFileSync(`src/img/${image}`, 'base64');
    //16.5 cm is the default available size in a Google Doc
    return `<img src="data:image/gif;base64,${imageAsBase64}" style="width: 16.5cm"`;
  });
  //replace links with absolute URL to staging
  body = body.replace(/href="\/docs\//g, 'href="https://api.aodocs-staging.com/docs/');
  fs.writeFileSync(`${finalFolder}/${finalSection}.html`,
      `<html lang="en"><head><meta charset="UTF-8"><title>${finalSection}</title></head><body>${body}</body></html>`);
}

function copyToWiki(folderPath, section) {
  let finalFolder = 'wiki/' + folderPath.replace(/\/\d{2}-/g, '/');
  fs.mkdirSync(`${finalFolder}`, {recursive: true});
  let finalSection = section;
  if (finalSection === '00-Overview') {
    finalSection = folderPath.substring(folderPath.lastIndexOf('/') + 1);
  }
  finalSection = finalSection.replace(/^\d{2}-/, '');
  fs.mkdirSync(`${finalFolder}`, {recursive: true});
  let original = fs.readFileSync(`src/${folderPath}/${section}.md`, {encoding: "utf8"});
  let replaced = original.replace(/\(\/img\/(.+)\)/g, 
      '(https://github.com/AODocs-Dev/api-documentation/blob/master/src/img/$1)');
  //replace Guide pages with internal link
  replaced = replaced.replace(/\(\/docs\/aodocs-staging.altirnao.com\/1\/c\/Guides\/([^/)]+\/)*([^)]+)\)/g, 
      '(https://github.com/AODocs-Dev/api-documentation/wiki/$2)');
  //replace other links with absolute URL to prod
  replaced = replaced.replace(/\(\/docs\/aodocs-staging.altirnao.com(\/1\/.+)\)/g,
      '(https://api.aodocs.com/docs/aodocs.altirnao.com$1)');
  fs.writeFileSync(`${finalFolder}/${finalSection}.md`, replaced.replace(/\/\d{2}-/g, '/'));
}

function checkLinks(folderPath, section, navigation) {
  let original = fs.readFileSync(`src/${folderPath}/${section}.md`, {encoding: "utf8"});
  original.replace(/\(\/docs\/aodocs-staging.altirnao.com\/1\/([^)]+)\)/g, (match, suffix) => {
    if (suffix.startsWith('c/Guides/')) {
      let node = navigation;
      let elements = suffix.split('/')
      elements.shift();
      elements.shift();
      while (elements.length !== 0) {
        if (!node) {
          assert(false, `${section} has an invalid link: ${match}`);
        }
        let element = elements[0].replace(/%20/g, ' ');
        assert(node.ordering.includes(element), `${section} has an invalid link: ${match}`);
        node = node.folders && node.folders[element];
        elements.shift();
      }
    }
    return match;
  })
}

function checkImages(folderPath, section) {
  let original = fs.readFileSync(`src/${folderPath}/${section}.md`, {encoding: "utf8"});
  original.replace(/\(\/img\/(.+)\)/g, (match, image) => {
    assert(fs.existsSync(`src/img/${image}`), `${section} has an invalid image: ${match}`);
    return match;
  });
}

function copyToService(folderPath, section, service) {
  let finalFolder = folderPath.replace(/\/\d{2}-/g, '/');
  fs.mkdirSync(`${service}/${finalFolder}`, {recursive: true});
  let finalSection = section.replace(/\d{2}-/, '');
  let original = fs.readFileSync(`src/${folderPath}/${section}.md`, {encoding: "utf8"});
  let replaced = original.replace(/\(\/docs\/aodocs-staging.altirnao.com\/1\/([^)]+)\)/g, 
      (match, suffix) => `(/docs/${service}/1/${suffix.replace(/\/\d{2}-/g, '/')})`);
  fs.writeFileSync(`${service}/${finalFolder}/${finalSection}.md`, replaced);
}

//cleanup
services.forEach(service => fs.rmdirSync(service, {recursive: true}));
fs.rmdirSync("html", {recursive: true});
fs.rmdirSync("wiki/Guides", {recursive: true});

let navigation = yaml.safeLoad(fs.readFileSync('src/navigation.yaml', 'utf8'));

walkNode("Guides", navigation.folders["Guides"], (folderPath, section) => {
      checkLinks(folderPath, section, navigation.folders["Guides"]);
      checkImages(folderPath, section);
      generateHtml(folderPath, section);
      copyToWiki(folderPath, section);
      services.forEach(service => {
        copyToService(folderPath, section, service, navigation.folders["Guides"]);
      });
    }
);

function printSidebarLevel(node, level) {
  let result = '';
  node.ordering.forEach((section, index) => {
    let folders = node.folders  && node.folders[section]
    let prefix = ' '.repeat(level * 2);
    section = section.replace(/\d{2}-/, '');
    if (section === 'Overview') {
      return;
    }
    let suffix = section.replace(/ /g, '%20');
    let url = `https://github.com/AODocs-Dev/api-documentation/wiki/${suffix}`;
    if (folders) {
      if (folders.ordering.includes('00-Overview')) {
        result += `${prefix}- [${section}](${url})\n`
      } else {
        result += `${prefix}- ${section}\n`;
      }
      result += printSidebarLevel(folders, level + 1);
    } else {
      if (index === 0 && level === 0) {
        url = 'https://github.com/AODocs-Dev/api-documentation/wiki/';
        fs.copyFileSync(`wiki/Guides/${section}.md`, 'wiki/Home.md')
      }
      result += `${prefix}- [${section}](${url})\n`
    }
  });
  return result;
}

fs.writeFileSync('wiki/_Sidebar.md', 
    printSidebarLevel(navigation.folders["Guides"], 0));

let finalNav = yaml.safeDump(navigation).replace(/\d{2}-/g, '');
services.forEach(service => {
  fs.writeFileSync(`${service}/navigation.yaml`, finalNav);
  fs.mkdirSync(`${service}/img`);
  fs.readdirSync('src/img').forEach(img => fs.copyFileSync(`src/img/${img}`, `${service}/img/${img}`));
});