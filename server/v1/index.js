const express = require('express');
const router = express.Router();

// controllers 
const order = require('./controllers/order');

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Api v1 w15151'
    });
});


router.get('/order', order.getOrder);


module.exports = router;