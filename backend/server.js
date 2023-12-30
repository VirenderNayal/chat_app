const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config()

connectDB()
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running")
})

app.use('/api/user', userRouter)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, console.log("server started"))