"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const tweetRoutes_1 = __importDefault(require("./routes/tweetRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.default)();
app.use('/api/auth', authRoutes_1.default);
app.use('/api', tweetRoutes_1.default);
if (process.env.NODE_ENV !== 'test') {
    const PORT = parseInt(process.env.PORT || '5000', 10);
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
}
exports.default = app;
//# sourceMappingURL=server.js.map