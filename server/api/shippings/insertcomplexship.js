/**
   * "insert into order values 
   * ('?', '?'), 
   * ('?', '?'), 
   * ('?', '?'), "
   * 
   * data = [
   *  {firstName: 'sdflkjlk', lastName: 'alkjflkj'},
   *  {firstName: 'lkjlkjlk', lastName: 'lkjlkjlkk}
   * ]
   * let sql_value =[]
   * 
   * for (let i = 0; i<data.length; i++) {
   *  sql_update += '(?, ?),'
   *  sql_value.push(data[i].firstName )
   *  sql_value.push(data[i].lastName)
   * }
   * sql_update = sql_update.splice(0, -1)
   * 
   * db.query(sql_update, sql_value, (err, data) => {
   * 
   * })
   * 
   */
const db = require('../../db');

module.exports = (req, res) => {
    const newCar = req.body.newCar;
    const oldCar = req.body.oldCar;
    const driver = req.body.employeeID;
    const statusorderdetail = req.body.orderDetail;
    if (newCar && !oldCar) {
        let sql_newCar = `INSERT INTO car (carID,carArea,carWeight,carStatus,licensePlate,model) VALUES (NULL,?,?,"ready",?,?);`
        db.query(sql_newCar, [newCar.carArea, newCar.Weight, newCAr.licensePlate, newCar.model], (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Add car is error!'
                })
            } else {
                let carID = data.insertId;
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
                        sql_statusorderdetail = sql_statusorderdetail.splice(0, -3)
                        db.query(sql_update, sql_value, (err, data) => {
                            if (err) {
                                return res.json({
                                    success: false,
                                    message: 'Add status orderdetail error!'
                                })
                            } else {
                                let sql_shipping = `INSERT INTO shipping(shippingID,carID,shippingDate,employeeID) VALUES (NULL,?,CURRENT_TIMESTAMP,?)`
                                db.query(sql_shipping, [carID, driver], (err, data) => {
                                    if (err) {
                                        return res.json({ success: false, message: 'Insert shipping error!' })
                                    } else {
                                        return res.json({ success: True, message: 'Add success!' })
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
            let sql_shipping = `INSERT INTO shipping(shippingID,carID,shippingDate,employeeID) VALUES (NULL,?,CURRENT_TIMESTAMP,?);`
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
                            sql_statusorderdetail = sql_statusorderdetail.splice(0, -3)
                            db.query(sql_update, sql_value, (err, data) => {
                                if (err) {
                                    return res.json({
                                        success: false,
                                        message: 'Add status orderdetail error!'
                                    })
                                } else {
                                    return res.json({ success: True, message: 'Add success!' })
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
