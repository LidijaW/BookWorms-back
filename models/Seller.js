import admin from 'firebase-admin';
const db = admin.firestore();

// Function to create a new Seller
export const createSeller = async (sellerData) => {
    const sellerRef = db.collection('sellers').doc();
    await sellerRef.set(sellerData);
    return sellerRef.id;
};

// Function to get all Sellers
export const getSellers = async () => {
    const snapshot = await db.collection('sellers').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to get a Seller by ID
export const getSellerById = async (id) => {
    const sellerRef = db.collection('sellers').doc(id);
    const doc = await sellerRef.get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    } else {
        throw new Error('Seller not found');
    }
};

// Function to update a Seller
export const updateSeller = async (id, updatedData) => {
    const sellerRef = db.collection('sellers').doc(id);
    await sellerRef.update(updatedData);
    return { id, ...updatedData };
};

// Function to delete a Seller
export const deleteSeller = async (id) => {
    const sellerRef = db.collection('sellers').doc(id);
    await sellerRef.delete();
    return { message: 'Seller deleted successfully' };
};


const Seller = { createSeller, getSellers, getSellerById, updateSeller,deleteSeller}; 
export default Seller;