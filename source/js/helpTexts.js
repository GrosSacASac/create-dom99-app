export { start };
import * as d from "./core/dependencies.js";
import { helpText } from "./settings/settings.js";

const showHelp = function () {
    d.elements.showHelp.remove();
    d.feed(`helpText`, helpText);
};

const start = function () {
    d.functions.showHelp = showHelp;
};