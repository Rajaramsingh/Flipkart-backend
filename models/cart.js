const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
         required: true
    },
    
        itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },

        quantity:{
            type:Number,
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        }
    
   
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;