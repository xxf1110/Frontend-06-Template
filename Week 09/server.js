
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
        response.end(`
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
        body #myId {
            background-color: orange;
        }
        body div#box.box{
            background-color: red;
        }
        body img{
            background-color: red;
        }
    </style>
</head>
<body>
    <div id='box' class='box' name=xxf age='18'>
        <img id="myId" src="" alt="" />
        <img src="" alt="" />
    </div>
</body>
</html>
        `);
    })
}).listen(8080)
