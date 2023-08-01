const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");
const app = express();
const port = 3000;

// Connect Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/image", require("./routes/imageRoute"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
