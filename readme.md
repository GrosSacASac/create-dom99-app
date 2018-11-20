# create-dom99-app

## An opinionated starter pack for front end web development

Made for static Single page apps. Get started with files and structure ready.

## What is included

### DOM manipulation

[dom99](https://cdn.rawgit.com/GrosSacASac/DOM99/master/documentation/documentation.html)


### Zero second compile time during development

When developping using an es modules capable browser you don't have to bundle your js modules, just refresh your browser to see changes.

## How to


### Download

Download on [GitHub](https://github.com/GrosSacASac/create-dom99-app/archive/master.zip)


### Install dependencies

`npm install`

### Edit files

Edit files in `source/`

### View result

Open `home.html` in `source/`. To enable auto reload use 
`npm run server`
 then visit
`http://localhost:8080/source/home.html`

### How does it work without compilation step

Html includes are handled by `tools/inlineHTMLRuntime.js`. It inlines every imported html file.  It checks for `type="text/html"` and `src`. Open `source/home.html` for an example.
```
<script type="text/html" src="html/superParagraph.html"></script>
```
JS and CSS modules are handled by the browser natively.

## Build for production

`npm run prod`

The results will be in `dist/`

The results must be served as top level url.

Or as individual commands

`npm run inlineHTML`

This will run `tools/inlineHTML.js` which is almost like its runtime counterpart, except that it creates a new file with every import inlined to avoid network requests.

`npm run packJS`

This will run parcel, so that JS files and CSS files also have their imports resolved to avoid network requests. It also minfies files and can use a babel config for transpiling.



## todo

 * testing set up
 * linting
 * explainer how to split code into independent components
 
