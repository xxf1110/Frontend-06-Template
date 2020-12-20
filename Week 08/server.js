
const http = require('http')

http.createServer((request, response) => {
    let body = []
    request.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString())
    }).on('end', () => {
        console.log(body);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(' hello world\r\n');
    })
}).listen(8080)
