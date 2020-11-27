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

const defaultPort = 8080;
const PORT = minimist(process.argv.slice(2)).port || defaultPort;
const SOURCE_PATH = `source`;

const polkaServer = polka();
const eventStream = createEventStream({ asMiddleWare: true });




const endBody = `</body>`;
const injectHTML = function (req, res, next) {
    let requestPath = req.url;
    if (requestPath === `/`) {
        requestPath = `/index.html`;
    }
    if (!requestPath.includes(`.html`)) {
        return next();
    }
    const finalPath = `${SOURCE_PATH}/${requestPath}`;
    let text;
    try {
        text = readFileSync(finalPath, `utf-8`);
    } catch (e) {
        next();
        return;
    }
    res.end(text.replace(endBody, `${autoReloadHtml}${endBody}`));
};


polkaServer.use(injectHTML);
/* serve from source so that http://localhost:8080/home.html
becomes http://localhost:8080/source/home.html
but also from root so that node_modules is accessible
*/
polkaServer.use(serveStatic(`./${SOURCE_PATH}`));
polkaServer.use(serveStatic(`./`));
polkaServer.use(`/auto-reload`, eventStream.middleWare);
polkaServer.listen(PORT);


const fileWatcher = watch(`.`, { ignored: /\.git|[/\\]\./ });
fileWatcher.on(`change`, filePath => {
    console.log(`${filePath} changed`);
    eventStream.send({ data: filePath, event: `file/changed` });
});
console.log(`open http://localhost:${PORT}`);
