const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const upload = require('../middlewares/uploads');
router.route('/register').post(upload.single('avatar'), register);
router.route('/login').post(login);

module.exports = router;
