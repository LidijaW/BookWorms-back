require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Seller = require('./models/Seller');
const Ad = require('./models/Ad');

const books = [
    {
        title: 'Hobit',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        pages: 310,
        year: 1937,
        edition: '1st',
        type: 'Roman',
        level: null,
        yearLevel: null
    },
    {
        title: 'Matematika 1',
        author: 'Ivo Kolar',
        genre: 'Educational',
        pages: 200,
        year: 2020,
        edition: '2nd',
        type: 'Udzbenik',
        level: 'Srednja škola',
        yearLevel: '1'
    }
];

const sellers = [
    {
        firstName: 'Ivan',
        lastName: 'Horvat',
        email: 'ivan@example.com'
    },
    {
        firstName: 'Ana',
        lastName: 'Kovač',
        email: 'ana@example.com'
    }
];

const ads = [
    {
        code: 'A001',
        description: 'Prodajem knjigu Hobit',
        date: new Date(),
        type: 'prodaja'
    },
    {
        code: 'A002',
        description: 'Razmjenjujem knjigu Matematika 1',
        date: new Date(),
        type: 'razmjena'
    }
];

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('Connected to Database');
    await Book.deleteMany({});
    await Seller.deleteMany({});
    await Ad.deleteMany({});

    await Book.insertMany(books);
    await Seller.insertMany(sellers);
    await Ad.insertMany(ads);

    console.log('Database seeded successfully');
    mongoose.disconnect();
})
.catch(err => console.error('Could not connect to Database', err));
