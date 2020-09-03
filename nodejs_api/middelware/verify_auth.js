const jwt=require("jsonwebtoken")

module.exports=(req,res,next)=>{
      try{
          jwt.verify(req.body.token, process.env.JWT_KEY)
          next()
      }catch(erreur){
          res.status(404).json({
            Requete:{
                type:"POST",
                description:`Désolé, vous n'etes pas authentifier` 
              },
              erreur
          })
      }
}