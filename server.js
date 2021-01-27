if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')




app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'30mb',extended:false}))
app.use(methodOverride('_method'))

const imageRouter = require('./routes/images')
const AuthRouter = require('./routes/auth')

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.on('error',err => console.error(err))
db.once('open',()=> console.log('connected to mongodb'))

app.use('/admin-images',imageRouter)
app.use('/admin',AuthRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log('sever listening on port 3000')
})