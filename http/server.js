const http = require('http');
const services = require('../services');
const url = require('url');

const server = http.createServer();
server.on('request',(req,res)=>{
    const parsedUrl = url.parse(http.req.url,true);
    if (req.method === 'GET' && parsedUrl.pathname === '/metadata'){
        const { id } = parsedUrl.query;
        const metadata = sevices.fetchImageMetadata(id);
        console.log(metadata);
    };
    const body = [];
    http.request.on('data',(chunk)=>{
        body.push(chunk);
    }).on('end',()=>{
        const parsedJSON = JSON.parse(Buffer.concat(body));
        const username = parsedJSON[0]['username'];
        services.createUser(username);
    })
});

server.listen(8080);