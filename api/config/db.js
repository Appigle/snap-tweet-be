"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || '');
        if (process.env.NODE_ENV !== 'test') {
            console.log('✅ MongoDB Connected');
        }
    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1);
        }
        else {
            throw new Error('DB connection failed');
        }
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map