import Notification from "../models/notification.js";

/**
 * Create a new notification
 */
export const createNotification = async ({ userId, message, type }) => {
  const notification = await Notification.create({
    user: userId,
    message,
    type,
  });
  return notification;
};

/**
 * Get all notifications for a user
 */
export const getUserNotifications = async (userId) => {
  return await Notification.find({ user: userId }).sort({ createdAt: -1 });
};

/**
 * Mark a notification as read
 */
export const markAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true },
    { new: true }
  );
};

/**
 * Delete a notification
 */
export const deleteNotification = async (notificationId) => {
  return await Notification.findByIdAndDelete(notificationId);
};
