const express = require('express');
const router = express.Router();
// middle ware
const permit = require('./middleware/permission');

// controllers
const authLogin = require('./auth/authLogin');
const employeeController = require('./controllers/employee.controller');


router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Api v1 work!'
  });
});


// auth
router.post('/login', authLogin.login);

//employee user
router.get('/employees/:employee_id', permit(), employeeController.getOneEmployee);
router.put('/employees/:employee_id', permit(), employeeController.updateOneEmployee);

module.exports = router;
