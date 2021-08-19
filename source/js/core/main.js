import { createCore, useDefaultLogging } from "../../../node_modules/@eroc/core/dist/core.es.js";

import * as d from "./dependencies.js";

import * as helpTexts from "../helpTexts.js";
import * as xClock from "../../components/xClock/xClock.js";


const core = createCore();
useDefaultLogging(core);


(async () => {
    await core.start(helpTexts);
    await core.start(xClock);

    // here executes before dom99 went through
    // here you cannot use d.elements
    d.start({
        initialFeed: {
            title: `Hello World`,
            superParagraph: `Super Paragraph text set inside main.js`,
        },
    });

    // executes after dom99 went through
    // here you can use d.elements
    d.elements.loadingHint.remove();
})();
