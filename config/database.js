import mongoose from "mongoose"; 

const initDB = () => { 
    mongoose.connect(process.env.CONNECTION_STRING);
    mongoose.connection.once('open', () => { 
        console.log('connected to database'); 
    }); 

    mongoose.connection.on('error', console.error); 
} 

export default initDB;