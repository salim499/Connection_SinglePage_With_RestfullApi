const express=require('express')
const routerOrd=express.Router()
const Order=require('../models/order.js')
const Product=require('../models/product.js')
const verifyAuth=require('../middelware/verify_auth')
const orderCont=require('../controllers/order')

routerOrd.get("/",orderCont.order_get_all)
routerOrd.get("/:id",orderCont.order_get_byId)
routerOrd.post("/", verifyAuth, orderCont.order_post)
routerOrd.patch("/:id", verifyAuth, orderCont.order_patch)
routerOrd.delete("/:id", verifyAuth, orderCont.order_delete)
module.exports=routerOrd