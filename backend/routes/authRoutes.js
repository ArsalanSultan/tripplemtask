const express = require('express')
const { register, login, getAllUsers } = require('../controllers/auth')
const {payment} = require('../controllers/payment')
const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/payment').post(payment)
router.route('/getallusers').get(getAllUsers)

module.exports = router
