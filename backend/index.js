import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import { Server as SocketServer } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (assuming frontend is built and located in "/frontend/dist")
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Serve index.html for any other routes
app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"))
);

// API endpoint
app.get('/api', (_, res) => {
    res.status(200).json({
        message: 'API is working!'
    });
});

// Socket.io event handling
io.on('connection', (socket) => {
    console.log("a user connected:", socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });

    socket.on('drawing-mouseDown', (data) => {
        socket.broadcast.emit('drawing-mouseDown', data);
    });

    socket.on('drawing-mouseMove', (data) => {
        socket.broadcast.emit('drawing-mouseMove', data);
    });

    socket.on('drawing-end', () => {
        socket.broadcast.emit('drawing-end');
    });

    socket.on('saveCanvas',()=>{
        socket.broadcast.emit('saveCanvas');
    })

    socket.on('handleUndo',()=>{
        socket.broadcast.emit('handleUndo');
    })
    socket.on('handleRedo',()=>{
        socket.broadcast.emit('handleRedo');
    })
    socket.on('clear', () => {
        socket.broadcast.emit('clear');
    });
});

// Error handling for Socket.io
io.engine.on("connection_error", (err) => {
    console.error("Socket connection error:", err.message);
});

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

server.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
