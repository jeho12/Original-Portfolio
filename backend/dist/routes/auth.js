"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const secret = process.env.JWT_SECRET || 'super-secret-jwt-key-for-portfolio-development';
// In-memory fallback registry
const mockUsers = [];
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        let user;
        let fallback = false;
        try {
            user = await prisma.user.create({
                data: { email, password: hashedPassword, name }
            });
        }
        catch (dbError) {
            console.warn('Database error during user registration, falling back to mock storage.');
            fallback = true;
            if (mockUsers.some(u => u.email === email)) {
                return res.status(400).json({ error: 'User already exists' });
            }
            user = { id: mockUsers.length + 1, email, name, createdAt: new Date() };
            mockUsers.push({ ...user, password: hashedPassword });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1d' });
        return res.status(201).json({
            message: fallback ? 'Registered successfully (Fallback Registry)' : 'User registered successfully',
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error during registration' });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        let user = null;
        let passwordMatch = false;
        try {
            user = await prisma.user.findUnique({ where: { email } });
            if (user) {
                passwordMatch = await bcryptjs_1.default.compare(password, user.password);
            }
        }
        catch (dbError) {
            console.warn('Database error during user login, falling back to mock storage.');
            user = mockUsers.find(u => u.email === email);
            if (user) {
                passwordMatch = await bcryptjs_1.default.compare(password, user.password);
            }
        }
        if (!user || !passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1d' });
        return res.json({
            token,
            user: { id: user.id, email: user.email, name: user.name }
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error during login' });
    }
});
exports.default = router;
