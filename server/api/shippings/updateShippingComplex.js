/**
     * /shippings/:shipping_id
     * 
     * {
     *  car: {
     *     newCar: 'id',
     *     oldCar: 'id'
     *  }
     * }
     * 
     * 1. update oldCar status = 'ready'
     * 2. update newCar status = 'unready'
     * 3. update carId in shipping = newCar
     * 
     * 4. update oldDriver status = 'ready'
     * 5. update newDriver status = 'unready'
     * 6. update employeeID in shipping = newDriver
     *  if (car) {
        //return update car
    } else if (driver) {
        // return update driver
    } else if (order) {

    }
    */
const db = require('../../db')
module.exports = (req, res) => {
    const shipping_id = req.params.shipping_id
    const car = req.body.car;
    const driver = req.body.driver;
    const addOrderdetail = req.body.addOrderdetail;
    const deleteOrderdetail = req.body.deleteOrderdetail;
    const finishOrderdetail = req.body.finishOrderdetail;
    const notFinishOrderdetail = req.body.notFinishOrderdetail;
    if(car && !driver && !addOrderdetail && !deleteOrderdetail && !finishOrderdetail && !notFinishOrderdetail){
        if(car.newCar !== car.oldCar){
            let sql_statusCarOld = `UPDATE car SET status = "ready" WHERE carID = (SELECT carID FROM shipping WHERE shippingID = ?)`
            
        }else{

        }
    }
    
}

