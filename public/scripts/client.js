/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$("document").ready(function () {
	const createTweetElement = function ({ user, content, created_at }) {
		const postTime = moment.unix(created_at).fromNow();

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
    <p class="date-posted">${postTime}</p>
    <div class="profile-container div">
    <a href="">a</a>
    <a href="">b</a>
    <a href="">c</a>
    </div>
    </footer>
    </article>`;
	};

	const renderTweets = function (tweetDB) {
		for (let tweetObj of tweetDB) {
			const parsedTweet = createTweetElement(tweetObj);
			$("#tweets-container").prepend(parsedTweet);
		}
	};

	$("form").on("submit", function (e) {
		e.preventDefault();
		let text = $("textarea");
		if (text.val() && text.val().length <= 140) {
			const data = $(this).serialize();
      text.val("");
			$.ajax("/tweets", { method: "POST", data: data }).then(loadTweets);
		} else {
      console.log('no luck');
		}
	});

	const loadTweets = function () {
		$.ajax("/tweets", { method: "GET" }).then(renderTweets);
	};

	loadTweets();
});
