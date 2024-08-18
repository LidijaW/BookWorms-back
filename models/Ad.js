import admin from 'firebase-admin';
const db = admin.firestore();

// Function to create a new Ad
export const createAd = async (adData) => {
    const adRef = db.collection('ads').doc();
    await adRef.set(adData);
    return adRef.id;
};

// Function to get all Ads
export const getAds = async () => {
    const snapshot = await db.collection('ads').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to get an Ad by ID
export const getAdById = async (id) => {
    const adRef = db.collection('ads').doc(id);
    const doc = await adRef.get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    } else {
        throw new Error('Ad not found');
    }
};

// Function to update an Ad
export const updateAd = async (id, updatedData) => {
    const adRef = db.collection('ads').doc(id);
    await adRef.update(updatedData);
    return { id, ...updatedData };
};

// Function to delete an Ad
export const deleteAd = async (id) => {
    const adRef = db.collection('ads').doc(id);
    await adRef.delete();
    return { message: 'Ad deleted successfully' };
};

//TODO here too, follow Bookjs for it
const Ad = {}; 
export default Ad;