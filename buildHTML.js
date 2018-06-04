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

Promise.all([
    textFileContentPromiseFromPath(INDEX_PATH),
]).then(function ([indexHTMLString]) {
    let newIndex = indexHTMLString;
    
    const regularExpression = /<script type="text\/html" data-inline src="([^"]+)"><\/script>/g;
    
    const allMatches = []
    let matches = true;
    while(matches = regularExpression.exec(indexHTMLString)) {
        allMatches.push(matches);
        
    }
    if (!allMatches.length) {
        return;
    }
    
    return Promise.all(
        allMatches.map(function (match) {
            return textFileContentPromiseFromPath(match[1]);
        })
    ).then(function (importedHTMLs) {
        importedHTMLs.forEach(function (importedHTML, i) {
            newIndex = newIndex.replace(allMatches[i][0], importedHTML);
        });
    }).catch(function (error) {
        console.log(error);
        console.log(`
        Could not import file ${error.path}`);
    }).then(function () {
        if (newIndex === indexHTMLString) {
            //console.log(indexHTMLString);
            return;
        }
        newIndex = newIndex.replace(devLoaderString, ``);
        return writeTextInFilePromiseFromPathAndString(BUILT_PATH, newIndex);    
    });
    
}).then(function () {
    

}).catch(function (reason) {
    const errorText = thisName + " failed: " + String(reason);
    console.log(errorText);
    throw new Error(errorText);
});

