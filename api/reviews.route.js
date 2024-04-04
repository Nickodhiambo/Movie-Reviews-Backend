import express from 'express'
import ReviewsCtrl from './reviews.controller.js'

// Create an instance of Router from express
// Which allows creation of endpoints
const router = express.Router();

// Create root endpoint
// router.route('/').get((req, res) => res.send("Hello World"));
router.route('/movie/:id').get(ReviewsCtrl.apiGetReviews);
router.route('/new').post(ReviewsCtrl.apiPostReview);
router.route('/:id')
    .get(ReviewsCtrl.apiGetReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router;