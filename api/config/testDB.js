"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeTestDB = exports.connectTestDB = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongoServer;
const connectTestDB = async () => {
    try {
        mongoose_1.default.set("strictQuery", false);
        if (!mongoServer) {
            mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        }
        const mongoUri = mongoServer.getUri();
        if (mongoose_1.default.connection.readyState === 0) {
            await mongoose_1.default.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB Memory Server");
        }
    }
    catch (error) {
        console.error("MongoDB Memory Server Error:", error);
        throw error;
    }
};
exports.connectTestDB = connectTestDB;
const closeTestDB = async () => {
    try {
        if (mongoServer) {
            await mongoose_1.default.connection.dropDatabase();
            await mongoose_1.default.connection.close();
            await mongoServer.stop();
            console.log("Disconnected from MongoDB Memory Server");
        }
    }
    catch (error) {
        console.error("Error closing MongoDB Memory Server:", error);
        throw error;
    }
};
exports.closeTestDB = closeTestDB;
//# sourceMappingURL=testDB.js.map