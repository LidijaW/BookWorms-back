import admin from "firebase-admin";
const db = admin.firestore();


export const createUser = async (userData) => {
  const userRef = db.collection("users").doc();
  await userRef.set(userData);
  return userRef.id;
};

export const getUsers = async () => {
  const snapshot = await db.collection("users").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getUserById = async (id) => {
  const userRef = db.collection("users").doc(id);
  const doc = await userRef.get();
  if (doc.exists) {
    return { id: doc.id, ...doc.data() };
  } else {
    throw new Error("User not found");
  }
};

export const updateUser = async (id, updatedData) => {
  const userRef = db.collection("users").doc(id);
  await userRef.update(updatedData);
  return { id, ...updatedData };
};


export const deleteUser = async (id) => {
  const userRef = db.collection("users").doc(id);
  await userRef.delete();
  return { message: "User deleted successfully" };
};

const User = { createUser, getUsers, getUserById, updateUser, deleteUser };
export default User;
