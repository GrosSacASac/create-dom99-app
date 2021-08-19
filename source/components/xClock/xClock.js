export { dateAndTimeString, start, stop };
import * as d from "../../js/core/dependencies.js";


const updateTime = () => {
    d.feed(`time`, dateAndTimeString());
};

const dateAndTimeString = () => {
    return new Date().toLocaleString();
};

const start = () => {
    const SECOND = 1000;
    updateTime();
    const intervalId = setInterval(() => {
        updateTime();
    }, SECOND);
    return intervalId;
};

const stop = (intervalId) => {
    clearInterval(intervalId);
};
