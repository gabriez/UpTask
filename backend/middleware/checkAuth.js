const jwt = require('jsonwebtoken')
const User = require('../models/User.js')
async function checkAuth(req, res, next) {
    let token;
    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_JWT);
            req.user = await User.findById(decoded.id).select('-createdAt -password -confirm -token -confirmation -updatedAt -__v')
            return next()
        } catch (error) {
            return res.status(404).json({msg: 'Ocurrió un error inesperado'})
        }
    }
    if (!token) {
        const error = new Error('No está autorizado')
        return res.status(401).json({msg: error.message})

    }
    next()
}

module.exports = checkAuth;