export { start };
import * as d from "./dependencies.js";
import { helpText } from "./settings.js";

const showHelp = function () {
    d.elements.showHelp.remove();
    d.feed(`helpText`, helpText);
    console.log("hi");
};

const start = function () {
    d.functions.showHelp = showHelp;
};
