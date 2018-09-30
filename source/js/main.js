import * as d from "../../node_modules/dom99/built/dom99ES.js";
import {helpText} from "./helpTexts.js";


const showHelp = function () {
  d.elements.showHelp.remove();
  d.feed(`helpText`, helpText);
};


// here executes before dom99 went through
// here you cannot use d.elements

d.start(
    {
        showHelp
    }, // functions
    {
        title: `Hello World`
    }, // initial feed
    document.body, // start Element
    function () {
        // function executes after dom99 went through
        // here you can use d.elements

        d.elements.loadingHint.remove();
});
