const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/auth.controller.js'); // Ensure extension is used if necessary in your environment

router.post('/login', authUser);
router.post('/register', registerUser);

module.exports = router;
