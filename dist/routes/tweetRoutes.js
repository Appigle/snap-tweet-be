"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tweetController_1 = require("../controllers/tweetController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/tweets', authMiddleware_1.authMiddleware, tweetController_1.createTweet);
router.get('/tweets', tweetController_1.getTweets);
router.post('/tweets/:id/like', authMiddleware_1.authMiddleware, tweetController_1.likeTweet);
router.delete('/tweets/:id', authMiddleware_1.authMiddleware, tweetController_1.deleteTweet);
exports.default = router;
//# sourceMappingURL=tweetRoutes.js.map