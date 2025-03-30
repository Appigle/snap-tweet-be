"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
};
const signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'Email already in use' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await User_1.default.create({
            email,
            username,
            password: hashedPassword,
        });
        const token = generateToken(newUser);
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = generateToken(user);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const getCurrentUser = async (req, res) => {
    var _a;
    try {
        const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=authController.js.map