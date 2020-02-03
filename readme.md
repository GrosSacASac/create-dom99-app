# create-dom99-app

## An opinionated starter pack for front end web development

Made for static Single page apps. Get started with files and structure ready.


## What is included



### Application architecture

[core](https://github.com/mauriciosoares/core.js)

### DOM manipulation

[dom99](https://dom99.now.sh/)



### Zero second compile time during development

When developping using an es modules capable browser you don't have to bundle your js modules, just refresh your browser to see changes.

## How to

### Requirements

Node 12+

### Download

Download on [github.com/GrosSacASac/create-dom99-app](https://github.com/GrosSacASac/create-dom99-app/archive/master.zip)


### Install dependencies

`npm i`

### Edit files

Edit files in `source/`

### View result

Open `home.html` in `source/`.


To enable auto reload use 


`npm run serve-dev`

then visit http://localhost:8080/home.html

### How does it work without compilation step ?

Html includes are handled by `tools/inlineHTMLRuntime.js`. It inlines every imported html file.  It checks for `type="text/html"` and `src`. Open `source/home.html` for an example.

```
<script type="text/html" src="html/superParagraph.html"></script>
```

JS and CSS modules are handled by the browser natively.

## Build for production

`npm run build-prod`

The results will be in `dist/`

The results must be served as top level url.

`npm run serve-prod`

Or as individual commands

`npm run inline-html`

This will run `tools/inlineHTML.js` which is almost like its runtime counterpart, except that it creates a new file with every import inlined to avoid network requests.

`npm run bundle-js`

This will run parcel, so that JS files and CSS files also have their imports resolved to avoid network requests. It also minfies files and can use a babel config for transpiling.

## Linting


`npm run lint`

and

`npm run lint-fix` to automatically fix some issues
 
