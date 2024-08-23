const Tweet  = require("../models/twitter");
const User = require("../models/user");
const comment = require('../models/comment')

async function createTweet(req,res) {
    try{
        const {content, author} = req.body;
        const tweet = new Tweet ({content, author});
        await tweet.save();
        res.status(201).json(tweet);

    }
    catch(error){
        res.status(400).json({error: error.message})
    }
};

async function getAllTweet(req, res){
    try{
        const tweets = await Tweet.find()
        .populate({
            path: 'author',
            select: 'username',
        })
        .populate({
            path: 'likes',
            select: 'username',
        })
        .populate({
            path: 'comments',
            select: 'content author',
            populate: {
                path: 'author',
                select: 'username'
            }
        })
        res.status(200).json(tweets);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'server error'});
    }
}
async function getTweetById (req, res){
    try {
        const tweet = await Tweet.findById(req.params.id)
        .populate({
            path: 'author',
            select: 'username',
        })
        .populate({
            path: 'likes',
            select: 'username',
        })
        .populate({
            path: 'comments',
            select: 'content author'
        })

        if(!tweet) return res.status(404).json({error: 'Tweet not found'})

            res.status(200).json(tweet);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'server error'})
    }
}