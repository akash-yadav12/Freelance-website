const express = require('express')
const book = require('../../Book-library/models/book')
const router = express.Router()
const Image = require('../models/image')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

// show all image
router.get('/', async(req,res)=>{
    try{
        const images = await Image.find({})
        res.render('admin/show',{images:images})
    }catch(e){
        console.error(e)
        res.redirect('/admin/show')
    }

})
// Upload image
router.get('/upload',(req,res)=>{
    renderNewPage(res,new Image())
})

// post image
router.post('/', async(req,res)=>{
    const image = new Image({
        description:req.body.description,
    })
    saveImage(image,req.body.image)
    try{
        const newImage = await image.save()
        // alert('Image uploaded successfully')
        res.redirect('/admin-images')
    }catch(e){
        console.error(e)
        renderNewPage(res,image,true)
    }
})

// delete image
router.delete('/:id', async (req,res)=>{
    try{
        const image = await Image.findById(req.params.id)
        await image.remove()

        res.redirect('/admin-images')
    }catch(e){
        console.error(e)
    }
})

function saveImage(image,imageEncoded){
    if(imageEncoded == null) return
    const cover = JSON.parse(imageEncoded)
    if( cover != null && imageMimeTypes.includes(cover.type)){
        image.imageName = new Buffer.from(cover.data,'base64')
        image.imageType = cover.type
    }
}
function renderNewPage(res, image, hasError = false){
    try {
        const params = {
            image: image
        }
        if(hasError){
            params.errorMessage = "Error uploading image"
        }
        res.render('admin/upload',params)
    }catch(e){
        res.redirect('/admin-images')
    }
}

module.exports = router