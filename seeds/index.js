const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
    console.log("Database Connected!")
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const ramdom1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //author: '62a5f2a57e60734d24cc18c5', //Localhost DB author ID 
            author: '62ac815d59257a7872347c3c', //Atlas DB author ID
            location: `${cities[ramdom1000].city}, ${cities[ramdom1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti odio expedita aut ipsum itaque sunt doloribus. Facere aut debitis perferendis recusandae harum placeat deserunt, laborum ab, quidem soluta totam dignissimos',
            price: price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[ramdom1000].longitude,
                cities[ramdom1000].latitude,
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dfrpkgf2t/image/upload/v1655141674/YelpCamp/tkypwaqg2caqpq4skdw8.avif',
                  filename: 'YelpCamp/tkypwaqg2caqpq4skdw8',
                },
                {
                  url: 'https://res.cloudinary.com/dfrpkgf2t/image/upload/v1655141675/YelpCamp/ssosmkwkhdxwfkz07xrm.avif',
                  filename: 'YelpCamp/ssosmkwkhdxwfkz07xrm',
                },
                {
                  url: 'https://res.cloudinary.com/dfrpkgf2t/image/upload/v1655141675/YelpCamp/qkhyvnlmomhp4p1pig0u.avif',
                  filename: 'YelpCamp/qkhyvnlmomhp4p1pig0u',
                }
              ],
            
        })

        await camp.save();
    }

}

seedDB();