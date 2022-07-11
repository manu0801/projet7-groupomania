const http = require('http');
const server = http.createServer((req,res) => {
    res.end('voila');
});

server.listen(process.envPORT || 3000);



