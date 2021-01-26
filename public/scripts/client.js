/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$("document").ready(function () {
	function createTweetElement({ user, content, created_at }) {
    // const postTime = moment.unix(created_at).fromNow();
		return `<article class="old-tweets">
    <header class="profile-container">
      <div class="individual-profile">
        <img src="${user.avatars}" alt="" />
        <p>${user.name}</p>
      </div>
      <p class="tag-handle">${user.handle}</p>
    </header>
    <p class="tweet-message">
     ${content.text}
    </p>
    <footer class="profile-container">
      <p class="date-posted">${created_at}</p>
      <div class="profile-container div">
        <a href="">a</a>
        <a href="">b</a>
        <a href="">c</a>
      </div>
    </footer>
  </article>`;
	}


const tweetData = {
	user: {
		name: "Newton",
		avatars: "https://i.imgur.com/73hZDYK.png",
		handle: "@SirIsaac",
	},
	content: {
		text: "If I have seen further it is by standing on the shoulders of giants",
	},
	created_at: 1461116232227,
};

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$("#tweets-container").append($tweet); // to add it to the page so
});