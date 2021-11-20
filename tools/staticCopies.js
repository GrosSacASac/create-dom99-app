// export { staticCopies};

import path from "node:path";
import { copyDirectory } from "filesac";


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
                path.join(built, directoryName),
            );
        }));
};

staticCopies();
