import admin from 'firebase-admin';
import serviceAccount from './bookworms-back-firebase.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<bookworms-back>.firebaseio.com"
});

const db = admin.firestore();

const books = [
  {
    title: "Umjetna Inteligencija: Budućnost Je Sada",
    author: "Nikolina Šarić",
    publishDate: "2022-12-14",
    genre: "Publicistika",
    edition: "1. izdanje",
    literatureType: "Moderna knjiga",
    educationLevel: "Opća",
    year: 2022,
  },
  {
    title: "Umjetna Inteligencija: Budućnost Je Sada",
    author: "Nikolina Šarić",
    publishDate: "2022-12-14",
    genre: "Publicistika",
    edition: "1. izdanje",
    literatureType: "Moderna knjiga",
    educationLevel: "Opća",
    year: 2022,
  },
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


books.forEach(async (book) => {
    await db.collection('books').add(book);
});


sellers.forEach(async (seller) => {
    await db.collection('sellers').add(seller);
});
