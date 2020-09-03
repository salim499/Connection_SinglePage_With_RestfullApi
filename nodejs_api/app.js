const express=require('express')
const app=express()
const morgan=require('morgan')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')


const routerPro=require('./routes/product')
const routerOrd=require('./routes/order')
const routerUser=require('./routes/user')


mongoose.connect('mongodb+srv://shassounasalim:'+process.env.MONGO_ATLAS_PW+'@node-rest-shop.mba9d.mongodb.net/<dbname>?retryWrites=true&w=majority',{
    useMongoClient:true
    
})
mongoose.Promise=global.Promise
app.use(morgan('dev'))

//app.use(express.static('images'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    )
    if (req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

app.use('/product',routerPro)
app.use('/order',routerOrd)
app.use('/user',routerUser)

app.use((req,res,next)=>{
    const erreur=new Error()
    erreur.status=404
    res.status(erreur.status || 500)
    res.json({
        message: erreur.message
    })
})

module.exports=app