const express = require('express');
const router = express.Router();
// middle ware
const permit = require('./middleware/permission');

// controllers
const authController = require('./controllers/auth.controller');
// const ordersController = require('./controllers/orders.controller');


router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Api v1 work!'
    });
});


// auth
router.post('/login', authController.login);
router.post('/signup', authController.signup);

module.exports = router;