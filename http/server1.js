const http = require('http');
const services = require('../services');
const url = require('url');
//const textBody = require("body");
const jsonBody = require("body/json");
//const formBody = require("body/form");
//const anyBody = require("body/any");

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
    } else if(http.request.method==='POST' && parsedUrl.pathname==='/users'){
    jsonBody(req,res,(err,body)=>{
        if(err){
            console.log(err);
        }else{
            services.createUser(body['username']);
        }
    });
    } else {
        //response.statusCode = 404;
        //response.setHeader('X-Powered-By','Node');
        response.writehead(404,{
            'X-powered-By' : 'Node'
        });
        response.end();
    }
});

server.listen(8080);