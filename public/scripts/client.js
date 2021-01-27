/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
	let div = document.createElement("div");
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
};

$("document").ready(function () {
	const createTweetElement = function ({ user, content, created_at }) {
		const postTime = moment(created_at).fromNow();

		return `<article class="old-tweets">
    <header class="profile-container">
    <div class="individual-profile">
    <img src="${escape(user.avatars)}" alt="" />
    <p>${escape(user.name)}</p>
    </div>
    <p class="tag-handle">${escape(user.handle)}</p>
    </header>
    <p class="tweet-message">
    ${escape(content.text)}
    </p>
    <footer class="profile-container">
    <p class="date-posted">${escape(postTime)}</p>
    <div class="profile-container div">
    <a href=""><img src="/images/flag.png" alt=""></a>
    <a href=""><img src="/images/share.png" alt=""></a>
    <a href=""><img src="/images/heart.png" alt=""></a>
    </div>
    </footer>
    </article>`;
	};

	const renderTweets = function (tweetDB) {
		let parsedTweet;

		if (tweetDB.length - $(".old-tweets").length === 1) {
			parsedTweet = tweetDB.pop();
			$("#tweets-container").prepend(createTweetElement(parsedTweet));
		} else {
			for (let tweetObj of tweetDB) {
				parsedTweet = createTweetElement(tweetObj);
				$("#tweets-container").prepend(parsedTweet);
			}
		}
	};

	$("form").on("submit", function (e) {
		e.preventDefault();
		let text = $("textarea");
		if (text.val() && text.val().length <= 140) {
			$("#user-input-alert")
				.slideUp(600, function () {});
			const data = $(this).serialize();
			text.val("");
			$.ajax("/tweets", { method: "POST", data: data }).then(loadTweets);
		} else {
			$("#user-input-alert")
				.addClass("shown")
				.text("Please write a message between 1 and 140 characters")
				.slideDown(600, function () {});
		}
	});

	const loadTweets = function () {
		$.ajax("/tweets", { method: "GET" }).then(renderTweets);
	};

	loadTweets();
});
