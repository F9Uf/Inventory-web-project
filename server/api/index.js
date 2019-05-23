const express = require('express');
const router = express.Router();
// middle ware
const permit = require('./middleware/permission');

// controllers
const authLogin = require('./auth/authLogin');

// const employeeController = require('./controllers/employee.controller');
const allEmployee = require('./employees/allEmployee');
const employeeUpdateOne = require('./employees/employeeUpdateOne');
const employeeGetOne = require('./employees/employeeGetOne');
const deleteOneEmployee = require('./employees/deleteOneEmployee');


//const car
const allCar = require('./cars/allCar');
const addOneCar = require('./cars/addOneCar');
const updateCar = require('./cars/updateCar');
const deleteOneCar = require('./cars/deleteOneCar');

//supplier
const allSup = require('./suppliers/allSup');
const addOneSup = require('./suppliers/addOneSup');
const updateSup = require('./suppliers/updateSup');
const deleteOneSup = require('./suppliers/deleteOneSup');

//item
<<<<<<< HEAD
const allItem = require('./items/allItem');
const deleteOneItem = require('./items/deleteOneItem');
const itembyid = require('./items/itembyid');
=======
const allItem = require('./items/allItem')
const deleteOneItem = require('./items/deleteOneItem')
<<<<<<< HEAD
const updateItem = require('./items/updateItem')

=======
>>>>>>> 16fa2094b922eac52ec3d60937fda4037908868e

//stock
const allStock = require('./stocks/allStock')
const deleteOneStock = require('./stocks/deleteOneStock')
const addOneStock = require('./stocks/addOneStock')
const updateStock = require('./stocks/updateStock')
>>>>>>> 2e8c5668cf619e1deb291196e07caea7e3c5caa0

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
router.put('/cars/:car_id', permit(), updateCar);
router.delete('/cars/:car_id', permit(), deleteOneCar);


//supplier
router.get('/suppliers',permit(),allSup);
router.post('/suppliers',permit(),addOneSup);
router.put('/suppliers/:sup_id',permit(),updateSup);
router.delete('/suppliers/:supplier_id', permit(), deleteOneSup);

//item
router.get('/items', permit(), allItem);
<<<<<<< HEAD
router.delete('/items', permit(), deleteOneItem);
router.get('/items/:item_id',permit(),itembyid);
=======
<<<<<<< HEAD
router.delete('/items', permit(), deleteOneItem);
router.put('/items/:item_id', permit(), updateItem);
=======
>>>>>>> 16fa2094b922eac52ec3d60937fda4037908868e
router.delete('/items/:item_id', permit(), deleteOneItem);

>>>>>>> 2e8c5668cf619e1deb291196e07caea7e3c5caa0

//stock
router.get('/stocks', permit(),allStock);
router.delete('/stocks/:stock_id', permit(), deleteOneStock);
router.post('/stocks', permit(),addOneStock);
router.put('/stocks/:stock_id',permit(),updateStock);
module.exports = router;
