const express = require('express');
const router = express.Router();
// middle ware
const permit = require('./middleware/permission');

// controllers
const authLogin = require('./auth/authLogin');
// const employeeController = require('./controllers/employee.controller');

const employeeGetOne = require('./employees/employeeGetOne')
const employeeUpdateOne = require('./employees/employeeUpdateOne')

//const car
const allCar = require('./car/allCar')

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Api v1 work!'
  });
});


// auth
router.post('/login', authLogin);

//employee user
router.get('/employees/:employee_id', permit(), employeeGetOne);
router.put('/employees/:employee_id', permit(), employeeUpdateOne);

//car
router.get('/car',permit(), allCar);


module.exports = router;
