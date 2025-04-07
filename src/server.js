const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

//creating an express app
const app = express();

//creating http server and attaching express app to it
const server = http.createServer(app);

//intializing socket.io server and configuring CORS
const io = new Server(server, {
    cors: {
        origin: "*", //allowing reqiest from any origin, change_in_production
    },
});

//listening for websockets connection
io.on("connection", (socket) =>{
    console.log("A user connected");

    //hadnling incoming messages
    socket.on("sendMessage", ({username,message})=> {
        console.log("Received message:", message, "from user", username);
        io.emit("receiveMessage", {username,message}); //broadcasting to all clients
    });

    //dosconnection request handling
    socket.on("disconnect",()=>{
        console.log("A user disconnected");
    });
});

//starting the server on port 5000
const PORT = 5500
server.listen(PORT,"0.0.0.0", () => {
    console.log("server is running on port 5500");
});