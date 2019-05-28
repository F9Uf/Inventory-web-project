const db = require('../../db');

module.exports = (req, res) => {
    // //employee
    // //const empID = req.body.empID;
    const employeeFirstName = req.body.employeeFirstName;
    const employeeLastName = req.body.employeeLastName;
    const employeePhotoUrl = req.body.employeePhotoUrl;
    const employeePhone = req.body.employeePhone;
    const employeeEmail = req.body.employeeEmail;
    const salary = req.body.salary;
    const username = req.body.username;
    const password = req.body.password;
    const sex = req.body.sex;
    const stockID = req.body.stockID;
    // const positionID = req.body.positionID;
    const status = req.body.status;
    // const addressID = req.body.addressID;

    // //position
    // const posName = req.body.posName;
    // const posSpecific = req.body.posSpecific;

    // //address
    // const addressDetail = req.body.addressDetail;
    // const subDistrict = req.body.subDistrict;
    // const district = req.body.district;
    // const province = req.body.province;
    // const postalCode = req.body.postalCode;

    // //new-old
    const newPosition = req.body.newPosition;
    const oldPosition = req.body.oldPosition;
    const newAddress = req.body.newAddress;
    const oldAddress = req.body.oldAddress;






    if (newPosition && !oldPosition) {

        const sqlNewPosition = `INSERT INTO POSITION VALUES(NULL,?,?)`;
        db.query(sqlNewPosition, [newPosition.positionName, newPosition.positionSpecific], (err, data) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Create position is error!'
                })
            }

            else {
                if (newAddress && !oldAddress) {

                    //insert address
                    const sqlNewAddress = `INSERT INTO ADDRESS VALUES(NULL,?,?,?,?,?)`;

                    db.query(sqlNewAddress, [newAddress.addressDetail, newAddress.subDistrict, newAddress.district, newAddress.province, newAddress.postalCode], (err, data) => {
                        if (err) {
                            return res.json({
                                success: false,
                                message: 'Create address is error!'
                            })
                        }

                        else {//insert emp
                            if (data) {
                                const sqlEmployee = `INSERT INTO EMPLOYEE VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                                db.query(sqlEmployee, [employeeFirstName, employeeLastName, employeePhotoUrl, employeePhone, employeeEmail, salary, username, password, sex, stockID, newPosition.positionID, status, newAddress.addressID], (err, data) => {
                                    if (err) {
                                        return res.json({
                                            success: false,
                                            message: 'Create employee is error!'
                                        })
                                    }
                                    else {
                                        return res.json({
                                            success: true,
                                            message: 'Create employee is successful!'
                                        })
                                    }
                                })
                            }

                        }
                    })
                } else {
                    if (oldAddress && !newAddress) {
                        const sqlEmployee = `INSERT INTO EMPLOYEE VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                        db.query(sqlEmployee, [employeeFirstName, employeeLastName, employeePhotoUrl, employeePhone, employeeEmail, salary, username, password, sex, stockID, newPosition.positionID, status, oldAddress.addressID], (err, data) => {
                            if (err) {
                                return res.json({
                                    success: false,
                                    message: 'Create employee is error!'
                                })
                            }
                            else {
                                return res.json({
                                    success: true,
                                    message: 'Create employee is successful!'
                                })
                            }
                        })
                    
                    }else {
                        return res.json({ success: false, message: 'No data!' })
                    }



                }

            }
        })
    }
    else {
        if (oldPosition && !newPosition) {
            if (newAddress && !oldAddress) {

                //insert address
                const sqlNewAddress = `INSERT INTO ADDRESS VALUES(NULL,?,?,?,?,?)`;

                db.query(sqlNewAddress, [newAddress.addressDetail, newAddress.subDistrict, newAddress.district, newAddress.province, newAddress.postalCode], (err, data) => {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Create address is error!'
                        })
                    }

                    else {//insert emp
                        if (data) {
                            const sqlEmployee = `INSERT INTO EMPLOYEE VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                            db.query(sqlEmployee, [employeeFirstName, employeeLastName, employeePhotoUrl, employeePhone, employeeEmail, salary, username, password, sex, stockID, newPosition.positionID, status, newAddress.addressID], (err, data) => {
                                if (err) {
                                    return res.json({
                                        success: false,
                                        message: 'Create employee is error!'
                                    })
                                }
                                else {
                                    return res.json({
                                        success: true,
                                        message: 'Create employee is successful!'
                                    })
                                }
                            })
                        }

                    }
                })
            }else {
                if (oldAddress && !newAddress) {
                    const sqlEmployee = `INSERT INTO EMPLOYEE VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                    db.query(sqlEmployee, [employeeFirstName, employeeLastName, employeePhotoUrl, employeePhone, employeeEmail, salary, username, password, sex, stockID, newPosition.positionID, status, oldAddress.addressID], (err, data) => {
                        if (err) {
                            return res.json({
                                success: false,
                                message: 'Create employee is error!'
                            })
                        }
                        else {
                            return res.json({
                                success: true,
                                message: 'Create employee is successful!'
                            })
                        }
                    })
                
                }
                else {
                    return res.json({ success: false, message: 'No data!' })
                }

            }


        }








    }








}
