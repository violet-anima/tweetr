

"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {


    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, () => {
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
     getTweets: function(callback) {
      db.collection("tweets").find({}).toArray((err , results) => {
        if (err) {
          console.log(err);
        }
        let tweetsArr = results;
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweetsArr.sort(sortNewestFirst));
      });
    }
  };
};





/*
    // Saves a tweet to `db`
   saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, () => {
        callback(null, true);
      })
    },

    // Get all tweets in `db`, sorted by newest first
     getTweets: function(callback) {
      db.collection("tweets").find({}).toArray((err , results) => {
        if (err) {
          console.log(err);
        }
        let tweetsAry = results;
        const sortNewestFirst = (a, b) => b.created_at - a.created_at;
        callback(null, tweetsAry.sort(sortNewestFirst));
      })
    }

  };

}




/*
"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, db.tweets.sort(sortNewestFirst));
      });
    }

  };
}
*/