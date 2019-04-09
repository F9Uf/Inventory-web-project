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
        message: 'Api v2 work!'
    });
});


// auth
router.post('/login', authController.login);
router.post('/signup', authController.signup);

// order
// @Todo #1 create orders Api
// router.get('/orders', permit(), ordersController.getOrder);

module.exports = router;