const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate user based on JWT
// Get the token the client sends
// verify it's correct user by our secret key
async function authenticate(req, res, next) {
    const token = req.cookies.token; // Get the token from cookies
    if (!token) {
        return res.redirect('/login'); // Redirect to login page if token is not provided
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        // console.log("Decoded token: ", decoded);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }
        next();
    } catch(err) {
        console.error("Authentication error:", err);
        res.status(401).redirect('/login');
    }
}

module.exports = authenticate;
// This middleware can be used in routes to protect them
// For example:
// app.get('/protected', authenticate, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });
// This will ensure that only authenticated users can access the route
// If the token is valid, the user will be available in req.user