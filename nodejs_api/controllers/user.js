const mongoose=require('mongoose')
const User=require("../models/user")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


exports.user_post_signup=(req, res, next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((e)=>{
        if(e.length==0){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    console.log(err)
                   return res.status(500).json({
                        error:err
                    })
                }else{
                    console.log('saha')
                    const user=new User({
                        _id: new mongoose.Types.ObjectId,
                        email:req.body.email,
                        password:hash
                    })
                    user.save()
                    .then((data)=>{
                        console.log(data)
                        return res.status(200).json({
                            Requete:{
                                type:"POST",
                                description:"Vous etes inscrit avec succès"
                            },
                            data
                        })
                        
                    })
                    .catch((error)=>{
                        return res.status(400).json({
                            Requete:{
                                type:"POST",
                                description:"Inscription échoué"
                            },
                        error
                        })
                    })
                }
            })
        }else{
            return res.status(200).json({
                Requete:{
                    type:"POST",
                    description:"Inscription échoué car cet email existe déjà, essayer une adresse email"
                },                
            })
        }
    })
}
exports.user_post_login=(req,res,next)=>{
    User.find({email:req.body.email}).exec()
    .then((user)=>{
        console.log(user)
        if(user.length<1){
            res.status(401).json({
                Requete:{
                    type:"POST",
                    description:"Authentification échoué, vérifie votre adresse"
                }
            })
        }else{
            let token=jwt.sign({
                email: user[0].email,
                password: user[0].password
            },process.env.JWT_KEY,
            { expiresIn: '1h' })
            res.status(200).json({
                Requete:{
                    type:"POST",
                    description:"Authentification réussie, vous pouvez utiliser l'api"
                },
                token
            })           
        }
    })
}
exports.user_get_all=(req,res,next)=>{
    User.find()
    .exec()
    .then((Users)=>{
        res.status(200).json({
            Requete:{
                type:"GET",
                description:"liste des utilisateurs"
            },   
            Users          
        })
    })
    .catch((erreur)=>{
        res.status(404).json({
            Requete:{
                type:"GET",
                description:"la liste des utilisateurs ne peut pas etre retourner aya saha"
            }, 
            erreur  
        })     
    })
}
exports.user_delete=(req,res,next)=>{
    User.findById(req.params.id).exec()
    .then((existe)=>{
        if(existe){
            User.remove({_id:req.params.id})
            .exec()
            .then((user)=>{
                res.status(200).json({
                    Requete:{
                        type:"DELETE",
                        description:`l'utilisateur ${req.params.id} est supprimer`
                    },              
                })      
            })
            .catch((erreur)=>{
              res.status(500).json({
                Requete:{
                    type:"DELETE",
                    description:`l'utilisateur ${req.params.id} n'est pas supprimer`
                }, 
                erreur           
              })        
            })
        }else{
            res.status(500).json({
                Requete:{
                    type:"DELETE",
                    description:`l'utilisateur ${req.params.id} n'existe pas`
                }           
            })
        }

    })
    .catch((non)=>{
        res.status(500).json(non)
    })
}