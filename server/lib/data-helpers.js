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

    updateTweet: function(plusOne, callback) {
      // console.log(plusOne);
      db.collection('tweets').update({"user" : {"name": "Newton"}, "likes":"2"});
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
    }

  };
}



// db.collection("tweeter").find().toArray((err, results) => {
//     if (err) throw err;

//     console.log("results array: ", results);

//     // This is the end...
//     db.close();
//   });