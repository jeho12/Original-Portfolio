import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();
const router = Router();

// In-memory fallback message store
const mockMessages: any[] = [];

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
    } catch (dbError) {
      console.warn('Database error during message submission, falling back to mock storage.');
      fallback = true;
      newMessage = { id: mockMessages.length + 1, name, email, message, createdAt: new Date() };
      mockMessages.push(newMessage);
    }

    return res.status(201).json({
      message: fallback ? 'Message saved successfully (Fallback Mode)' : 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error saving message' });
  }
});

// Get all messages (Protected Admin endpoint)
router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    let messages;
    try {
      messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (dbError) {
      console.warn('Database error fetching messages, returning mock list.');
      messages = [...mockMessages].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    return res.json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Server error retrieving messages' });
  }
});

export default router;
