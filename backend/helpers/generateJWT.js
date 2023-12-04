const jwt = require('jsonwebtoken')

const generateJWT = (data = {}) => {
    return jwt.sign(data, process.env.SECRET_JWT, {
        expiresIn: "1h"
    })
}

module.exports = generateJWT