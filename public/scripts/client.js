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
			$("#tweets-container").append(parsedTweet);
		}
	};

	$("form").on("submit", function (e) {
		e.preventDefault();
		const data = $(this).serialize();
		$("textarea").val("");
		$.ajax("/tweets", { method: "POST", data: data }).then(function (tweet) {
			console.log(success);
		});
	});

});
