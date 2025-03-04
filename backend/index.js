import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { revealChars } from "./word.js";
import events from "events";

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

app.post('/api/submitName', (req, res) => {
    const { name, id } = req.body;

    // Here you can handle the name as needed (e.g., save it to a database or process it)
    console.log('Received name:', name, '   ', 'uuid is:', id);

    // Respond with a success message
    res.status(200).json({ message: 'Name received!' });
});

var wordEvent = new events.EventEmitter();

revealChars((word) => {
    wordEvent.emit('update-word', word)
});
const clients = new Map()
const channels = new Map()
// Socket.io event handling
io.on('connection', (socket) => {
    const emitWord = (word) => {
        socket.broadcast.emit('word', word);
    }
    wordEvent.on('update-word', emitWord);

    socket.on('init', (data) => {
        
        console.log('init', data);
    });
    socket.on('connect-channel', ({ channelId, uuid }) => {
        if (!channelId || !uuid) {
            return
        }
        const user = clients.get(uuid)
        if (user) {
            if (user.id !== socket.id) {
                user.disconnect(true)
            }
            const prev_channel = channels.get(uuid)
            if (prev_channel && prev_channel !== channelId) {
                socket.leave(prev_channel)
            }
        }
        socket.join(channelId)
        clients.set(uuid, socket)
        channels.set(uuid, channelId)
    })
    console.log("a user connected:", socket.id," ",clients.size,channels.size);

    socket.on('leave-channel', ({ uuid }) => {
        if (!uuid) {
            return
        }
        const prev_channel = channels.get(uuid)
        if (prev_channel) {
            socket.leave(prev_channel)
        }
    })
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });

    socket.on('drawing-mouseDown', (data) => {
        if(!data.channelId){
            return;
        }
        socket.to(data.channelId).emit('drawing-mouseDown', data);
    });

    socket.on('drawing-mouseMove', (data) => {
        if(!data.channelId){
            return;
        }
        socket.to(data.channelId).emit('drawing-mouseMove', data);
    });

    socket.on('drawing-end', (data) => {
        if(!data.channelId){
            return;
        }
        socket.to(data.channelId).emit('drawing-end');
    });

    socket.on('saveCanvas', (data) => {
        if(!data.channelId){
            return;
        }
        socket.to(data.channelId).emit('saveCanvas');
    })

    socket.on('handleUndo', (data) => {
        if(!data.channelId){
            return;
        }
        socket.to(data.channelId).emit('handleUndo');
    })
    socket.on('handleRedo', (data) => {
        if(!data.channelId){
            return;
        }
        socket.to(data.channelId).emit('handleRedo');
    })
    socket.on('clear', (data) => {
        if(!data.channelId){
            return;
        }
        socket.to(data.channelId).emit('clear');
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
