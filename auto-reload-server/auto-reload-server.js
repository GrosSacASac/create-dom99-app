
import express from "express";
import serveStatic from "serve-static";
import ws from "ws";
const { Server } = ws;
import { readFileSync } from "fs";
import chokidar from "chokidar";
const { watch } = chokidar;
import minimist from "minimist";
import path from "path";

// same as previous __dirname, substring(8) removes the file:/// that is at the beginning
const dirname__ = path.dirname(import.meta.url.substring(8));

const wsInject = readFileSync(`${dirname__}/ws-inject.html`, `utf8`);

const PORT = minimist(process.argv.slice(2)).port || 8080;
const SOURCE_PATH = `source`;

const server = express();
server.get(`*`, injectHTML);
/* serve from source so that http://localhost:8080/home.html
becomes http://localhost:8080/source/home.html
but also from root so that node_modules is accessible
*/
server.use(serveStatic(`./${SOURCE_PATH}`));
server.use(serveStatic(`./`));
server.listen(PORT);
server.on(`listening`, () => {
    console.log(`open http://localhost:${PORT}`);
});


function injectHTML(req, res, next) {
    const path = req.params[0].slice(1);
    if (path.slice(-5) !== `.html`) {
        return next();
    }
    const finalPath = `${SOURCE_PATH}/${path}`;
    let text;
    try {
        text = readFileSync(finalPath, `utf-8`);
    } catch (e) {
        console.error(e);
        console.error(`Could not find ${finalPath}`);
        next();
        return;
    }
    res.send(`${text}${wsInject}`);
}


const wss = new Server({ server });
watch(`.`, { ignored: /\.git|[\/\\]\./ })
    .on(`change`, path => {
        console.log(`${path} changed`);

        const type = `reload`;

        const msg = { path, type };
        wss.clients.forEach(socket => {
            socket.send(JSON.stringify(msg));
        });
    });
