const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const passport = require('passport')


router.get('/',checkNotAuthenticated,(req,res)=>{
    res.redirect('admin-images')
})
router.get('/login',checkNotAuthenticated,(req,res)=>{
    res.render('admin/login')
})
router.get('/register',checkNotAuthenticated,(req,res)=>{
    res.render('admin/register')
})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/admin-images',
    failureRedirect:'/admin/login',
    failureFlash:true
}))

router.post('/register', async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = await new User({
            name: req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        await user.save()
        console.log('added user')
        res.redirect('/admin/login')
    }catch{
        res.redirect('/admin/register')
    }
})

// logout
router.delete('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/admin/login')
})

function checkNotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/admin-images')
    }
    next()
}
module.exports = router