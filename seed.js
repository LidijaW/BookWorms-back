const mongoose = require('mongoose');
const User = require('./models/User');
const Seller = require('./models/Seller');
const Book = require('./models/Book');
const Ad = require('./models/Ad');
const Chat = require('./models/Chat');

mongoose.connect('mongodb://localhost:27017/bookworms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('Connected to Database'))
.catch(err => console.error('Could not connect to Database'));

const seedDatabase = async () => {
    try {
        // Obrišite postojeće podatke
        await User.deleteMany({});
        await Seller.deleteMany({});
        await Book.deleteMany({});
        await Ad.deleteMany({});
        await Chat.deleteMany({});

        // Ubacite nove podatke
        const users = [
            {
                firstName: "Ana",
                lastName: "Horvat",
                email: "ana.horvat@example.com",
                password: "$2a$15$V.ywGZy6HNOlB5Xlk5M6OOUhXh6.zPXEX4gkm5G8PZP.EBoBnNp5a"  // hashed password
            },
            {
                firstName: "Ivan",
                lastName: "Novak",
                email: "ivan.novak@example.com",
                password: "$2a$15$Thf.QEFXhK1JGXE7ljYxK.O7rrzAik4P9Rh6LhUu.ZnvwJ48xg0WS"  // hashed password
            }
        ];
        const createdUsers = await User.insertMany(users);

        const sellers = [
            {
                firstName: "Marija",
                lastName: "Kovač",
                email: "marija.kovac@example.com"
            },
            {
                firstName: "Josip",
                lastName: "Marić",
                email: "josip.maric@example.com"
            }
        ];
        const createdSellers = await Seller.insertMany(sellers);

        const books = [
            {
                title: "Na Drini ćuprija",
                author: "Ivo Andrić",
                genre: "Roman",
                pages: 360,
                publicationYear: 1945,
                edition: "Prvo izdanje",
                literatureType: "Roman",
                educationLevel: "",
                year: ""
            },
            {
                title: "Prokleta avlija",
                author: "Ivo Andrić",
                genre: "Roman",
                pages: 150,
                publicationYear: 1954,
                edition: "Prvo izdanje",
                literatureType: "Roman",
                educationLevel: "",
                year: ""
            },
            {
                title: "Matematika 1",
                author: "Ivan Ivić",
                genre: "Udžbenik",
                pages: 300,
                publicationYear: 2010,
                edition: "Drugo izdanje",
                literatureType: "Udžbenik",
                educationLevel: "Srednja škola",
                year: 1
            },
            {
                title: "Fizika 2",
                author: "Marina Marković",
                genre: "Udžbenik",
                pages: 250,
                publicationYear: 2012,
                edition: "Prvo izdanje",
                literatureType: "Udžbenik",
                educationLevel: "Srednja škola",
                year: 2
            }
        ];
        const createdBooks = await Book.insertMany(books);

        const ads = [
            {
                adCode: "A001",
                description: "Na Drini ćuprija, Ivo Andrić - Prodaja",
                publishDate: new Date("2023-01-10"),
                adType: "sale",
                book: createdBooks[0]._id,
                seller: createdSellers[0]._id
            },
            {
                adCode: "A002",
                description: "Matematika 1, Ivan Ivić - Razmjena",
                publishDate: new Date("2023-02-15"),
                adType: "exchange",
                book: createdBooks[2]._id,
                seller: createdSellers[1]._id
            }
        ];
        const createdAds = await Ad.insertMany(ads);

        const chats = [
            {
                messages: [
                    "Zanima me je li knjiga još uvijek dostupna?",
                    "Da, dostupna je."
                ],
                date: new Date("2023-03-01"),
                ad: createdAds[0]._id,
                buyer: createdUsers[0]._id
            },
            {
                messages: [
                    "Možemo li se dogovoriti za razmjenu knjiga?",
                    "Naravno, koje knjige imate za razmjenu?"
                ],
                date: new Date("2023-05-01"),
                ad: createdAds[1]._id,
                buyer: createdUsers[1]._id
            }
        ];
        await Chat.insertMany(chats);

        console.log('Database seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding database', error);
        process.exit(1);
    }
};

seedDatabase();
