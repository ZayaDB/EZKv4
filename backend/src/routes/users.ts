import express from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { sendStatusChangeNotification } from '../utils/notification';

const router = express.Router();

// Request to become instructor (Student → Instructor)
router.post('/become-instructor', authenticate, authorize('STUDENT'), async (req, res) => {
  try {
    const authReq = req as AuthRequest;
    const { bio, experience, resume } = req.body;

    // Update user with instructor request
    const user = await prisma.user.update({
      where: { id: authReq.userId },
      data: {
        instructorStatus: 'PENDING',
        instructorRequestAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        instructorStatus: true,
      },
    });

    // TODO: Store instructor application details (bio, experience, resume)
    // This would require an InstructorApplication model

    // Find admin users to notify
    const admins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
    });

    // Send notifications to all admins
    for (const admin of admins) {
      await sendStatusChangeNotification(
        admin.id,
        '강사 신청 알림',
        `${user.name}님이 강사 신청을 하였습니다.`,
        `/admin/users/${user.id}`
      );
    }

    res.json({
      message: 'Instructor application submitted. Waiting for admin approval.',
      user,
    });
  } catch (error) {
    console.error('Become instructor error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Switch role: Instructor → Student
router.post('/switch-to-student', authenticate, authorize('INSTRUCTOR'), async (req, res) => {
  try {
    const authReq = req as AuthRequest;

    // User can switch back to student mode, but instructor privileges remain
    // They can switch back anytime since they're already approved
    res.json({
      message: 'Switched to student mode. You can switch back anytime.',
    });
  } catch (error) {
    console.error('Switch role error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin: Approve/Reject instructor application
router.post(
  '/:userId/approve-instructor',
  authenticate,
  authorize('ADMIN'),
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { approved } = req.body;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (approved) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            role: 'INSTRUCTOR',
            instructorStatus: 'APPROVED',
            instructorApprovedAt: new Date(),
          },
        });

        await sendStatusChangeNotification(
          userId,
          '강사 신청 승인',
          '축하합니다! 강사 신청이 승인되었습니다.',
          '/dashboard'
        );
      } else {
        await prisma.user.update({
          where: { id: userId },
          data: {
            instructorStatus: 'REJECTED',
          },
        });

        await sendStatusChangeNotification(
          userId,
          '강사 신청 거절',
          '강사 신청이 거절되었습니다. 자세한 내용은 고객센터로 문의해주세요.',
          '/profile'
        );
      }

      res.json({
        message: approved ? 'Instructor approved' : 'Instructor rejected',
      });
    } catch (error) {
      console.error('Approve instructor error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Update user profile
router.put('/me', authenticate, async (req, res) => {
  try {
    const authReq = req as AuthRequest;
    const { name, profileImage, languagePreference, themePreference } = req.body;

    const user = await prisma.user.update({
      where: { id: authReq.userId },
      data: {
        ...(name && { name }),
        ...(profileImage && { profileImage }),
        ...(languagePreference && { languagePreference }),
        ...(themePreference && { themePreference }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profileImage: true,
        languagePreference: true,
        themePreference: true,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

