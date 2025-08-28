const express = require('express');
const { register, login, logout } = require('../controllers/auth');

const router = express.Router();

router.post('/registerUser', register);
router.post('/loginUser', login);  

router.post('/logout', logout);

module.exports = router;