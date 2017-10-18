$(function() {

  var data = [ // TODO take from Json file
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    }, {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }, {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function renderTweets(arrayOfTweets) {
    $.ajax({
      method: 'get',
      url: '/tweets/'
    }).done(function (arrayOfTweets) {

    })
    $('#tweets-container').empty();
    for (var tweet of arrayOfTweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
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
                  text: timeStamp // TODO current date - this date (momentjs)
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

  $('section.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    var theForm = this;
    var data = $(this).serialize();
    $.ajax({
      method: 'post',
      url: '/squeaks',
      data: data
    }).done(function() {
      theForm.reset();
      loadSqueaks();
    });
  })

  renderTweets(data);

});