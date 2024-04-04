import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

// Declare a connection object called 'reviews'
let reviews;

// Define the 'ReviewDAO' class that establishes all db connections
export default class ReviewsDAO{
    static async injectDB(conn){

        // If there is already a db connection, return
        if (reviews){
            return
        }
        
        // Else connect to a mongo db and collection both called 'reviews
        try{
            reviews = await conn.db('reviews').collection('reviews')
        } catch (e){
            console.error(`Unable to establish a connection in user DAO: ${e}`)
        }
    }

    // Add a review to db
    static async addReview(movieId, review, user){
        try{
            const reviewDoc = {
                movieId: movieId,
                review: review,
                user: user
            }

            return await reviews.insertOne(reviewDoc);
        } catch {
            console.error(`Unable to post review: ${e}`);
            return {error: e};
        }
    }

    // Get a single review by its ID
    static async getReview(reviewId){
        try{
            return await reviews.findOne({_id: ObjectId(reviewId)});
        } catch (e){
            console.error(`Unable to get review: ${e}`);
            return {error: e}
        }
    }

    // Update a review
    static async updateReview(reviewId, review, user){
        try{
            const updateResponse = await reviews.updateOne(
                {_id: ObjectId(reviewId)},
                {$set: {review: review, user: user}}
            )
            return updateResponse;
        } catch (e){
            console.error(`Unable to update review: ${e}`);
            return {error: e};
        }
    }

    // Delete a review
    static async deleteReview(reviewId){
        try{
            const deleteResponse = await reviews.deleteOne({_id: ObjectId(reviewId)});
            return deleteResponse;
        } catch (e){
            console.error(`Unable to delete review: ${e}`);
            return {error: e};
        }
    }

    // Get all reviews to a movie
    static async getReviewsByMovieId(movieId){
        try{
            const cursor = await reviews.findOne({movieId: parseInt(movieId)});
            return cursor.toArray();
        } catch (e){
            console.error(`Unable to get reviews: ${e}`);
            return {error: e};
        }
    }
}