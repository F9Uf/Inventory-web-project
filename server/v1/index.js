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
/**  @todo #1 create orders Api */
// @todo #2 create employee Api 
/* @todo #3 fixed something*/

router.post('/login', authController.login);
router.post('/signup', authController.signup);

// order
// router.get('/orders', permit(), ordersController.getOrder);

module.exports = router;