if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('cookie-session')
const User = require('./models/user')
const methodOverride = require('method-override')
const initializePassport = require('./passport-config')
initializePassport(passport,(id)=>{ return User.findById(id)})

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')




app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'30mb',extended:false}))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session({
    secret: `what the hell`,
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const ImageRouter = require('./routes/images')
const AuthRouter = require('./routes/auth');
const WebsiteRouter = require('./routes/website');

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.on('error',err => console.error(err))
db.once('open',()=> console.log('connected to mongodb'))

app.use('/admin-images',ImageRouter)
app.use('/admin',AuthRouter)
app.use('/',WebsiteRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log('sever listening on port 3000')
})