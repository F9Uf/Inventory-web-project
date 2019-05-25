const db = require('../../db');

module.exports = (req, res) => {
  const sql = `SELECT o.orderID,o.createAt,o.orderType,o.shopID,s.shopName,od.status 
                FROM order o,orderdetail od,shop s
                WHERE o.orderID = od.orderID AND o.shopID = s.shopID`
                db.query(sql, (err, data) => {
                    if (err) {
                      return res.json({
                        success: false,
                        message: err
                      })
                    } else {
                      if (data) {
                        return res.json({
                          success: true,
                          message: 'Successfully!',
                          result: data
                        })
                      } else {
                        // if not found
                        return res.json({
                          success: false,
                          message: 'Fail!'
                        })
                      }
                    }
                  })
}