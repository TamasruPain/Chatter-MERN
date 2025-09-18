// lib/socket.js
const { Server } = require('socket.io');
const http = require('http');

function initSocket(app) {
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "https://chatter-bird-chatapp.vercel.app"
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

    // Add this function to get receiver socket ID
    const getReceiverSocketId = (receiverId) => {
        return userSocketMap[receiverId];
    };

    return { io, server, getReceiverSocketId };
}

module.exports = initSocket;
