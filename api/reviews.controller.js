import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController{
    //Posts a single review
    static async apiPostReview(req, res, next){
        try{
            const movieId = parseInt(req.body.movieId)
            const review = req.body.review
            const user = req.body.user

            // Update database with review information using DAO
            const reviewResponse = ReviewsDAO.addReview(
                movieId,
                review,
                user
            )

            // Send success response if successful
            res.json({status: 'success'})
        } catch (e){
            res.status(500).json({error: e.message});
        }
    }

    // Retrieves a single review by Id
    static async apiGetReview(req, res, next){
        try{
            let id = req.params.id || {}
            let review = await ReviewsDAO.getReview(id)
            if (!review){
                res.status(400).json({error: 'Not found'});
                return;
            }
            res.json(review);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }
    }

    // Updates a review
    static async apiUpdateReview(req, res, next){
        try{
            const reviewId = req.params.id
            const review = req.body
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                review,
                user
            )
            
            var { error } = reviewResponse
            if (error){
                res.status(400).json('error')
            }

            if (reviewResponse.modifiedCount === 0){
                throw new Error('Unable to update review');
            }

            res.json({status: 'success'});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }

    // Delete review
    static async apiDeleteReview(req, res, next){
        try{
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            response.json({status: 'success'})
        } catch (e){
            res.status(500).json({error: e.message})
        }
    }

    // Get all reviews to a movie
    static async apiGetReviews(req, res, next){
        try{
            let id = req.params.id || {}
            let reviews = await ReviewsDAO.getReviewsByMovieId(id)
            if (!reviews){
                res.status(404).json({error: 'Not found'})
                return
            }
            res.json(reviews);
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e.message})
        }
    }
}