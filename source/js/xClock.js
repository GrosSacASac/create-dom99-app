export { updateTime, start, stop };
import * as d from "./dependencies.js";


const updateTime = () => {
    d.feed(`time`, new Date().toLocaleString());
};

const start = () => {
    const SECOND = 1000;
    const intervalId = setInterval(() => {
        updateTime();
    }, SECOND);
    return intervalId;
};

const stop = (intervalId) => {
    clearInterval(intervalId);
};
