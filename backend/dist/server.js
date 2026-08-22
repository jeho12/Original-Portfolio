"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const messages_1 = __importDefault(require("./routes/messages"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/messages', messages_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date(),
        service: 'Express Portfolio API'
    });
});
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔧 Health check: http://localhost:${PORT}/health`);
    console.log(`💾 Fallback Mode: Active (will bypass MySQL errors)`);
    console.log(`==================================================`);
});
