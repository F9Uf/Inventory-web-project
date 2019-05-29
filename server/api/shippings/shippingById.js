const db = require('../../db');

module.exports = (req, res) => {
    const shippingID = req.params.shippingID;
    const sql = `select * from shipping s, employee e, car c, orderdetail o
    where s.carID = c.carID and s.employeeID = e.employeeID and s.shippingID = o.shippingID and s.shippingID = ?`
    db.query(sql,[shippingID], (err, data) => {
        if(err) {
            return res.json({
                success: false,
                message: err
            })
        } else {
            if (data) {
                return res.json({
                    success: true,
                    message: 'Successfully found shipping!',
                    result: {
                        car: {
                            carID: data[0].carID,
                            carArea: data[0].carArea,
                            carWeight: data[0].carWeight,
                            carStatus: data[0].carStatus,
                            licensePlate: data[0].licensePlate,
                            model:data[0].model
                        },
                        driver:{
                            employeeID: data[0].employeeID,
                            employeeFirstName: data[0].employeeFirstName,
                            employeeLastName: data[0].employeeLastName,
                            employeePhotoUrl: data[0].employeePhotoUrl,
                            employeePhone: data[0].employeePhone,
                            employeeEmail: data[0].employeeEmail,
                            salary: data[0].salary,
                            username: data[0].username,
                            password: data[0].password,
                            sex: data[0].sex,
                            stockID: data[0].stockID,
                            positionID: data[0].positionID,
                            status: data[0].status,
                            addressID: data[0].addressID

                        },

                        orderDetail: data
                    }
                })
            } else {
                return res.json({
                    success: false,
                    message: 'Fail, not found shipping!'
                })
            }
        }
    })
}