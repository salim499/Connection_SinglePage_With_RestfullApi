const Order=require('../models/order.js')
const Product=require('../models/product.js')
const mongoose=require('mongoose')
exports.order_get_all=(req,res,next)=>{
    Order.find()
    .select("quantite productID")
    .populate('productID','name price')
    .exec()
    .then((Commandes)=>{
        console.log(Commandes)
        res.status(200).json({
            Requete:{
                type:"GET",
                description:"la liste de toutes les commandes"
            },
            Commandes
        })
    })
    .catch((erreur)=>{
        console.log(erreur)
        res.status(200).json({
           Requete:{
               type:"GET",
               description:"Erreur dans la récupération de la liste de toutes les commandes"
           },
           erreur             
        })
    })
}
exports.order_get_byId=(req,res,next)=>{
    const id=req.params.id
    Order.find({_id:id})
    .select("quantite productID _id")
    .populate('productID','name price')
    .exec()
    .then((Commande)=>{
        console.log(Commande)
        if(Commande.length<1){
            res.status(500).json({
                Requete:{
                    type:"GET",
                    description:`vérifie l'id, récupération de commande échoué`
                },            
            })           
        }else{
            res.status(200).json({
                Requete:{
                    type:"GET",
                    description:`recupération de la commande ${id}`
                },
                Commande
            })
        }           
    })
    .catch((erreur)=>{
        console.log(erreur)
        res.status(404).json({
            Requete:{
                type:"GET"
            },       
            erreur     
        })
    })
}
exports.order_post=(req, res, next)=>{
    Product.findById(req.body.productID)
    .exec()
    .then((product)=>{
        const order=new Order({
            _id: new mongoose.Types.ObjectId(),
            quantite: req.body.quantite,
            productID: product.id
        })
        order.save()
        .then((Commande)=>{
            console.log(Commande)
            res.status(201).json({
                Requete:{
                    type:"POST",
                    description:`la commande avec la quantité ${req.body.quantite} à été ajouté avec succés`
                },
                Commande
            })
        })
        .catch((erreur)=>{
            console.log(erreur)
            res.status(500).json({
                Requete:{
                    type:"POST"
                },
                erreur           
            })
        })
    }).catch((erreur)=>{
        console.log(erreur)
        res.status(500).json(
            {
                Requete:{
                    type:"POST"
                },
                erreur                
            })
    })
}
exports.order_patch=(req,res,next)=>{
    const id=req.params.id
    Order.update({_id:id},{$set:{quantite:req.body.quantite}}).exec()
    .then((data)=>{
        console.log(data)
        res.status(200).json({
         Requete:{
             type:"PATCH",
             description:`la commande ${id} est mise à jour`
         },        
        })
    }).catch((erreur)=>{
        console.log(erreur)
        res.status(200).json({
         Requete:{
             type:"PATCH",
             description:`la commande ${id} n'est pas mise à jour`
         }, 
         erreur
        })
    })
}
exports.order_delete=(req,res,next)=>{
    const id=req.params.id
    Order.remove({_id:id}).exec()
    .then((data)=>{
        console.log(data)
        res.status(200).json({
            Requete:{
                type:"DELETE",
                description:`la commande ${id} est supprimer`
            }
        })
    })
    .catch((erreur)=>{
        console.log(erreur)
        res.status(200).json({
            Requete:{
                type:"DELETE",
                description:`la commande ${id} n'est pas supprimer`
            },
            erreur
        })
    })
}