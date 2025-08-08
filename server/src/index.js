require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./lib/db');
const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');
const cors = require('cors')
const {app, io, server} = require("./lib/socket")

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

//Server
const port = process.env.PORT || 3000;
try{
    server.listen(port, () => {
        console.log(`Server is running on ${port}`);
        connectDB();
    })
}catch(error){
   console.log(error)
}
