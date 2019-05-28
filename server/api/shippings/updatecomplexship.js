const db = require('../../db');

module.exports = (req, res) => {
    const shippingID = req.params.shippingID;
    const newCar = req.body.newCar;
    const oldCar = req.body.oldCar;
    const newDriver = req.body.newDriver;
    const oldDriver = req.body.oldDriver;
    const addOrderdetail = req.body.newOrderDetail;
    const deleteOrderdetail = req.body.deleteOrderDetail;

    if (newCar && !oldCar) {
        let sql_statusCarOld = `UPDATE car SET status = "ready" WHERE carID = (SELECT carID FROM shipping WHERE shippingID = ?)`
        db.query(sql_statusCarOld, [shippingID], (err, data) => {
            if (err) {
                console.log(err)
                return res.json({ success: false, message: 'Cannot change status car!' })
            } else {
                const sql_newCar = `UPDATE shipping SET carID = ? WHERE shippingID = ?`
                db.query(sql_newCar, [newCar, shippingID], (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.json({
                            success: false,
                            message: 'Update carID error!'
                        })
                    } else {
                        let sql_statusCarNew = `UPDATE car SET status = "unready" WHERE carID = ?`
                        db.query(sql_statusCarNew, [newCar.carID], (err, data) => {
                            if (err) {
                                return res.json({ success: false, message: 'Cannot set status new car!' })
                            }
                        })
                    }
                })
            }
        })
    } else if (!newCar && oldCar) {
        console.log('Nothing update carID')
    }




    if (newDriver && !oldDriver) {
        let sql_statusDriverOld = `UPDATE employee SET status = "ready" WHERE employeeID = (SELECT employeeID FROM shipping WHERE shippingID = ?)`
        db.query(sql_statusDriverOld, [shippingID], (err, data) => {
            if (err) {
                return res.json({ success: false, message: 'Cannot change status old driver!' })
            } else {
                const sql_newCar = `UPDATE shipping SET employeeID = ? WHERE shippingID = ?`
                db.query(sql_newCar, [newDriver, shippingID], (err, data) => {
                    if (err) {
                        console.log(err);
                        return res.json({ success: false, message: 'Update driver error!' })
                    } else {
                        let sql_statusDriverNew = `UPDATE employee SET status = "unready" WHERE employeeID = ?`
                        db.query(sql_statusDriverNew, [newDriver.employeeID], (err, data) => {
                            if (err) {
                                return res.json({ success: false, message: 'Cannot set status new driver!' })
                            }
                        })
                    }
                })
            }
        })
    } else if (!newCar && oldCar) {
        console.log('Nothing update carID')
    }



    let sql_updateShipInOrderdetail = `UPDATE orderdetail SET shippingID = ? WHERE `
    let sql_value = []
    sql_value.push(shippingID)
    for (let i = 0; i < addOrderdetail.length; i++) {
        sql_updateShipInOrderdetail += 'orderdetailID = ? or '
        sql_value.push(addOrderdetail[i])
    }
    sql_updateShipInOrderdetail = sql_updateShipInOrderdetail.slice(0, -3)
    db.query(sql_updateShipInOrderdetail, sql_value, (err, data) => {
        if (err) {
            return res.json({ success: false, message: 'Cannot add orderdetail!' })
        } else {
            console.log('Add shipping in orderdetail success!')
        }
    })


    let sql_deleteShipInOrderdetail = `UPDATE orderdetail SET shippingID = "wait" WHERE `
    let sql_value4 = []
    for (let i = 0; i < addOrderdetail.length; i++) {
        sql_deleteShipInOrderdetail += 'orderdetailID = ? or '
        sql_value4.push(deleteOrderdetail[i])
    }
    sql_deleteShipInOrderdetail = sql_deleteShipInOrderdetail.slice(0, -3)
    db.query(sql_deleteShipInOrderdetail, sql_value4, (err, data) => {
        if (err) {
            return res.json({ success: false, message: 'Cannot delete orderdetail!' })
        } else {
            console.log('Delete orderdetail success!')
        }
    })










}