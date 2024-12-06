const mongoose = require('mongoose');

const connectDB = async()=>{
    try {
        const connect = await mongoose.connect();

        console.log("MonogoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}