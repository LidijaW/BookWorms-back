import admin from 'firebase-admin';
const db = admin.firestore();

// Function to create a new User
export const createUser = async (userData) => {
    const userRef = db.collection('users').doc();
    await userRef.set(userData);
    return userRef.id;
};

// Function to get all Users
export const getUsers = async () => {
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to get a User by ID
export const getUserById = async (id) => {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    } else {
        throw new Error('User not found');
    }
};

// Function to update a User
export const updateUser = async (id, updatedData) => {
    const userRef = db.collection('users').doc(id);
    await userRef.update(updatedData);
    return { id, ...updatedData };
};

// Function to delete a User
export const deleteUser = async (id) => {
    const userRef = db.collection('users').doc(id);
    await userRef.delete();
    return { message: 'User deleted successfully' };
};


//TODO here too, follow Bookjs for it
const User = {}; 
export default User;