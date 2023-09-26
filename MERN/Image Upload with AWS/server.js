const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5002;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", require("./uploadRoute"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
