const express=require('express')
const userRouter=express.Router()
const userCon=require('../controllers/user')
const verifyAuth=require('../middelware/verify_auth')


userRouter.post('/signup',userCon.user_post_signup)
userRouter.post('/login',userCon.user_post_login)
userRouter.get('/',userCon.user_get_all)
userRouter.delete('/:id',verifyAuth, userCon.user_delete)

module.exports=userRouter