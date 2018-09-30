posthtml plugins can directly be used with posthtml and parcel-bundler

## https://github.com/posthtml/posthtml-include

 * no deep include yet https://github.com/posthtml/posthtml-include/issues/18
 * after compilation only

##  https://github.com/posthtml/posthtml-modules

 * not about the standard html modules
 * strange mix between old html import and web component v0 spec

## https://github.com/AshleyScirra/import-as-and-html-modules

 * Extends the es import() function with other module types html, arraybuffer, img, etc
 * aligned with the ongoing draft for html modules
 * supports importing html fragments only (via selectors)
 * cannot compile yet (only runtime import)
 
## https://www.npmjs.com/package/vulcanize

 * resolves html imports at build time
 * can inline script and styles
 * maybe the new version is located at https://www.npmjs.com/package/polymer-bundler --> todo confirm