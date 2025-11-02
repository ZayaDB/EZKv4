import express from 'express';
import prisma from '../utils/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get user notifications
router.get('/', authenticate, async (req, res) => {
  try {
    const authReq = req as AuthRequest;
    
    const notifications = await prisma.notification.findMany({
      where: { userId: authReq.userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.json({ notifications });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Mark notification as read
router.put('/:id/read', authenticate, async (req, res) => {
  try {
    const authReq = req as AuthRequest;
    const { id } = req.params;

    const notification = await prisma.notification.updateMany({
      where: {
        id,
        userId: authReq.userId,
      },
      data: {
        isRead: true,
      },
    });

    if (notification.count === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Mark all notifications as read
router.put('/read-all', authenticate, async (req, res) => {
  try {
    const authReq = req as AuthRequest;

    await prisma.notification.updateMany({
      where: {
        userId: authReq.userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete notification
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const authReq = req as AuthRequest;
    const { id } = req.params;

    const notification = await prisma.notification.deleteMany({
      where: {
        id,
        userId: authReq.userId,
      },
    });

    if (notification.count === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get unread notification count
router.get('/unread-count', authenticate, async (req, res) => {
  try {
    const authReq = req as AuthRequest;

    const count = await prisma.notification.count({
      where: {
        userId: authReq.userId,
        isRead: false,
      },
    });

    res.json({ count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

