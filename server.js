import reviews from './api/reviews.route.js'
import express from 'express'
import cors from 'cors'

// Initialize an express server instance
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Express routes
app.use('/api/v1/reviews', reviews); // Enable app to use our API and routes defined within

// Handle all other routes not included in our API
app.use('*', (req, res) => {
    res.status(404).json({'error': 'Not Found'})
});

export default app; // Export our code to be used in a file that accesses the database import