export {
    staticCopies,
};

import { copyFile, copyDirectory } from "filesac";
import fs, { stat } from "fs";
import path from "path";
import url from "url";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = `./source/`;
const built = `./built/`;
const directoriesToCopy = [
    `images`,
    `components`,
    `css`,
];


const staticCopies = function () {
    return Promise.all(
        directoriesToCopy.map(directoryName => {
            return copyDirectory(
                path.join(source, directoryName),
                path.join(built, directoryName)
            );
        }));
};

staticCopies();