const express = require('express');
const router = express.Router();
const {
    createMessage,
    getMessages,
    deleteMessage,
} = require('../controllers/message.controller');
const { protect, admin } = require('../middlewares/auth.middleware');

router.route('/')
    .post(createMessage)
    .get(protect, admin, getMessages);

router.route('/:id')
    .delete(protect, admin, deleteMessage);

module.exports = router;
