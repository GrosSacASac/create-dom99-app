"use strict";

const {
    textFileContent,
    writeTextInFile,
    copyFile
} = require("utilsac");
const path = require("path");
const cliInputs = process.argv.slice(2);

const skipMinification = false;
const thisName = "html build";
const typeTextHtml = `text/html`;

const prefixFinal = "final-";
// todo use regex or better check for inlineHTMLRuntime.js inside src
const devLoaderString = `<script type="module" src="../tools/inlineHTMLRuntime.js"></script>`

// todo use  or better, check for inlineHTMLdebugHelper.css
const devLoaderDebug = `<link rel="stylesheet" href="../tools/inlineHTMLdebugHelper.css">`;
// todo use this map
const map = {};

const inlineHTML = function (html, baseDir) {
    let newHTML = html;
    const findInlines = RegExp(`<script type="${typeTextHtml}" src="([^"]+)"><\/script>`, `g`);

    const allMatches = [];
    let matches;
    while (matches = findInlines.exec(newHTML)) {
        allMatches.push(matches);
    }
    if (allMatches.length === 0) {
        return Promise.resolve(newHTML);
    }

    return Promise.all(
        allMatches.map(function (match) {
            return textFileContent(path.join(baseDir, match[1]));
        })
    ).then(function (importedHTMLs) {
        return Promise.all(
            importedHTMLs.map(function (importedHTML, i) {
                return inlineHTML(
                  importedHTML,
                  path.dirname(path.join(baseDir, allMatches[i][1]))
                );
            })
        );
    }).then(function (importedHTMLs) {
        importedHTMLs.forEach(function (importedHTML, i) {
            newHTML = newHTML.replace(allMatches[i][0], importedHTML);

        });
    }).catch(function (error) {
        console.error(`
        Could not import file ${error.path}`);
    }).then(function () {
        return newHTML;
    });
};

Promise.all(cliInputs.map(textFileContent))
.then(function (originalHTMLStrings) {
    return Promise.all(originalHTMLStrings.map(function (originalHTMLString, i) {
      const withOutDevloader = originalHTMLString.replace(devLoaderString, ``)
																			 .replace(devLoaderDebug, ``);
      return inlineHTML(withOutDevloader, path.dirname(cliInputs[i]));
    }));
}).then(function (newHTMLStrings) {
    return Promise.all(newHTMLStrings.map(function (newHTMLString, i) {
      const oldPathParsed = path.parse(cliInputs[i]);
      const newPath = path.join(oldPathParsed.dir, `${prefixFinal}${oldPathParsed.base}`);
      return writeTextInFile(
        newPath,
        newHTMLString
      );
    }));

}).catch(function (reason) {
    console.error(`inlineHTML.js failed: ${reason}`);
});
