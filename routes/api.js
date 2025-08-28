const express = require('express');
const authenticate = require('../middleware/auth');
const process_form = require('../controllers/process_form');
const store_cache = require('../controllers/store_cache');
const add_bookmark = require('../controllers/add_bookmark');
const check_bookmark = require('../controllers/check_bookmark');
const get_bookmarks = require('../controllers/get_bookmarks');

const router = express.Router();
// API routes
router.get('/process', process_form);

router.get('/username', authenticate, (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            error: "User not authenticated"
        });
    }
    res.json({username: req.user.username});
})

router.post('/bookmark/toggle', authenticate, store_cache, add_bookmark);

router.get('/bookmark/check', authenticate, check_bookmark);

router.get('/bookmarks', authenticate, get_bookmarks);

module.exports = router;