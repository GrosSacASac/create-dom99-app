/*

*/

"use strict";

const {
    textFileContentPromiseFromPath,
    writeTextInFilePromiseFromPathAndString,
    copyFile
} = require("utilsac");

const skipMinification = false;


const thisName = "html build";


const INDEX_PATH = "index.html";
const BUILT_PATH = "final.html";
const devLoaderString = `<script type="module" src="devLoader.js"></script>`;
// todo use this map
const map = {};

const inlineHTML = function (html) {
    let newHTML = html;
    const findInlines = /<script type="text\/html" data-inline src="([^"]+)"><\/script>/g;
    
    const allMatches = [];
    let matches;
    while(matches = findInlines.exec(newHTML)) {
        allMatches.push(matches);
    }
    if (allMatches.length === 0) {
        return Promise.resolve(newHTML);
    }
    
    return Promise.all(
        allMatches.map(function (match) {
            return textFileContentPromiseFromPath(match[1]);
        })
    ).then(function (importedHTMLs) {
        return Promise.all(
            importedHTMLs.map(function (importedHTML) {
                return inlineHTML(importedHTML);
            })
        );
    }).then(function (importedHTMLs) {
        importedHTMLs.forEach(function (importedHTML, i) {
            newHTML = newHTML.replace(allMatches[i][0], importedHTML);
        
        });
    }).catch(function (error) {
        console.log(error);
        console.log(`
        Could not import file ${error.path}`);
    }).then(function () {
        return newHTML;            
    });
};

Promise.all([
    textFileContentPromiseFromPath(INDEX_PATH),
]).then(function ([indexHTMLString]) {
    const withOutDevloader = indexHTMLString.replace(devLoaderString, ``);;    
    return inlineHTML(withOutDevloader);
    
}).then(function (newHTML) {    
    return writeTextInFilePromiseFromPathAndString(BUILT_PATH, newHTML);
}).catch(function (reason) {
    const errorText = thisName + " failed: " + String(reason);
    console.log(errorText);
    throw new Error(errorText);
});

