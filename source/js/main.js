import * as d from "../../node_modules/dom99/built/dom99ES.js";
import {helpText} from "./helpTexts.js";
import {updateTime} from "./xClock.js";


const showHelp = function () {
  d.elements.showHelp.remove();
  d.feed(`helpText`, helpText);
};


// here executes before dom99 went through
// here you cannot use d.elements

d.start(
    document.body, // start Element
    {
        title: `Hello World`,
        superParagraph: `Super Paragraph text`
    }, // initial feed
    {
        showHelp
    }, // functions
    function () {
        // function executes after dom99 went through
        // here you can use d.elements

        d.elements.loadingHint.remove();
        
        setInterval(() => {
            updateTime();
        }, 1000);
});
