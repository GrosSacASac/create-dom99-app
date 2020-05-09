/* rename dist/index-temp.html and delete source/index-temp */
import { deleteFile } from "filesac";
import fs from "fs";


fs.rename(`dist/index-temp.html`, `dist/index.html`, function() {});
deleteFile(`source/index-temp.html`);