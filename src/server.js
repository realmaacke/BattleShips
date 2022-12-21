// imports
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const uid = require('uid');

// globals
PORT = 3000;
var players = [ 
    user = {
        id : '',
        username : '',
    },
];

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.use("/src", express.static(__dirname + "/src"));

//Server Request
io.on('connection', (socket) => {

    // start game

    socket.on('start', () => {

        var seshid = uid.uid(); // session id
        players.push(
            user ={
                id: seshid, 
                username: '',
            }
        ); // pushin as user into player struct

        // if first element is empty remove it
        if(players[0] == undefined || players[0].id == '')
            players.shift();// removes first element of array
        

        console.log(players)
        // TODO response (init the game)
        io.emit('start');
    });

    // chat system
    socket.on('msg', (msg) =>{
        io.emit('msg', msg);
    })

    socket.on('disconnect', () => {
        // DC ? RESET GAME : AWAIT GAME (implement timer) : RESET GAME.
    })

});

server.listen(PORT, () => {
    console.log("Listening on :", PORT);
});


