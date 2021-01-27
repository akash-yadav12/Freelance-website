const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    imageName:{
        type:Buffer,
        required:true
    },
    imageType:{
        type:String,
        required:true
    }
})
imageSchema.virtual('imagePath').get(function(){
    if (this.imageName != null && this.imageType != null){
        return `data:${this.imageType}; charset-utf-8;base64,${this.imageName.toString('base64')}`
    }
})

module.exports = mongoose.model('Image',imageSchema)