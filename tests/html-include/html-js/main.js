//main.js
import * as d from "../../../node_modules/dom99/source/dom99.js";

d.start();

d.feed({
    users:
        [
            {
                picture: `boss.jpg`,
                bio: `Loves biking and skating`,
            },
            {
                picture: `sister.jpg`,
                bio: `Drinks tons of café.`,
            },
        ]
});
