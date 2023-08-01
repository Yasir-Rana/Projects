const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDB = async () => {
   try {
      const conn = await mongoose.connect("mongodb://127.0.0.1:27017/todos");
      console.log(`MongoDB Connected : ${conn.connection.host}`);
   } catch (error) {
      console.log("Connected Error : ", error);
      process.exit(1);
   }
};

module.exports = connectDB;
