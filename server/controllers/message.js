import MessageModal from "../models/message.js";

export const getMessages = async (room) => {
  return new Promise((resolve, reject) => {
    MessageModal.find({ room }) // Filter by room
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(50) // Limit to 100 messages
      .then((messages) => {
        resolve(JSON.stringify(messages));
      })
      .catch((error) => {
        reject({ message: error.message });
      });
  });
};

export const saveMessage = async (message, username, room) => {
  const data = { message, username, room };
  return new Promise((resolve, reject) => {
    MessageModal.create(data).catch((error) => {
      reject({ message: error.message });
    });
  });
};
