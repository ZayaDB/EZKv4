import { NotificationType } from '@prisma/client';
import prisma from './prisma';

export interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
}

export const createNotification = async (params: CreateNotificationParams) => {
  return await prisma.notification.create({
    data: {
      userId: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      link: params.link,
    },
  });
};

export const sendSuccessNotification = async (
  userId: string,
  title: string,
  message: string,
  link?: string
) => {
  return await createNotification({
    userId,
    type: NotificationType.SUCCESS,
    title,
    message,
    link,
  });
};

export const sendErrorNotification = async (
  userId: string,
  title: string,
  message: string,
  link?: string
) => {
  return await createNotification({
    userId,
    type: NotificationType.ERROR,
    title,
    message,
    link,
  });
};

export const sendStatusChangeNotification = async (
  userId: string,
  title: string,
  message: string,
  link?: string
) => {
  return await createNotification({
    userId,
    type: NotificationType.STATUS_CHANGE,
    title,
    message,
    link,
  });
};

