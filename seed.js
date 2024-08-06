require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Seller = require('./models/Seller');
const Ad = require('./models/Ad');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database');
    
    // Podaci za knjige
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

    // Podaci za prodavače
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

    // Unos knjiga
    Book.insertMany(books)
      .then(insertedBooks => {
        console.log('Books inserted');

        // Unos prodavača
        Seller.insertMany(sellers)
          .then(insertedSellers => {
            console.log('Sellers inserted');

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
              .then(() => {
                console.log('Ads inserted');
                mongoose.connection.close();
              })
              .catch(err => {
                console.error('Error inserting ads:', err);
                mongoose.connection.close();
              });
          })
          .catch(err => {
            console.error('Error inserting sellers:', err);
            mongoose.connection.close();
          });
      })
      .catch(err => {
        console.error('Error inserting books:', err);
        mongoose.connection.close();
      });
  })
  .catch(err => {
    console.error('Could not connect to Database', err);
  });
