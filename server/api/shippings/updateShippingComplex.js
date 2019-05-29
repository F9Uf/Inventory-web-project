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
    const shipping_id = req.params.shipping_id;
    const car = req.body.car;
    const driver = req.body.driver;
    const addOrderdetail = req.body.addOrderdetail;
    const deleteOrderdetail = req.body.deleteOrderdetail;
    const finishOrderdetail = req.body.finishOrderdetail; 0
    const notFinishOrderdetail = req.body.notFinishOrderdetail;

    if (car && !driver && !addOrderdetail && !deleteOrderdetail && !finishOrderdetail && !notFinishOrderdetail) {
        if (car.newCar !== car.oldCar) {
            let sql_statusCarOld = `UPDATE car SET carStatus = "ready" WHERE carID = ?`
            db.query(sql_statusCarOld, [car.oldCar], (err, data) => {
                if (err) {
                    console.log(err)
                    return res.json({ success: false, message: 'Cannot change status car!' })
                } else {
                    const sql_newCarr = `UPDATE shipping SET carID = ? WHERE shippingID = ?`
                    console.log(shipping_id)
                    db.query(sql_newCarr, [car.newCar, shipping_id], (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.json({
                                success: false,
                                message: 'Update carID error!'
                            })
                        } else {
                            let sql_statusCarNew = `UPDATE car SET carStatus = "unready" WHERE carID = ?`
                            db.query(sql_statusCarNew, [car.newCar], (err, data) => {
                                if (err) {
                                    return res.json({ success: false, message: 'Cannot set status new car!' })
                                } else {
                                    return res.json({ success: true, message: 'Change car success!' })
                                }
                            })
                        }
                    })
                }
            })
        } else {
            return res.json({ success: true, message: 'Car not cahnge!' })
        }
    } else if (!car && driver && !addOrderdetail && !deleteOrderdetail && !finishOrderdetail && !notFinishOrderdetail) {
        console.log('5555555')
        if (driver.newDriver !== driver.oldDriver) {
            console.log('ssssssssssss')
            let sql_statusDriverOld = `UPDATE employee SET status = "ready" WHERE employeeID = ?`
            db.query(sql_statusDriverOld, [driver.oldDriver], (err, data) => {
                if (err) {
                    return res.json({ success: false, message: 'Cannot change status old driver!' })
                } else {
                    const sql_newCar = `UPDATE shipping SET employeeID = ? WHERE shippingID = ?`
                    db.query(sql_newCar, [driver.newDriver, shipping_id], (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.json({ success: false, message: 'Update driver error!' })
                        } else {
                            let sql_statusDriverNew = `UPDATE employee SET status = "unready" WHERE employeeID = ?`
                            db.query(sql_statusDriverNew, [driver.newDriver], (err, data) => {
                                if (err) {
                                    return res.json({ success: false, message: 'Cannot set status new driver!' })
                                }
                                else {
                                    return res.json({ success: true, message: 'Change driver success!' })
                                }
                            })
                        }
                    })
                }
            })
        }
    } else if (!car && !driver && addOrderdetail && !deleteOrderdetail && !finishOrderdetail && !notFinishOrderdetail) {
        let sql_updateShipInOrderdetail = `UPDATE orderdetail SET shippingID = ? WHERE `
        let sql_value = []
        sql_value.push(shipping_id)
        for (let i = 0; i < addOrderdetail.length; i++) {
            sql_updateShipInOrderdetail += 'orderDetailID = ? or '
            sql_value.push(addOrderdetail[i])
        }
        sql_updateShipInOrderdetail = sql_updateShipInOrderdetail.slice(0, -3)
        db.query(sql_updateShipInOrderdetail, sql_value, (err, data) => {
            if (err) {
                return res.json({ success: false, message: 'Cannot add orderdetail!' })
            } else {
                let sql_statusAddOrderdetail = `UPDATE orderdetail SET status = "shipping" WHERE `
                let sql_value7 = []
                sql_value.push(shipping_id)
                for (let l = 0; l < addOrderdetail.length; l++) {
                    sql_statusAddOrderdetail += 'orderDetailID = ? or '
                    sql_value7.push(addOrderdetail[l])
                }
                sql_statusAddOrderdetail = sql_statusAddOrderdetail.slice(0, -3)
                console.log(sql_statusAddOrderdetail)
                db.query(sql_statusAddOrderdetail,sql_value7, (err, data) => {
                    if (err) {
                        return res.json({ success: false, message: 'Update status order detail fail!' })
                    } else {
                        return res.json({ success: true, message: 'Add Order Detail sucess!' })
                    }

                })
            }
        })
    } else if (!car && !driver && !addOrderdetail && deleteOrderdetail && !finishOrderdetail && !notFinishOrderdetail) {
        let sql_statusdeleteShipInOrderdetail = `UPDATE orderdetail SET status = "wait" WHERE `
        let sql_value4 = []
        for (let i = 0; i < deleteOrderdetail.length; i++) {
            sql_statusdeleteShipInOrderdetail += 'orderDetailID = ? or '
            sql_value4.push(deleteOrderdetail[i])
        }
        sql_statusdeleteShipInOrderdetail = sql_statusdeleteShipInOrderdetail.slice(0, -3)
        db.query(sql_statusdeleteShipInOrderdetail, sql_value4, (err, data) => {
            if (err) {
                return res.json({ success: false, message: 'Cannot delete status orderdetail!' })
            } else {
                let sql_deleteShipInOrderdetail = `UPDATE orderdetail SET shippingID = NULL WHERE `
                let sql_value5 = []
                for (let i = 0; i < deleteOrderdetail.length; i++) {
                    sql_deleteShipInOrderdetail += 'orderDetailID = ? or '
                    sql_value5.push(deleteOrderdetail[i])
                }
                sql_deleteShipInOrderdetail = sql_deleteShipInOrderdetail.slice(0, -3)
                db.query(sql_deleteShipInOrderdetail, sql_value5, (err, data) => {
                    if (err) {
                        return res.json({ success: false, message: 'Cannot delete shipping in orderdetail!' })
                    } else {
                        return res.json({ success: true, message: 'Delete shipping in orderdetail success!' })
                    }
                })
            }
        })

    } else if (!car && !driver && !addOrderdetail && !deleteOrderdetail && finishOrderdetail && !notFinishOrderdetail) {
        let sql_finish = `UPDATE orderdetail SET status = "done" WHERE orderdetailID = ?`
        db.query(sql_finish, [finishOrderdetail], (err, data) => {
            if (err) {
                return res.json({ success: false, message: 'Cannot update status finish' })
            } else {
                return res.json({ success: true, message: 'Update status finish success!' })
            }
        })
    } else if (!car && !driver && !addOrderdetail && !deleteOrderdetail && !finishOrderdetail && notFinishOrderdetail) {
        let sql_notFinish = `UPDATE orderdetail SET status = "shipping" WHERE orderdetailID = ?`
        db.query(sql_notFinish, [notFinishOrderdetail], (err, data) => {
            if (err) {
                return res.json({ success: false, message: 'Cannot update status shipping' })
            } else {
                return res.json({ success: true, message: 'Update status shipping success!' })
            }
        })
    }

}

