const Cart = require('../models/cart');

const addToCart = async (req,res) => {
    try{
        const {itemId, quantity} = req.body;
        const userId = req.user.id;

        const cartItem = await Cart.findOneAndUpdate(
            {userId, itemId},
            {$inc: {quantity} },
            {new: true, upsert: true}
        );

        res.status(200).json(cartItem);
    }
    catch(error){
        res.status(500).send('Server error')
    }
}
const getCart = async (req,res) => {
    try{
        const userId = req.user.id;
        const cart = await Cart.find({userId})
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(500).send('Server error')
    }
}

const deleteCart = async (req, res) =>{
    try{
        const userId = req.user.id;
        const {id} = req.params;

        await Cart.findOneAndDelete({userId, itemId: id});
        res.status(200).send('Item removed from cart');
    }
    catch (error) {
        res.status(500).send('Server error')
    }
}

const increaseCart = async (req, res) =>{
    try {
        const userId = req.user.id;
        const {id} = req.params;

        const cartItem = await Cart.findOne({userId, itemId: id});

        if(cartItem){
            cartItem.quantity +=1;
            await cartItem.save();
            res.status(200).json(cartItem);
        }
        else{
            res.status(404).send('Item not found')
        }
    }
    catch (error) {
        res.status(500).send('Server error')
    }
}

const decreaseCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const {id} = req.params;

        const cartItem = await Cart.findOne({userId, itemId:id});

        if(cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                await cartItem.save();
                res.status(200).json(cartItem);
            }
            else{
                await Cart.findOneAndDelete({userId, itemId: id});
                res.status(200).send('Item removed from cart')
            }
        }
        else{
            res.status(404).send('Item not found')
        }


    }
    catch (error) {
        res.status(500).send('Server error')
    }
}
module.exports ={
    addToCart,
    getCart,
    deleteCart,
    increaseCart,
    decreaseCart
}