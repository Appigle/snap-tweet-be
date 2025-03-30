"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweet = exports.likeTweet = exports.getTweets = exports.createTweet = void 0;
const Tweet_1 = __importDefault(require("../models/Tweet"));
const createTweet = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (!req.body.content || req.body.content.trim() === '') {
            res.status(400).json({ error: 'Content is required' });
            return;
        }
        const tweet = await Tweet_1.default.create({
            content: req.body.content,
            user: req.user.id,
        });
        res.status(201).json(tweet);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createTweet = createTweet;
const getTweets = async (_req, res) => {
    try {
        const tweets = await Tweet_1.default.find()
            .populate('user', 'username')
            .sort({ createdAt: -1 });
        res.json(tweets);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : 'Internal server error',
        });
    }
};
exports.getTweets = getTweets;
const likeTweet = async (req, res) => {
    try {
        const tweet = await Tweet_1.default.findById(req.params.id);
        if (!tweet) {
            res.status(404).json({ error: 'Tweet not found' });
            return;
        }
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (tweet.likes.includes(req.user.id)) {
            tweet.likes = tweet.likes.filter((userId) => { var _a; return userId.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); });
        }
        else {
            tweet.likes.push(req.user.id);
        }
        await tweet.save();
        res.json(tweet);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.likeTweet = likeTweet;
const deleteTweet = async (req, res) => {
    try {
        const tweet = await Tweet_1.default.findById(req.params.id);
        if (!tweet) {
            res.status(404).json({ error: 'Tweet not found' });
            return;
        }
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        if (tweet.user.toString() !== req.user.id) {
            res.status(403).json({ error: 'Not authorized to delete this tweet' });
            return;
        }
        await tweet.deleteOne();
        res.json({ message: 'Tweet deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteTweet = deleteTweet;
//# sourceMappingURL=tweetController.js.map