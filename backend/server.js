const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config()


connectDB()
const io = new Server({
    cors: true
});
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.send("API is running")
})

// User Register and Login APIs
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use(notFound)
app.use(errorHandler)


//Video Chat APIs
const emailToSocketMapping = new Map();
const socketToEmailMapping = new Map();

io.on("connection", (socket) => {
    console.log("New Connection")
    socket.on('join-room', data => {
        const { email, roomId } = data;
        console.log("user", email, "joined to room ", roomId);
        emailToSocketMapping.set(email, socket.id);
        socketToEmailMapping.set(socket.id, email);
        socket.join(roomId);
        socket.emit('joined-room', { roomId });
        socket.broadcast.to(roomId).emit("user-joined", { email });
    });

    socket.on('call-user', (data) => {
        const {email, offer} = data;
        const fromEmail = socketToEmailMapping.get(socket.id);
        const socketId = emailToSocketMapping.get(email);
        socket.to(socketId).emit("incoming-call", {fromEmail, offer});
    })

    socket.on("call-accepted", (data) => {
        const {fromEmail, res} = data;
        const socketId = emailToSocketMapping.get(fromEmail);
        socket.to(socketId).emit("call-accepted", {res});
    })
});

const PORT = process.env.PORT
app.listen(PORT, console.log("server started"))
io.listen(5001);