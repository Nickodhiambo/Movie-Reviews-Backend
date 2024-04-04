import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import ReviewsDAO from './dao/reviewsDAO.js'

dotenv.config() // Load environment variables

const MongoClient = mongodb.MongoClient;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

// Database connection string
const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.vn6yumb.mongodb.net/`

const port = 8000;

// Establish a db connection
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    })
    .then(async client => {
        // Link a db connection object
        await ReviewsDAO.injectDB(client);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })