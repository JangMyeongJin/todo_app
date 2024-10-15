const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");

const app = express();
app.use(bodyParser.json());

// cors 사용은 routes전에 
app.use(cors());

app.use("/api",indexRouter);

const mongoURI = "mongodb://localhost:27017/todo-demo";

mongoose.connect(mongoURI).then(() => {
    console.log("mongoose connected!");
}).catch((err) => {
    console.log("mongoose connection error : ", err);
});

app.listen(5000, () => {
    console.log("server on");
})