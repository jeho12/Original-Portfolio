"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const auth_1 = require("../middleware/auth");
const nodemailer_1 = __importDefault(require("nodemailer"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// In-memory fallback message store
const mockMessages = [];
// Send a message (Public endpoint)
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        let newMessage;
        let fallback = false;
        try {
            newMessage = await prisma.contactMessage.create({
                data: { name, email, message }
            });
        }
        catch (dbError) {
            console.warn('Database error during message submission, falling back to mock storage.');
            fallback = true;
            newMessage = { id: mockMessages.length + 1, name, email, message, createdAt: new Date() };
            mockMessages.push(newMessage);
        }
        // Try to send email forwarding message
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const transporter = nodemailer_1.default.createTransport({
                    host: process.env.SMTP_HOST || 'smtp.gmail.com',
                    port: parseInt(process.env.SMTP_PORT || '587'),
                    secure: process.env.SMTP_SECURE === 'true',
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });
                const mailOptions = {
                    from: `"${name}" <${process.env.SMTP_USER}>`,
                    to: process.env.SMTP_TO || 'jehoibenye@gmail.com',
                    replyTo: email,
                    subject: `Portfolio Message from ${name}`,
                    text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
                    html: `<p>You have received a new message from your portfolio contact form:</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
                };
                await transporter.sendMail(mailOptions);
                console.log(`Email successfully forwarded to ${mailOptions.to}`);
            }
            catch (mailError) {
                console.error('Failed to forward email:', mailError);
            }
        }
        else {
            console.warn('SMTP credentials (SMTP_USER/SMTP_PASS) not set in .env. Skipping email dispatch.');
        }
        return res.status(201).json({
            message: fallback ? 'Message saved successfully (Fallback Mode)' : 'Message sent successfully',
            data: newMessage
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error saving message' });
    }
});
// Get all messages (Protected Admin endpoint)
router.get('/', auth_1.authMiddleware, async (req, res) => {
    try {
        let messages;
        try {
            messages = await prisma.contactMessage.findMany({
                orderBy: { createdAt: 'desc' }
            });
        }
        catch (dbError) {
            console.warn('Database error fetching messages, returning mock list.');
            messages = [...mockMessages].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
        return res.json(messages);
    }
    catch (error) {
        return res.status(500).json({ error: 'Server error retrieving messages' });
    }
});
exports.default = router;
