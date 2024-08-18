import admin from 'firebase-admin';
const db = admin.firestore();

// Function to create a new Chat
export const createChat = async (chatData) => {
    const chatRef = db.collection('chats').doc();
    await chatRef.set(chatData);
    return chatRef.id;
};

// Function to get all Chats for a specific Ad
export const getChatsByAdId = async (adId) => {
    const snapshot = await db.collection('chats').where('ad', '==', adId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to get a Chat by ID
export const getChatById = async (id) => {
    const chatRef = db.collection('chats').doc(id);
    const doc = await chatRef.get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    } else {
        throw new Error('Chat not found');
    }
};

// Function to update a Chat
export const updateChat = async (id, updatedData) => {
    const chatRef = db.collection('chats').doc(id);
    await chatRef.update(updatedData);
    return { id, ...updatedData };
};

// Function to delete a Chat
export const deleteChat = async (id) => {
    const chatRef = db.collection('chats').doc(id);
    await chatRef.delete();
    return { message: 'Chat deleted successfully' };
};

//TODO need to add the same thing here
const Chat = {};  
export default Chat;