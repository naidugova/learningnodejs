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
        console.log(metadata);
    };
    jsonBody(req,res,(err,body)=>{
        if(err){
            console.log(err);
        }else{
            services.createUser(body['username']);
        }
    })
});

server.listen(8080);