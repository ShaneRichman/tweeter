$(function() {

  function renderTweets(arrayOfTweets) {
    $('#tweets-container').empty();
    for (var tweet of arrayOfTweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  }

  function createTweetElement(tweet) {
    var timeStamp = moment(tweet.created_at).fromNow();
    return $('<article>', {
      'class': 'tweet',
      'id': tweet._id,
      html: [
        $('<header>', {
          html: [
            $('<img>', {
              'class': 'users-pictures',
              'src': tweet.user.avatars.regular
            }),
            $('<h3>', {
              text: tweet.user.name
            }),
            $('<p>', {
              text: tweet.user.handle
            })
          ]
        }),
        $('<div>', {
          class: 'tweet-body',
          html: [
            $('<p>', {
              text: tweet.content.text
            })
          ]
        }),
        $('<footer>', {
          html: [
            $('<div>', {
              html: [
                $('<p>', {
                  text: timeStamp
                })
              ]
            }),
            $('<div>', {
              html: [
                $('<button>', {
                  'class': 'like-button',
                  'data-like-count': tweet.likes,
                  text: 'likes: ' + tweet.likes
                }),
                $('<img>', {
                  'class': 'bottom-img',
                  'src': '/images/heart.png'
                }),
                $('<img>', {
                  'class': 'bottom-img',
                  'src': '/images/repost.png'
                }),
                $('<img>', {
                  'class': 'bottom-img',
                  'src': '/images/flag.png'
                })
              ]
            })
          ]
        })
      ]
    });
  }

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets/'
    }).done(function(Tweets) {
      renderTweets(Tweets);
    });
  }
// toggles new tweet window
  $('#nav-bar .compose-tweet').on('click', 'button', function() {
    var newTweet = $('.container').find('.new-tweet');
    newTweet.slideToggle();
    newTweet.find('form').find('textarea').focus();
  })
// increments like button by one
  $('section#tweets-container').on('click', '.like-button', function() {
    var currentArticleID = "tweetId=" + $(this).parent().parent().parent().attr('id');
    $.ajax({
        method: 'POST',
        url: 'tweets/like',
        data: currentArticleID
      }).done(function() {
        loadTweets();
      });
  })

  loadTweets();
// checks if valid tweet, posts, and resets the fields
  $('section.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    var theForm = $(this);
    var data = theForm.serialize();
    var charLeft = Number(theForm.text());
    if (charLeft < 0) {
      alert("you cant submit a tweet with more than 140 characters");
    } else if (charLeft >= 140) {
      alert("you cant submit an empty tweet");
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: data
      }).done(function() {
        theForm.reset();
        loadTweets();
      });
    }
  })
});