/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(function () {


  $("#tweet-form").keypress(function (e) {
    if (e.which == 13 && !e.shiftKey) {
      $(this).closest("form").submit();
      e.preventDefault();
      return false;
    }
  });


  function createdTweetElement(tweetData) {
    var name = tweetData.user.name;
    var avatars = tweetData.user.avatars.small;
    var handle = tweetData.user.handle;
    var content = tweetData.content.text;
    var newDate = moment(tweetData.created_at).fromNow();


    var $tweet = ($("<article>").addClass("tweeter"))
      .append($("<header>")
        .append($("<img>").attr("src", avatars).addClass("profile"))
        .append($("<h3>").text(name))
        .append($("<span>").addClass("handler").text(handle))
      )
      .append($("<p>").addClass("tweetBody").text(content))
      .append($("<footer>").addClass("feets")
        .append($("<span>").text(newDate))
        .append($('<div>').addClass('icons')
          .append($('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true'))
          .append($('<i>').addClass('fa fa-retweet').attr('aria-hidden', 'true'))
          .append($('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true'))
        )
      );
    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function (tweet) {
      let $tweet = createdTweetElement(tweet);

/* highlights old tweets when mouse is hovering */
      $($tweet).on('mouseover', function (event) {
        $(this).addClass('on-tweet');
      });

      $($tweet).on('mouseleave', function (event) {
        $(this).removeClass('on-tweet');
      });

      $('#tweet-container').prepend($tweet);
    });

  }


 $('#compose-button').click(function() {
    $('.new-tweet').slideToggle(990, function() {
      $('#new-tweet-input').focus();
    });
  });


  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();
    var input = $('#new-tweet-input').val();
    var alertMessage = $('#alert-message');
    if (input === '' || input === null || input === " ") {
      alertMessage.html('You post appears to be empty. Please enter a TWEET').fadeTo(5000, 0);
      setTimeout(function () { alertMessage.html('').fadeTo(0, 1); }, 5000);
    } else if (input.length > 140) {
      alertMessage.html('Your post is too long. Please limit your tweet to 140 characters').fadeTo(5000, 0);
      setTimeout(function () { alertMessage.html('').fadeTo(0, 1); }, 5000);
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: {
          text: input
        }

      }).done(function (tweet) {
        /* Resets Counter */
        $('.counter').text(140);
        let newTweet = createdTweetElement(tweet);

        $(newTweet).on('mouseover', function (event) {
          $(this).addClass('on-tweet');
        });

        $(newTweet).on('mouseleave', function (event) {
          $(this).removeClass('on-tweet');
        });

        $('#tweet-container').prepend(newTweet);
      });
      $('#new-tweet-input').val('');
    }
  });

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).success(function (tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();

}); //end of $ready

