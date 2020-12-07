import * as d from "dom99";
const timeOut = 5000;
window.d = d;

d.plugin({
    type: `variable`,
    plugin: function (startPath, data) {
        if (startPath === `users`) {
            if (data.length === 0) {
                d.elements[startPath].classList.add(`empty`);
            } else {
                d.elements[startPath].classList.remove(`empty`);
            }
        }
    },
});

d.plugin({
    type: `variable`,
    plugin: function (startPath, data) {
        if (startPath === `theme`) {
            if (data === `day`) {
                document.body.classList.remove(`night`);
            } else {
                document.body.classList.add(`night`);
            }
        }
    },
});


d.start();

d.feed(`users`, []);
d.feed(`theme`, `night`);

setTimeout(function () {
    d.feed(`users`, [`me`, `you`, `him`]);
}, timeOut);
