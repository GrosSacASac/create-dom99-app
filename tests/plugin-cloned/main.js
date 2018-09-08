//main.js
import * as d from "../../../node_modules/dom99/built/dom99ES.js";

d.plugin({
	type: `cloned`,
	plugin: function (pathInStart,z) {
		if (!pathInStart.includes("questions")) {
			return;
		}
		const newId = d.idGenerator();
		d.element(pathInStart, `input`).setAttribute('id', newId);
		d.element(pathInStart, `label`).setAttribute('for', newId);
	}
});
d.start();


d.feed({questions:
    [
        {
            label: "Age",
            value: "18"
        },
        {
			label: "City",
            value: "Luxembourg"
        }
]});
d.feed({custom:
    [
        {
            e: "x"
        },
        {
			r: "z"
        }
]});

window.d = d;
