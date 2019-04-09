const jwt = require('jsonwebtoken');
const config_key = require('../../config/config_key');

module.exports = (...allowed) => {
    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {
        let token = req.headers['authorization'];

        if (token) {
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            }

            jwt.verify(token, config_key.jwtSecret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Token is not valid'
                    })
                } else {
                    if (decoded && allowed.length === 0) {
                        next();
                    }
                    else if (decoded && isAllowed(decoded.role)) {
                        next();
                    }
                    else {
                        return res.status(403).json({
                            success: false,
                            message: 'Forbidden'
                        });
                    }
                }
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Auth token is not found!'
            });
        }
    }
}