import {
    dateAndTimeString,
} from "../source/components/xClock/xClock.js";
import test from "ava";


test(`dateAndTimeString returns a string`, t => {
    t.is(typeof dateAndTimeString() === "string", true);
})
