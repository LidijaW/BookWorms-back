import db  from "../firebase.js";

 
 

// Function to create a new Book
export const createBook = async (bookData) => {
    const bookRef = db.collection('books').doc();
    await bookRef.set(bookData);
    return bookRef.id;
};

// Function to get all Books
export const getBooks = async () => {
    const snapshot = await db.collection('books').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to get a Book by ID
export const getBookById = async (id) => {
    const bookRef = db.collection('books').doc(id);
    const doc = await bookRef.get();
    if (doc.exists) {
        return { id: doc.id, ...doc.data() };
    } else {
        throw new Error('Book not found');
    }
};

// Function to update a Book
export const updateBook = async (id, updatedData) => {
    const bookRef = db.collection('books').doc(id);
    await bookRef.update(updatedData);
    return { id, ...updatedData };
};

// Function to delete a Book
export const deleteBook = async (id) => {
    const bookRef = db.collection('books').doc(id);
    await bookRef.delete();
    return { message: 'Book deleted successfully' };
};

//stavljanje sve u jedan blok
//write everything in so it can be called over the Book variable
const Book = {createBook, getBooks, }; 
export default Book;