const express = require('express');
const checkAuth = require('../middleware/checkAuth.js')
const { register, login, confirm, forgotPassword, confirmPassword, newPassword, profile } = require('../controllers/userController.js')

const router = express.Router();

// Public routes
router.post('/register', register)
router.post('/login', login)
router.get('/confirm/:token', confirm)
router.post('/forgot-password', forgotPassword)
router.route('/confirm-password/:token').get(confirmPassword).post(newPassword)

// Private routes 
router.get('/profile', checkAuth, profile)


module.exports = router