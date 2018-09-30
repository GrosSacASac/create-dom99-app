#!/usr/bin/env node
"use strict";

var express = require('express')
var serveStatic = require('serve-static')
var serveIndex = require('serve-index')
var SocketServer = require('ws').Server
var fs = require('fs')
var chokidar = require('chokidar')
var child = require('child_process')
var PORT = require('minimist')(process.argv.slice(2)).port || 3989
let renameId = 0;
let renames = new Map();

// set up express static server with a websocket
var server = express()
  .get('*', injectHTML)
  .use(renamesMapper)
  .use(serveStatic('./'))
  .use('/', serveIndex('./'))
  .listen(PORT)
  .on('listening', () => child.exec('open http://localhost:' + PORT))

process.on('uncaughtException', (err =>
  err.errno == 'EADDRINUSE' ? server.listen(++PORT) : 0)) //inc PORT if in use

// append websocket/injecter script to all html pages served

function renamesMapper(req, res, next){
    var path = req.originalUrl;
    // console.log("path", path);
    // console.log("renames", renames);
    if (renames.has(path)) {
        res.type("application/javascript")
        res.send(fs.readFileSync(renames.get(path), 'utf-8'));
        renames.delete(path);
        return;
    }
    next()
}

function injectHTML(req, res, next){
  try{
    var path = req.params[0].slice(1)
    if (path.slice(-1) == '/') path = path + '/index.html'
    if (path == '') path = 'index.html'
    if (path.slice(-5) != '.html') return next()
    //todo put back at the top
    var wsInject = fs.readFileSync(__dirname + '/ws-inject.html', 'utf8')
    res.send(fs.readFileSync(path, 'utf-8') + wsInject)
  } catch(e){ next() }
}

// if a .js or .css files changes, load and send to client via websocket
var wss = new SocketServer({server})
chokidar
  .watch('.', {ignored: /\.git|[\/\\]\./ })
  .on('change', internalPath => {
    // console.log(`${internalPath} changed`)
    // console.log(wss.clients.length)
    var str = fs.readFileSync(internalPath, 'utf8')
    var publicPath = '/' + internalPath.replace(__dirname, '')

    var type = 'reload'
    if (publicPath.includes('.js')) {
        type = 'jsInject'
        // rename file to force js module to be executed again
        let newName = `${publicPath}${renameId}`;
        while (newName !== newName.replace(`\\`, `/`)) {
            newName = newName.replace(`\\`, `/`);
        }
        renames.set(newName, internalPath);
        publicPath = newName;
        renameId += 1;
    }
    if (publicPath.includes('.css')) type = 'cssInject'

    var msg = {path: publicPath, type, str}
    wss.clients.forEach(d => d.send(JSON.stringify(msg)))
  })
