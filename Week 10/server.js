
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
        #container{
            width: 500px;
            height: 300px;
            display: flex;
            background-color: rgb(200, 200, 200);
        }
        #container #myId{
            width: 200px;
            height: 100px;
            background-color: rgb(255, 0, 0);
        }
        #container .cl{
            flex: 1;
            background-color: rgb(0, 255, 0);
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="myId"></div>
        <div class='cl'></div>
    </div>
</body>
</html>
        `);
    })
}).listen(8080)
