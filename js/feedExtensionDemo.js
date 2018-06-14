import {createFeedExtension} from "./feedExtension.js";
import d from "../node_modules/dom99/built/dom99Module.js";
window.d = d;
const newFeed = createFeedExtension(d, [
  function (d, startPath, data) {
    if (startPath === "users") {
      if (data.length === 0) {
        d.elements[startPath].classList.add("empty");
      } else {
        d.elements[startPath].classList.remove("empty");
      }
    }
  },
  function (d, startPath, data) {
    if (startPath === "theme") {
      if (data === "day") {
        document.body.classList.remove("night");
      } else {
        document.body.classList.add("night");
      }
    }
  }
]);
d.feed = newFeed;
d.start();

d.feed("users", []);
d.feed("theme", "night");

setTimeout(function () {
  newFeed("users", ["me", "you", "him"]);
}, 5000);
