const http = require('http');
const server = http.createServer((req,res) => {
    res.end('voila');
})
server listenerCount(process.envPORT || 3000);



