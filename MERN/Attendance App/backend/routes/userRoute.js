const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getSingleUser, getAllUsers} = require('../controllers/userController')
const {protect} = require('../middlewares/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', protect, getSingleUser)
router.get('/getUsers', protect, getAllUsers)

module.exports = router;