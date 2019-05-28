const db = require('../../db');

module.exports = (req, res) => {
    const newCar = req.body.newCar;
    const oldCar = req.body.oldCar;
    const driver = req.body.employeeID;
    const statusorderdetail = req.body.orderDetail;
    
    if (newCar && !oldCar) {
        console.log('top');
        
        const sql_newCar = `INSERT INTO car (carID,carArea,carWeight,carStatus,licensePlate,model) VALUES (NULL,?,?,"ready",?,?);`
        db.query(sql_newCar, [newCar.carArea, newCar.carWeight, newCar.licensePlate, newCar.model], (err, data) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    message: 'Add car is error!'
                })
            } else {
                let car = data.insertId;
                let sql_driver = `UPDATE employee SET status = "unready" WHERE employeeID = ?;`
                db.query(sql_driver, [driver], (err, data) => {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Update status driver error!'
                        })
                    } else {

                        let sql_statusorderdetail = `UPDATE orderdetail SET status = "shipping" WHERE `
                        let sql_value = []
                        for (let i = 0; i < statusorderdetail.length; i++) {
                            sql_statusorderdetail += 'orderdetailID = ? or '
                            sql_value.push(statusorderdetail[i])
                        }
                        sql_statusorderdetail = sql_statusorderdetail.slice(0, -3)
                        db.query(sql_statusorderdetail, sql_value, (err, data) => {
                            if (err) {
                                return res.json({
                                    success: false,
                                    message: 'Add status orderdetail error!'
                                })
                            }
                             else {
                                let sql_shipping = `INSERT INTO shipping(shippingID,carID,shippingDate,employeeID) VALUES (NULL,?,CURRENT_TIMESTAMP,?)`
                                db.query(sql_shipping, [car, driver], (err, data) => {
                                    if (err) {
                                        return res.json({ success: false, message: 'Insert shipping error!' })
                                    } else {
                                        return res.json({ success: true, message: 'Add success!' })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
    else {
        if (oldCar && !newCar) {
            const sql_shipping = `INSERT INTO shipping (shippingID,carID,employeeID,shippingDate) VALUES (NULL,?,?,CURRENT_TIMESTAMP);`
            db.query(sql_shipping, [oldCar.carID, driver], (err, data) => {
                if (err) {
                    return res.json({ sucess: false, message: 'Add shipping error!' })
                } else {
                    let sql_driver = `UPDATE employee SET status = "unready" WHERE employeeID = ?;`
                    db.query(sql_driver, [driver], (err, data) => {
                        if (err) {
                            return res.json({
                                success: false,
                                message: 'Update status driver error!'
                            })
                        } else {
                            let sql_statusorderdetail = `UPDATE orderdetail SET status = "shipping" WHERE `
                            let sql_value = []
                            for (let i = 0; i < statusorderdetail.length; i++) {
                                sql_statusorderdetail += 'orderdetailID = ? or '
                                sql_value.push(statusorderdetail[i])
                            }
                            sql_statusorderdetail = sql_statusorderdetail.slice(0, -3)
                            db.query(sql_statusorderdetail, sql_value, (err, data) => {
                                if (err) {
                                    return res.json({
                                        success: false,
                                        message: 'Add status orderdetail error!'
                                    })
                                } else {
                                    return res.json({ success: true, message: 'Add success!' })
                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            return res.json({ success: false, message: 'No data!' })
        }

    }
}
