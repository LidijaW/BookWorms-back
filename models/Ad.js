import admin from 'firebase-admin';
const db = admin.firestore();


export const createAd = async (adData) => {
    const adRef = db.collection('ads').doc();
    await adRef.set(adData);
    return adRef.id;
};


export const getAds = async () => {
    const snapshot = await db.collection('ads').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const getAdById = async (id) => {
    const adRef = db.collection('ads').doc(id);
    const doc = await adRef.get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    } else {
        throw new Error('Ad not found');
    }
};


export const updateAd = async (id, updatedData) => {
    const adRef = db.collection('ads').doc(id);
    await adRef.update(updatedData);
    return { id, ...updatedData };
};


export const deleteAd = async (id) => {
    const adRef = db.collection('ads').doc(id);
    await adRef.delete();
    return { message: 'Ad deleted successfully' };
};


const Ad = { createAd, getAds, getAdById, updateAd, deleteAd }; 
export default Ad;