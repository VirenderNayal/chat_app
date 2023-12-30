const express = require("express");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
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

app.use('/api/user', userRouter)
app.use(notFound)
app.use(errorHandler)

const emailToSocketMapping = new Map();

io.on("connection", (socket) => {
    console.log("New Connection")
    socket.on('join-room', data => {
        const {email, roomId} = data;
        console.log("user", email, "joined to room ", roomId);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-joined", {email});
    })
});

const PORT = process.env.PORT
app.listen(PORT, console.log("server started"))
io.listen(5001);