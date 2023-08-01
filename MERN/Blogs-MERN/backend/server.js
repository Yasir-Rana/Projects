const express = require("express");
require("dotenv").config();
const cors = require('cors');
const {errorHandler} = require("./middlewares/errorMiddleware")
const connectDB = require("./db/db");
const app = express();

const port = process.env.PORT || 3000;

// Connect Mongodb Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
