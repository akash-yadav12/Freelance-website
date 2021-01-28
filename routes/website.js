const express = require('express')
const router = express.Router()
const Image = require('../models/image')

router.get('/',(req,res)=>{
    res.render('website/index')
})

// show all featured Images
router.get('/featured-images', async(req,res)=>{
    try{
        const images = await Image.find({})
        res.render('website/featured-images',{images:images})
    }catch(e){
        console.error(e)
    }
})
router.get('/featured-videos', (req,res)=>{
    res.render('website/featured-videos')
})

module.exports = router