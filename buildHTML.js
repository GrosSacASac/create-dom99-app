/*

*/

"use strict";

const {
    textFileContentPromiseFromPath,
    writeTextInFilePromiseFromPathAndString,
    copyFile
} = require("utilsac");
const path = require("path");

const cliInputs = process.argv.slice(2); // command line inputs

const skipMinification = false;


const thisName = "html build";


const prefixFinal = "final-";
const devLoaderString = `<script type="module" src="devLoader.js"></script>`;
// todo use this map
const map = {};

const inlineHTML = function (html, baseDir) {
    let newHTML = html;
    const findInlines = /<script type="text\/html" data-inline src="([^"]+)"><\/script>/g;
    
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
            return textFileContentPromiseFromPath(path.join(baseDir, match[1]));
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
        console.log(`
        Could not import file ${error.path}`);
    }).then(function () {
        return newHTML;            
    });
};

Promise.all(cliInputs.map(textFileContentPromiseFromPath)
).then(function (originalHTMLStrings) {
    return Promise.all(originalHTMLStrings.map(function (originalHTMLString, i) {
      const withOutDevloader = originalHTMLString.replace(devLoaderString, ``);;    
      return inlineHTML(withOutDevloader, path.dirname(cliInputs[i]));
    }));
}).then(function (newHTMLStrings) {    
    return Promise.all(newHTMLStrings.map(function (newHTMLString, i) {
      const oldPathParsed = path.parse(cliInputs[i]);
      const newPath = path.join(oldPathParsed.dir, `${prefixFinal}${oldPathParsed.base}`);
      return writeTextInFilePromiseFromPathAndString(
        newPath,
        newHTMLString
      );
    }));
    
}).catch(function (reason) {
    const errorText = thisName + " failed: " + String(reason);
    console.log(errorText);
});

