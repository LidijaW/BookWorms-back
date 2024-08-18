import admin from 'firebase-admin';
import serviceAccount from './bookworms-back-firebase.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<bookworms-back>.firebaseio.com"
});

const db = admin.firestore();

const books = [
    {
        title: "Hobit",
        author: "J.R.R. Tolkien",
        genre: "Fantastika",
        pages: 310,
        publicationYear: 1937,
        edition: "Prvo izdanje",
        literatureType: "Roman"
    },
    {
        title: "Matematika 1",
        author: "Ivo Kamenar",
        genre: "Udzbenik",
        pages: 200,
        publicationYear: 2010,
        edition: "Drugo izdanje",
        literatureType: "Udzbenik",
        educationLevel: "Srednja skola",
        year: 2010
    }
];

const sellers = [
    {
        firstName: "Ivan",
        lastName: "Ivic",
        email: "ivan.ivic@example.com"
    },
    {
        firstName: "Ana",
        lastName: "Anic",
        email: "ana.anic@example.com"
    }
];

// Insert books
books.forEach(async (book) => {
    await db.collection('books').add(book);
});

// Insert sellers
sellers.forEach(async (seller) => {
    await db.collection('sellers').add(seller);
});
