const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(req, res, next) {
    try {
        //await User.deleteMany({}); // Clear the User collection before registering a new user
        const { email, username, password } = req.body;
        const user = new User({ email, username, password });
        await user.save()

        res.status(201).json({
            message: 'User registered successfully', 
            username: username
        })
    }
    catch(err) {
        //duplicate key error handling
        if(err.code === 11000) {
            res.status(400).json({
                error: 'Username or email already exists'
            });
            return;
        }

        next(err);
    }
};

async function login(req, res, next) {
    try{
        const {email, password } = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            res.status(404).json({error: 'User not found'});
            return;
        }

        // Check if the password matches the hased password
        // Using the comparePassword method defined in User.js
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            res.status(401).json({error: 'Incorrect password'});
            return;
        }
        
        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie
        // The cookie will be sent with every request to the server
        // This is more secure than storing the token in localStorage
        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: true, // Use secure cookies in production
            sameSite: 'Strict', // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour
        })

        res.status(200).json({
            success: true
        });
    }
    catch(err) {
        console.error("Error in login function: ");
        next(err);
    }
}

function logout(req, res, next) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })
        return res.status(200).json({
            success: true
        });
    }
    catch(err) {
        next(err);
    }
}

module.exports = {register, login, logout};