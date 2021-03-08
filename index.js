const express = require('express');
// App express
const app = express();

const path = require('path');
require('dotenv').config();

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); // io = in and out y ademas lo exporta
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public'); // trae el index.html

app.use(express.static(publicPath)); // pone en funcionamiento el index.html

server.listen(process.env.PORT, (err) => { // variables de entorno

    if(err) throw Error(err);
    console.log('Server on port:', process.env.PORT);

}); 