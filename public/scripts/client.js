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
		if (!Array.isArray(tweetDB)) {
			$("#tweets-container").prepend(createTweetElement(tweetDB));
		} else {
			for (let tweetObj of tweetDB) {
				const parsedTweet = createTweetElement(tweetObj);
				$("#tweets-container").prepend(parsedTweet);
			}
		}
	};

	$("form").on("submit", function (e) {
		e.preventDefault();

		let text = $(this).children("textarea");
		let charCounter = $(this).find("output");
		const data = $(this).serialize();

		if (text.val() && text.val().length <= 140) {
			$(this).children("#user-input-alert").slideUp(600);

			text.val("");
			charCounter.text("140");

			$.ajax("/tweets", { method: "POST", data: data }).done((data) => {
				loadTweets(true);
			});
		} else {
			$("#user-input-alert")
				.addClass("shown")
				.text("Please write a message between 1 and 140 characters")
				.slideDown(600);
		}
	});

	const loadTweets = function (isPOST) {
		$.ajax("/tweets", { method: "GET" }).done((data) => {
			if (isPOST) {
				renderTweets(data.pop());
			} else {
				renderTweets(data);
			}
		});
	};

	$("#message-button").on("click", function () {
		if ($("#tweet-form").is(":visible")) {
			$("#tweet-form").slideUp(600);
		} else {
			$("#tweet-form").slideDown(600);
			$("textarea").focus();
		}
	});

	loadTweets();
});
