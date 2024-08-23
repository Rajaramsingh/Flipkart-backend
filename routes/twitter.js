const express = require('express')
const router = express.Router();
const {createTweet,getAllTweet,getTweetById,likeTweet,commentTweet, reTweet} = "../controllers/twitter"

router.post('/tweets', createTweet);
router.get('/tweets', getAllTweet);
router.get('/tweets/:id', getTweetById);
router.post('/tweet/:id/like', likeTweet);
router.post('/tweets/:id/comment', commentTweet);
router.post('/tweets/:id:/retweet', reTweet)

module.exports= router;

