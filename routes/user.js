const express = require('express');
const path = require('path');
const authenticate = require('../middleware/auth');

const router = express.Router();

//this middleware lets express serve static files from the js directory
router.use(express.static(path.join(__dirname, '../public')));

//Adding routes from get
router.get('/',(req, res)=>{
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    //loads up form.html
    res.sendFile(path.join(__dirname, '../views', '/login.html'));
});

router.get('/register', (req, res) => {
    //loads up register.html
    res.sendFile(path.join(__dirname, '../views', '/register.html'));
});

router.get('/form', authenticate, (req, res) => {
    //loads up form.html
    res.sendFile(path.join(__dirname, '../views', '/form.html'));
});

module.exports = router;