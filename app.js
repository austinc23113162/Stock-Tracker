require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const cookieParser = require("cookie-parser");

//setting the port.
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function start_server() {
    const server = express();
    try {
        await mongoose.connect(MONGO_URI);
    }
    catch(err) {
        console.error("Error connecting to MongoDB:", err);
    }
    
    server.use(cookieParser());
    server.use('/', userRoutes);

    //Adding authorization routes
    server.use(express.json());
    server.use('/auth', authRoutes)
    
    //Adding API routes
    server.use('/api', apiRoutes);
    
    //catches all other routes and display error
    server.use((req, res) => {
        res.status(404).send("404 - Page not found");
    })
    
    // global error handler
    server.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({error: "Internal Server Error"})
    }) 
    
    //Binding to localhost://3000
    server.listen(port,()=>{
        console.log('Express server started at port 3000');
    });
}

start_server();