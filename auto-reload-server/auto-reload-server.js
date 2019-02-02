"use strict";

const express = require('express')
const serveStatic = require('serve-static')
const ws = require('ws')
const fs = require('fs')
const chokidar = require('chokidar')
const child = require('child_process')
const minimist = require('minimist')
const wsInject = fs.readFileSync(`${__dirname}/ws-inject.html`, 'utf8');

const PORT = minimist(process.argv.slice(2)).port || 8080;
const SOURCE_PATH = `source`;

const server = express()
  .get('*', injectHTML)
  /* serve from source so that http://localhost:8080/home.html
  becomes http://localhost:8080/source/home.html
  but also from root so that node_modules is accessible
  */
  .use(serveStatic(`./${SOURCE_PATH}`))
  .use(serveStatic(`./`))
  .listen(PORT)
  .on('listening', () => {
      console.log(`open http://localhost:${PORT}`);
  });


function injectHTML(req, res, next){
    const path = req.params[0].slice(1)
    if (path.slice(-5) !== '.html') {
        return next()
    }
    const finalPath = `${SOURCE_PATH}/${path}`;
    let text;
    try{
        text = fs.readFileSync(finalPath, 'utf-8')
    } catch(e){
        console.error(e);
        console.error(`Could not find ${finalPath}`);
        next()
        return; 
    }
    res.send(`${text}${wsInject}`);
}


const wss = new ws.Server({server})
chokidar
  .watch('.', {ignored: /\.git|[\/\\]\./ })
  .on('change', path => {
    console.log(`${path} changed`)
    
    const type = 'reload'

    const msg = {path, type}
    wss.clients.forEach(socket => {
        socket.send(JSON.stringify(msg))
    });
  })
