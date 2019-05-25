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
const allItem = require('./items/allItem');
const deleteOneItem = require('./items/deleteOneItem');
const itembyid = require('./items/itembyid');
const updateItem = require('./items/updateItem')
const addOneItem = require('./items/addOneItem')

//stock
const allStock = require('./stocks/allStock')
const deleteOneStock = require('./stocks/deleteOneStock')
const addOneStock = require('./stocks/addOneStock')
const updateStock = require('./stocks/updateStock')


//category
const allCategory = require('./category/allCategory')
const deleteOneCategory = require('./category/deleteCategory')
const addOneCategory = require('./category/addOneCategory')
const updateCategory = require('./category/updateCategory')



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
router.get('/items/:item_id',permit(),itembyid);
router.put('/items/:item_id', permit(), updateItem);
router.delete('/items/:item_id', permit(), deleteOneItem);
router.post('/items', permit(), addOneItem);

//stock
router.get('/stocks', permit(),allStock);
router.delete('/stocks/:stock_id', permit(), deleteOneStock);
router.post('/stocks', permit(),addOneStock);
router.put('/stocks/:stock_id',permit(),updateStock);


//category
router.get('/category', permit(),allCategory);
router.delete('/category/:category_id', permit(), deleteOneCategory);
router.post('/stocks', permit(),addOneCategory);
router.put('/stocks/:category_id',permit(),updateCategory);






module.exports = router;
