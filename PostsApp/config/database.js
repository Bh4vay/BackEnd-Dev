const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.Database_Url, {})
    .then(()=>{
            console.log("Database connection successfull");
    })
    .catch ((err) =>{
        console.log("Error in db connection");
        console.error(err);
        process.exit(1);
    });
}
module.exports = dbConnect;