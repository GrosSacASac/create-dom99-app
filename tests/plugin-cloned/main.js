//main.js
import {d, plugin} from "../../../node_modules/dom99/source/dom99.js";
import {idGenerator} from "./idGenerator.js";

plugin({
	type: `cloned`,
	plugin: function (pathInStart) {
		const afterLabelInputCreated = function() {
			const newId = idGenerator();
			d.elements[d.contextFromArray([pathInStart, `input`])].setAttribute('id', newId);
			d.elements[d.contextFromArray([pathInStart, `label`])].setAttribute('for', newId);
		};
		afterLabelInputCreated();
	}
});
d.start();

const afterLabelInputCreated = function () {
	const newId = idGenerator();
	d.elements[`input`].id = newId
	d.elements[`label`].for = newId
};

d.feed({users :
    [
        {
            picture: "boss.jpg",
            bio: "Loves biking and skating"
        },
        {
            picture: "sister.jpg",
            bio: "Drinks tons of café."
        }
]});
