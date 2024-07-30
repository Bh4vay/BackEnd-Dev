const express = require("express");
const app = express();

require("dotenv").config();

app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const routes = require('./routes/routes');
app.use("/api/v1",routes);

const dbConnect = require('./config/database');
dbConnect();

app.listen(process.env.PORT, ()=>{
    console.log("Server started successfully!");
})