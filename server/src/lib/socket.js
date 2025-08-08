// lib/socket.js
const { Server } = require('socket.io');
const http = require('http');

function initSocket(app) {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
            
            ],
            credentials: true
        }
    });

    const userSocketMap = {};

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);
        const userId = socket.handshake.query.userId;
        if (userId) userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        socket.on("disconnect", () => {
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        });
    });

    return { io, server };
}

module.exports = initSocket;
