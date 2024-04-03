import express from 'express'

// Create an instance of Router from express
// Which allows creation of endpoints
const router = express.Router();

// Create root endpoint
router.route('/').get((req, res) => res.send("Hello World"));

export default router;