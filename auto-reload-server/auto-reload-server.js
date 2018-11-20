"use strict";

const express = require('express')
const serveStatic = require('serve-static')
const serveIndex = require('serve-index')
const ws = require('ws')
const fs = require('fs')
const chokidar = require('chokidar')
const child = require('child_process')
const minimist = require('minimist')


const PORT = minimist(process.argv.slice(2)).port || 3989

const server = express()
  .get('*', injectHTML)
  .use(serveStatic('./'))
  .use('/', serveIndex('./'))
  .listen(PORT)
  .on('listening', () => child.exec('open http://localhost:' + PORT))


function injectHTML(req, res, next){
  //try{
    let path = req.params[0].slice(1)
    if (path.slice(-1) === '/') {
        path = path + '/index.html'
    }
    if (path == '') {
        path = 'index.html'
    }
    if (path.slice(-5) !== '.html') {
        return next()
    }
    //todo put back at the top
    const wsInject = fs.readFileSync(__dirname + '/ws-inject.html', 'utf8')
    res.send(fs.readFileSync(path, 'utf-8') + wsInject)
 // } catch(e){ next() }
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
