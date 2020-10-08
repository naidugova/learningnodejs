const http = require('http');
const services = require('../services');
const url = require('url');
//const textBody = require("body");
const jsonBody = require("body/json");
//const formBody = require("body/form");
//const anyBody = require("body/any");
const formidable = require('formidable');
const fs = require('fs');

const server = http.createServer();


server.on('request',(req,res)=>{
    const parsedUrl = url.parse(http.req.url,true);
    if (req.method === 'GET' && parsedUrl.pathname === '/metadata'){
        const { id } = parsedUrl.query;
        const metadata = sevices.fetchImageMetadata(id);
        response.setHeader('Content-Type','application/json');
        response.statusCode = 200;
        const serializedJSON = JSON.stringify(metadata);
        response.write(serializedJSON);
        response.end();
    } else if(req.method==='POST' && parsedUrl.pathname==='/users'){
    jsonBody(req,res,(err,body)=>{
        if(err){
            console.log(err);
        }else{
            services.createUser(body['username']);
        }
    });
    } else if(req.method==='POST' && parsedUrl.pathname==='/upload'){
        const form = new formidable.IncomingForm();
        // form.parse(req,(err,fields,files)=>{
        //     response.statusCode = 200;
        //     response.end("Success!");
        // })
        form.parse(request)
    .on('fileBegin', (name, file) => {
      console.log('Our upload has started!');
    })
    .on('file', (name, file) => {
      console.log('Field + file pair has been received');
    })
    .on('field', (name, value) => {
      console.log('Field received:');
      console.log(name, value);
    })
    .on('progress', (bytesReceived, bytesExpected) => {
      console.log(bytesReceived + ' / ' + bytesExpected);
    })
    .on('error', (err) => {
      console.error(err);
      request.resume();
    })
    .on('aborted', () => {
      console.error('Request aborted by the user!');
    })
    .on('end', () => {
      console.log('Done - request fully received!');
      response.end('Success!');
    });

    }else {
        //response.statusCode = 404;
        //response.setHeader('X-Powered-By','Node');
        response.writehead(404,{
            'X-powered-By' : 'Node'
        });
        response.end();
    }
});

server.listen(8080);