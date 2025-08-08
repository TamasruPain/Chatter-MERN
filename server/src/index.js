const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectDB = require('./lib/db');

const authRoutes = require('./routes/auth.route');
const messageRoutes = require('./routes/message.route');

require('dotenv').config();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://chatter-bird-chatapp.vercel.app"
    ],
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const initSocket = require('./lib/socket');
const { io, server } = initSocket(app);

const port = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await connectDB();
        server.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to DB:", error);
        process.exit(1);  // optional: stop app if DB connection fails
    }
};

startServer();

//heath check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
