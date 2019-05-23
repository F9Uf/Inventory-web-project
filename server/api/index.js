const express = require('express');
const router = express.Router();
// middle ware
const permit = require('./middleware/permission');

// controllers
const authLogin = require('./auth/authLogin');
// const employeeController = require('./controllers/employee.controller');

const employeeGetOne = require('./employees/employeeGetOne')
const employeeUpdateOne = require('./employees/employeeUpdateOne')
const deleteOneEmployee = require('./employees/deleteOneEmployee')

//const car
const allCar = require('./cars/allCar')
const addOneCar = require('./cars/addOneCar')
const updateCar = require('./cars/updateCar')
const deleteOneCar = require('./cars/deleteOneCar')

//supplier
const allSup = require('./suppliers/allSup')
const addOneSup = require('./suppliers/addOneSup')
const deleteOneSup = require('./suppliers/deleteOneSup')

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
router.delete('/employees/:employeeID', permit(), deleteOneEmployee);

//car
router.get('/cars', permit(), allCar);
router.post('/cars', permit(), addOneCar);
router.delete('/cars/:carID', permit(), deleteOneCar);


//supplier
router.get('/suppliers', permit(), allSup);
router.post('/suppliers', permit(), addOneSup);
router.delete('/suppliers/:supplierID', permit(), deleteOneSup);


module.exports = router;
