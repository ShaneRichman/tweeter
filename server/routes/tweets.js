"use strict";
const {
  ObjectId
} = require("mongodb");
const userHelper = require("../lib/util/user-helper")

const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {
// Route for getting tweets
  tweetsRoutes.get("/", function(req, res) {

    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.json(tweets);
      }
    });
  });
// Rout for posting a new tweet
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({
        error: 'invalid request: no data in POST body'
      });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.status(201).send();
      }
    });
  });

// Route for when Someone likes a tweet
  tweetsRoutes.post("/like", function(req, res) {
    if (!req.body.tweetId) {
      res.status(400).json({
        error: 'invalid request: no data in POST body'
      });
      return;
    }
    const tweetID = ObjectId(req.body.tweetId);

    DataHelpers.likeTweet(tweetID, (err) => {
      if (err) {
        res.status(500).json({
          error: err.message
        });
      } else {
        res.status(201).send();
      }
    });
  });
  return tweetsRoutes;
}