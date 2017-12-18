const app = require('./app');

// Create your own Web Server
const http = require('http');
const port = process.env.PORT || 3000; // set your app server port to default env variable or to 3000

const server = http.createServer(app);

server.listen(port);