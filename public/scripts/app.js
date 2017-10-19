$(function() {

  function renderTweets(arrayOfTweets) {
    $.ajax({
      method: 'GET',
      url: '/tweets/'
    }).done(function(arrayOfTweets) {
      $('#tweets-container').empty();
      for (var tweet of arrayOfTweets) {
        $('#tweets-container').prepend(createTweetElement(tweet));
      }
    })
  }

  function createTweetElement(tweet) {
    var timeStamp = moment(tweet.created_at).fromNow();
    return $('<article>', {
      'class': 'tweet',
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
        $('<p>', {
          text: tweet.content.text
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
                $('<img>', {
                  'class': 'bottom-img',
                  'src': '/images/bird.png'
                }),
                $('<img>', {
                  'class': 'bottom-img',
                  'src': '/images/bird.png'
                }),
                $('<img>', {
                  'class': 'bottom-img',
                  'src': '/images/bird.png'
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
    }).done(function(Json) {
      renderTweets(Json);
    });
  }

  $('#nav-bar .compose-tweet').on('click', 'button', function() {
    var newTweet = $('.container').find('.new-tweet');
    newTweet.slideToggle();
    newTweet.find('form').find('textarea').focus();
  })

  $('section.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    var theForm = this;
    var data = $(this).serialize();
    var charCount = data.length - 5;
    if (charCount > 140) {
      alert("you cant submit a tweet with more than 140 characters");
    } else if (charCount < 1) {
      alert("you cant submit an empty tweet");
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets/',
        data: data
      }).done(function() {
        theForm.reset();
        renderTweets(data);
      });
    }
  })

  loadTweets();

});