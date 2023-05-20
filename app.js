const http = require('http');
const fs = require('fs');
const qs = require('qs');
const info = [];

const server = http.createServer((req,res) => {
    if (req.method === "GET") {
        fs.readFile('./views/form.html','utf-8',(err,data) => {
            if (err) console.log(err.message);
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end',() => {
            data = qs.parse(data);
            info.push(data);
            console.log(info);
            res.end('Success');
        })        
    }
})

server.listen(3000, 'localhost', () => console.log('Server is running at http://localhost:3000'));