// export { staticCopies};

import { copyDirectory } from "filesac";
import path from "path";


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