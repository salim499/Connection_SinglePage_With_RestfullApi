const express=require('express')
const routerPro=express.Router()
const Product=require('../models/product')
const multer=require('multer')
const verifyAuth=require('../middelware/verify_auth')
const productCont=require('../controllers/product')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './images')
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload=multer({ storage:storage})

routerPro.get("/",productCont.product_get_all)
routerPro.get("/:id",productCont.product_get_byId)
routerPro.post("/",upload.single('image'),verifyAuth, productCont.product_post)  
   
routerPro.post("/patch/:id", verifyAuth,productCont.product_patch)
routerPro.post("/delete/:id", verifyAuth,productCont.product_delete)
module.exports=routerPro