//main.js
import * as d from "../../../node_modules/dom99/source/dom99.js";
import {idGenerator} from "../../../node_modules/dom99/source/idGenerator.js";


d.plugin({
    type: `cloned`,
    plugin: function (pathInStart) {
        if (!pathInStart.includes(`questions`)) {
            return;
        }
        const newId = idGenerator();
        d.element(pathInStart, `input`).setAttribute(`id`, newId);
        d.element(pathInStart, `label`).setAttribute(`for`, newId);
    },
});
d.start();


d.feed({
    questions:
        [
            {
                label: `Age`,
                value: `18`,
            },
            {
                label: `City`,
                value: `Luxembourg`,
            },
        ],
});
d.feed({
    custom:
        [
            {
                e: `x`,
            },
            {
                r: `z`,
            },
        ],
});

window.d = d;
