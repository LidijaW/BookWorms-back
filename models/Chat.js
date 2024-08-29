import admin from "firebase-admin";
const db = admin.firestore();


export const createChat = async (chatData) => {
  const chatRef = db.collection("chats").doc();
  await chatRef.set(chatData);
  return chatRef.id;
};

d
export const getChatsByAdId = async (adId) => {
  const snapshot = await db.collection("chats").where("ad", "==", adId).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};


export const getChatById = async (id) => {
  const chatRef = db.collection("chats").doc(id);
  const doc = await chatRef.get();
  if (doc.exists) {
    return { id: doc.id, ...doc.data() };
  } else {
    throw new Error("Chat not found");
  }
};


export const updateChat = async (id, updatedData) => {
  const chatRef = db.collection("chats").doc(id);
  await chatRef.update(updatedData);
  return { id, ...updatedData };
};


export const deleteChat = async (id) => {
  const chatRef = db.collection("chats").doc(id);
  await chatRef.delete();
  return { message: "Chat deleted successfully" };
};

const Chat = { createChat, getChatsByAdId, updateChat, deleteChat };
export default Chat;
