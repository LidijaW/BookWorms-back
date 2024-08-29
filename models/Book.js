import db  from "../firebase.js";

 
 


export const createBook = async (bookData) => {
    const bookRef = db.collection('books').doc();
    await bookRef.set(bookData);
    return bookRef.id;
};


export const getBooks = async () => {
    const snapshot = await db.collection('books').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};


export const getBookById = async (id) => {
    const bookRef = db.collection('books').doc(id);
    const doc = await bookRef.get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    } else {
        throw new Error('Book not found');
    }
};


export const updateBook = async (id, updatedData) => {
    const bookRef = db.collection('books').doc(id);
    await bookRef.update(updatedData);
    return { id, ...updatedData };
};

export const deleteBook = async (id) => {
    const bookRef = db.collection('books').doc(id);
    await bookRef.delete();
    return { message: 'Book deleted successfully' };
};


const Book = {createBook, getBooks, getBookById, updateBook, deleteBook }; 
export default Book;