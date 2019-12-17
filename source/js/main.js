import { Core, ALL } from "../../node_modules/@eroc/core/dist/core.es.js";

import * as d from "./dependencies.js";

import * as helpTexts from "./helpTexts.js";
import * as xClock from "./xClock.js";


const core = new Core();

// listen for all events
core.on(ALL, ({ name, data, time }) => {
    const timeString = new Date(time).toISOString();
    console.debug(`${timeString} event ${String(name)} with data`, data);
});
(async () => {
    await core.start(helpTexts);
    await core.start(xClock);

    // here executes before dom99 went through
    // here you cannot use d.elements
    d.start({
        initialFeed: {
            title: `Hello World`,
            superParagraph: `Super Paragraph text`,
        },
    });

    // executes after dom99 went through
    // here you can use d.elements
    d.elements.loadingHint.remove();
})();
