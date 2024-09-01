require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Seller = require('./models/Seller');
const Ad = require('./models/Ad');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Povezano s bazom podataka');
    
    // Podaci za knjige
    const books = [
      {
        title: "Hobit",
        author: "J.R.R. Tolkien",
        genre: "Fantastika",
        pages: 310,
        publicationYear: 1937,
        edition: "Prvo izdanje",
        literatureType: "Roman",
        description: "Knjiga o avanturama Bilba Baginsa, hobita iz Shirea, koji se upušta u opasno putovanje.",
      },
      {
        title: "Matematika 1",
        author: "Ivo Kamenar",
        genre: "Udžbenik",
        pages: 200,
        publicationYear: 2010,
        edition: "Drugo izdanje",
        literatureType: "Udžbenik",
        educationLevel: "Srednja škola",
        year: 2010,
        description: "Udžbenik matematike za srednju školu, obuhvaća osnovne matematičke koncepte i probleme.",
      }
    ];

    // Podaci za prodavače
    const sellers = [
      {
        firstName: "Ivan",
        lastName: "Ivić",
        email: "ivan.ivic@example.com"
      },
      {
        firstName: "Ana",
        lastName: "Anić",
        email: "ana.anic@example.com"
      }
    ];

    // Unos knjiga
    Book.insertMany(books)
      .then(insertedBooks => {
        console.log('Knjige unesene');

        // Unos prodavača
        Seller.insertMany(sellers)
          .then(insertedSellers => {
            console.log('Prodavači uneseni');

            // Kreiranje oglasa sa stvarnim ID-ovima knjiga i prodavača
            const ads = [
              {
                adCode: "A001",
                description: "Prodajem knjigu Hobit",
                publishDate: new Date(),
                adType: "prodaja",
                book: insertedBooks[0]._id,
                seller: insertedSellers[0]._id
              },
              {
                adCode: "A002",
                description: "Razmjenjujem knjigu Matematika 1",
                publishDate: new Date(),
                adType: "razmjena",
                book: insertedBooks[1]._id,
                seller: insertedSellers[1]._id
              }
            ];

            // Unos oglasa
            Ad.insertMany(ads)
        
