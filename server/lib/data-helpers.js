"use strict";



// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      // console.log(newTweet);
      db.collection('tweets').insert(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection('tweets').find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets.sort(sortNewestFirst));
      });
    },
    // Increment the like counter in the `db`
    likeTweet: function(tweetID, callback) {
      db.collection('tweets').updateOne(
        {_id: tweetID},
        { $inc: {likes: +1}},
        {upsert: true}
        );

      callback(null, true);
    }
  };
}