import admin from 'firebase-admin';
const db = admin.firestore();


export const createSeller = async (sellerData) => {
    const sellerRef = db.collection('sellers').doc();
    await sellerRef.set(sellerData);
    return sellerRef.id;
};

export const getSellers = async () => {
    const snapshot = await db.collection('sellers').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const getSellerById = async (id) => {
    const sellerRef = db.collection('sellers').doc(id);
    const doc = await sellerRef.get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    } else {
        throw new Error('Seller not found');
    }
};


export const updateSeller = async (id, updatedData) => {
    const sellerRef = db.collection('sellers').doc(id);
    await sellerRef.update(updatedData);
    return { id, ...updatedData };
};


export const deleteSeller = async (id) => {
    const sellerRef = db.collection('sellers').doc(id);
    await sellerRef.delete();
    return { message: 'Seller deleted successfully' };
};


const Seller = { createSeller, getSellers, getSellerById, updateSeller,deleteSeller}; 
export default Seller;