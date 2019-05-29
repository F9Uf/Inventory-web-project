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
const newComplexEmployee = require('./employees/newComplexEmployee');


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
const updateItem = require('./items/updateItem');
const addOneItem = require('./items/addOneItem');

//stock
const allStock = require('./stocks/allStock');
const deleteOneStock = require('./stocks/deleteOneStock');
const addOneStock = require('./stocks/addOneStock');
const updateStock = require('./stocks/updateStock');
const allLocationInOneStock = require('./stocks/allLocationInOneStock');
const addLocationInOneStock = require('./stocks/addLocationInOneStock');


//category
const allCategory = require('./category/allCategory');
const deleteCategory = require('./category/deleteCategory');
const addOneCategory = require('./category/addOneCategory');
const updateCategory = require('./category/updateCategory');


//position
const allPosition = require('./positions/allPosition');
const addOnePosition = require('./positions/addOnePosition');
const deletePosition = require('./positions/deletePosition');
const updatePosition = require('./positions/updatePosition');

//order
const allOrder = require('./orders/allOrder');
const updateOrder = require('./orders/updateOrder');
const insertComplexOrderIn = require('./orders/insertComplexOrderIn');
const readOneOrder = require('./orders/readOneOrder');
const insertComplexOrderOut = require('./orders/insertComplexOrderOut');

//location
const allLocation = require('./locations/allLocation');
const addOneLocation = require('./locations/addOneLocation');
const deleteLocation = require('./locations/deleteLocation');
const updateLocation = require('./locations/updateLocation');

//address
const allAddress = require('./addresses/allAddress');
const addAddress = require('./addresses/addAddress');


//shipping
const allShipping = require('./shippings/allShipping');
const addOneShipping = require('./shippings/addOneShipping');
const insertcomplexship = require('./shippings/insertcomplexship');
const updateShippingComplex = require('./shippings/updateShippingComplex');
const shippingById = require('./shippings/shippingById');


//analysis
const ana5 = require('./analysis/5');
const ana5Max = require('./analysis/5max');
const ana3show = require('./analysis/3show_all');
const ana3group = require('./analysis/3group_by');
const ana3max = require('./analysis/3max');
const locationArea = require('./analysis/locationArea');
const ana4show = require('./analysis/4show');
const ana4group = require('./analysis/4group');
const ana4max = require('./analysis/4max');
const ana8mostCategoryInSupplier = require('./analysis/8mostCategoryInSupplier');
const ana6 = require('./analysis/6');
const ana15 = require('./analysis/15');
const ana14 = require('./analysis/14');
const ana14max = require('./analysis/14max');
const ana15max = require('./analysis/15max');
const avgCategoryArea = require('./analysis/avgCategoryArea');
const addressEmployee = require('./analysis/addressEmployee');
const addressEmployeeMax = require('./analysis/addressEmployeeMax');

const ana1Avgsalary = require('./analysis/1salaryInposition');




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
router.post('/employees',permit(),newComplexEmployee);

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
router.get('/stocks/:stockID', permit(),allLocationInOneStock);
router.post('/stocks/:stockID',permit(),addLocationInOneStock);


//category
router.get('/category', permit(),allCategory);
router.delete('/category/:category_id', permit(), deleteCategory);
router.post('/category', permit(),addOneCategory);
router.put('/category/:category_id',permit(),updateCategory);


//position
router.get('/positions', permit(),allPosition);
router.delete('/positions/:position_id', permit(),deletePosition);
router.post('/positions', permit(),addOnePosition);
router.put('/positions/:position_id', permit(),updatePosition);

//orders
router.get('/orders',permit(),allOrder);
router.put('/orders/:order_id',permit(),updateOrder);
router.post('/orders/in',permit(),insertComplexOrderIn);
router.post('/orders/out',permit(),insertComplexOrderOut);
router.get('/orders/:order_id', permit(), readOneOrder);

//location
router.get('/locations',permit(),allLocation);
router.delete('/locations/:location_id',permit(),deleteLocation);
router.post('/locations',permit(),addOneLocation);
router.put('/locations/:location_id',permit(),updateLocation);

//address
router.get('/addresses',permit(),allAddress);
router.post('/addresses',permit(),addAddress);


//shipping
router.get('/shippings', permit(), allShipping);
// router.post('/shippings',permit(),addOneShipping);
//router.put('/shippings/:shippingID',permit(),updateShipping);
router.post('/shippings',permit(),insertcomplexship);
router.put('/shippings/:shipping_id',permit(), updateShippingComplex);
router.get('/shippings/:shippingID',permit(),shippingById);


//analysis
router.get('/analysis5',permit(),ana5);
router.get('/analysis5max',permit(),ana5Max);
router.get('/analysis3show',permit(),ana3show);
router.get('/analysis3group',permit(),ana3group);
router.get('/analysis3max',permit(),ana3max);
router.get('/location/area',permit(),locationArea);
router.get('/analysis4show',permit(),ana4show);
router.get('/analysis4group',permit(),ana4group);
router.get('/analysis4max',permit(),ana4max);
router.get('/analysis8most',permit(),ana8mostCategoryInSupplier);
router.get('/analysis6',permit(),ana6);
router.get('/analysis15',permit(),ana15);
router.get('/analysis15max',permit(),ana15max);
router.get('/analysis14',permit(),ana14);
router.get('/analysis14max',permit(),ana14max);
router.get('/analysisAvgCategoryArea',permit(),avgCategoryArea);
router.get('/analysis/addressemployee',permit(),addressEmployee);
router.get('/analysis/addressemployee/max',permit(),addressEmployeeMax);


router.get('/analysis1avgsalary', permit(), ana1Avgsalary);

module.exports = router;
