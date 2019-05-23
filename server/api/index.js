const express = require('express');
const router = express.Router();
// middle ware
const permit = require('./middleware/permission');

// controllers
const authLogin = require('./auth/authLogin');
// const employeeController = require('./controllers/employee.controller');

const allEmployee = require('./employees/allEmployee');
const employeeUpdateOne = require('./employees/employeeUpdateOne');
const employeeGetOne = require('./employees/employeeGetOne')
const deleteOneEmployee = require('./employees/deleteOneEmployee')


//const car
const allCar = require('./cars/allCar')
const addOneCar = require('./cars/addOneCar')
const updateCar = require('./cars/updateCar')
const deleteOneCar = require('./cars/deleteOneCar')

//supplier
const allSup = require('./suppliers/allSup')
const addOneSup = require('./suppliers/addOneSup')
const updateSup = require('./suppliers/updateSup')
const deleteOneSup = require('./suppliers/deleteOneSup')

const allItem = require('./items/allItem')


router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Api v1 work!'
  });
});


// auth
router.post('/login', authLogin);

//employee user
router.get('/employees', permit(), allEmployee);
router.get('/employees/:employee_id', permit(), employeeGetOne);
router.put('/employees/:employee_id', permit(), employeeUpdateOne);
router.delete('/employees/:employee_id', permit(), deleteOneEmployee);

//car
router.get('/cars', permit(), allCar);
router.post('/cars', permit(), addOneCar);
router.delete('/cars/:car_id', permit(), deleteOneCar);


//supplier

router.get('/suppliers',permit(),allSup);
router.post('/suppliers',permit(),addOneSup);
router.put('/suppliers/:sup_id',permit(),updateSup);


router.get('/suppliers', permit(), allSup);
router.post('/suppliers', permit(), addOneSup);
router.delete('/suppliers/:supplier_id', permit(), deleteOneSup);

//item
router.get('/items', permit(), allItem);

module.exports = router;
