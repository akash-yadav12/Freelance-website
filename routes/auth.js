const express = require('express')
const router = express.Router()

const AuthController = require('../controller/AuthController')
// const router = require('./images')

// router.get('/register',(req,res)=>{
//     res.render('admin/register')
// })

router.post('/register', AuthController.register)

module.exports = router