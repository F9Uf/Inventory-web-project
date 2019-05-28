const db = require('../../db');

module.exports = (req, res) => {
    //employee
    //const empID = req.body.empID;
    const empFirstName = req.body.empFirstName;
    const empLastName = req.body.empLastName;
    const empPhotoUrl = req.body.empPhotoUrl;
    const empPhone = req.body.empPhone;
    const empEmail = req.body.empEmail;
    const empSalary = req.body.empSalary;
    const empUsername = req.body.empUsername;
    const empPassword = req.body.empPassword;
    const empSex = req.body.empSex;
    const stockID = req.body.stockID;
    const positionID = req.body.positionID;
    const status = req.body.status;
    const addressID = req.body.addressID;

    //position
    const posName = req.body.posName;
    const posSpecific = req.body.posSpecific;

    //address
    const addressDetail = req.body.addressDetail;
    const subDistrict = req.body.subDistrict;
    const district = req.body.district;
    const province = req.body.province;
    const postalCode = req.body.postalCode;

    //new-old
    const newPosition = req.body.newPosition;
    const oldPosition = req.body.oldPosition;
    const newAddress = req.body.newAddress;
    const oldAddress = req.body.oldAddress;


    const sqlEmp = `INSERT INTO EMPLOYEE VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const sqlPos = `INSERT INTO POSITION VALUES(NULL,?,?)`;
    const sqlAddress = `INSERT INTO ADDRESS VALUES(NULL,?,?,?,?,?)`;

    //insert position
    db.query(sqlPos, [posName, posSpecific], (err, dataPos) => {
        if (err) {
            return res.json({
                success: false,
                message: 'Create position is error!'
            })
        }
        else if (newPosition && !oldPosition) {
            return res.json({
                success: false,
                message: 'This position has existed.'
            })

        }
        else {
            if (dataPos) {
                //insert address
                db.query(sqlAddress, [addressDetail, subDistrict, district, province, postalCode], (err, dataAddress) => {
                    if (err) {
                        return res.json({
                            success: false,
                            message: 'Create address is error!'
                        })
                    }
                    else if (newAddress && !oldAddress) {
                        return res.json({
                            success: false,
                            message: 'This address has existed.'
                        })
                    }

                    else {//insert emp
                        if (dataAddress) {
                            db.query(sqlEmp, [empFirstName, empLastName, empPhotoUrl, empPhone, empEmail, empSalary, empUsername, empPassword, empSex, stockID, positionID, status, addressID], (err, dataEmp) => {
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
            }

        }
    })






}
