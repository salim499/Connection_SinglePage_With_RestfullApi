const mongoose=require('mongoose')

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quantite: { type: Number, required:true },
    productID:{ type: mongoose.Schema.Types.ObjectId, ref:'Product', required:true}
})
module.exports=mongoose.model('Order',orderSchema)