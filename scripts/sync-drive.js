//TODO generate a HTML file for each Markdown file
//TODO import the HTML files as Google Docs in a Shared Drive (only if changed)
//TODO archive the previous version if replaced (check if unresolved comments?)
//TODO store the corresponding ids in a readable structure
let commonmark = require('commonmark');

var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

function toHtml(markdownContent) {
    var parsed = reader.parse(markdownContent);
    return writer.render(parsed);
}
