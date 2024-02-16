const express = require('express');
const app = express();
const http = require('http');
const crypto = require('crypto');

const port = 3000;
const server = http.createServer(app); 

const { Server } = require('socket.io');
const io = new Server(server);

app.use('/game', express.static(__dirname + '/public')); 

app.get('/game/:gameID', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => { 
    //let gameID = crypto.randomUUID();
    const gameID = crypto.randomBytes(8).toString('hex');
    res.redirect(`/game/${gameID}`);
});

io.on('connection', (socket) => {
    console.log("User joined");
    socket.on('message', (data) => {

    });
});

server.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});
