const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const connectDB = require("./db/db")
const {errorHandler} = require("./middlewares/errorMiddleware")

const port = process.env.PORT || 3000
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(errorHandler)
app.use("/api/posts", require("./routes/postsRoutes"))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})