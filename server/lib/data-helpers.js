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
      // callback(null, db.tweets.sort(sortNewestFirst));
    },

    likeTweet: function(tweetID, callback) {
      db.collection('tweets').update({tweetID}, { $inc: {likes: +1}});
      callback(null, true);
    }

  };
}
