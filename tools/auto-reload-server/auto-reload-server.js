import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import polka from "polka";
import serveStatic from "serve-static";
import chokidar from "chokidar";
import minimist from "minimist";
import { createEventStream } from "onewaydata";


const __filename = fileURLToPath(import.meta.url);
// same as previous __dirname
const __dirname = path.dirname(__filename);


const { watch } = chokidar;
const autoReloadHtml = readFileSync(`${__dirname}/auto-reload.html`, `utf8`);

const PORT = minimist(process.argv.slice(2)).port || 8080;
const SOURCE_PATH = `source`;

const polkaServer = polka();
const eventStream = createEventStream({ asMiddleWare: true });


polkaServer.use(injectHTML);
/* serve from source so that http://localhost:8080/home.html
becomes http://localhost:8080/source/home.html
but also from root so that node_modules is accessible
*/
polkaServer.use(serveStatic(`./${SOURCE_PATH}`));
polkaServer.use(serveStatic(`./`));
polkaServer.use(`/auto-reload`, eventStream.middleWare);
polkaServer.listen(PORT);


const endBody = `</body>`;
function injectHTML(req, res, next) {
    let path = req.url;
    if (path === `/`) {
        path = `/index.html`;
    }
    if (!path.includes(`.html`)) {
        return next();
    }
    const finalPath = `${SOURCE_PATH}/${path}`;
    let text;
    try {
        text = readFileSync(finalPath, `utf-8`);
    } catch (e) {
        next();
        return;
    }
    res.end(text.replace(endBody, `${autoReloadHtml}${endBody}`));
}




const fileWatcher = watch(`.`, { ignored: /\.git|[\/\\]\./ });
fileWatcher.on(`change`, path => {
    console.log(`${path} changed`);
    eventStream.send({ data: path, event: `file/changed` });
});
console.log(`open http://localhost:${PORT}`);
