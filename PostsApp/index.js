const express = require('express');
const app = express();

require('dotenv').config();
const Port = process.env.PORT;


app.use(express.json());

const  blogs = require('./routes/blogs');
app.use("/api/v1",blogs);


const dbConnect = require('./config/database');
dbConnect();

app.listen(Port, ()=>{
    console.log(`Server started successfully at ${Port}`);
})


app.get("/",(req,res)=>{
    res.send("<h2>Hello ji!</h2>")
})