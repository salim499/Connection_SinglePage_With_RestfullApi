const Product=require('../models/product.js')
const mongoose=require('mongoose')
exports.product_get_all=(req,res,next)=>{
    Product.find()
    .select("price name _id type rating warranty_years available id")
    .exec()
    .then(Produits => {
      console.log(Produits);
      res.status(200).json({
          Requete:{
              type:"GET",
              description:"La liste de tout les produits"
          }, 
            Produits
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        Requete:{
            type:"GET",
            description:"La requete n'a pas pu s'éxecuter"
        },
        error: err
      });
    });
}
exports.product_get_byId=(req,res,next)=>{
    const idP=req.params.id
    Product.findById(idP)
    .select("price name _id type rating warranty_years available id")
    .exec()
    .then((produit)=>{
        console.log(produit)
        res.status(200).json({
            Requete:{
              type:"GET",
              description:`recupération du produit ${idP}` 
            },
            produit,
        })
    }).catch((err)=>{
        console.log("error")
         res.status(500).json({
            error: err
          });
    })
}
exports.product_post=(req, res, next)=>{
    const product= new Product({
        _id: new mongoose.Types.ObjectId(),
        id:req.body.id,
        name:req.body.name,
        type:req.body.type,
        price:req.body.price,
        rating:req.body.rating,
        warranty_years:req.body.warranty_years,
        available:req.body.available
    })
    product.save().then(result=>{
        console.log(result)
        res.status(200).json({
            Requete:{
                type:"POST",
                description:`le produit avec le nom ${req.body.name} est ajouter avec succés`
            },
            product
        })
    })
    .catch(e=>{
        console.log(e) 
        res.status(500).json({
            Requete:{
                type:"POST",
                description:`malheuresement le produit avec le nom ${req.body.name} n'a pas pu etre ajouter avec succés`
            },    
            e
        })
    })
}
exports.product_patch=(req, res,next)=>{
    const id=req.params.id
    Product.update({_id:id},{$set:{id:req.body.id, name:req.body.name, type:req.body.type, price:req.body.price, rating:req.body.rating, warranty_years:req.body.warranty_years, available:req.body.available}}).exec()
    .then((data)=>{
        res.status(200).json({
            Requete:{
                type:"PATCH",
                description:`le produit ${id} est mis à jour avec succés`
            },
            data
        })
    })
    .catch((err)=>{
        res.status(500).json({
            Requete:{
                type:"PATCH",
                description:`le produit ${id} n'est pas mis à jour avec succés`
            },       
            err     
        })
    })
}
exports.product_delete=(req, res, next)=>{
    const id=req.params.id
    Product.remove({_id:id}).exec()
    .then((data)=>{
        console.log(data)
        res.status(200).json({
            Requete:{
                type:"DELETE",
                description:`le produit ${id} est supprimer avec succés`
            },
            data
        })
    }).catch((error)=>{
        console.log(error)
        res.status(200).json({
           Requete:{
               type:"DELETE",
               description:`le produit ${id} n'est pas supprimer avec succés`
           },             
           error
        })
    })
}