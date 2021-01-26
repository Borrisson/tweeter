$("textarea").on("input", function () {
	const limit = 140;
	const textLength = $(this).val().length;
	const value = limit - textLength;
	value < 0
		? $("output").css("color", "red")
		: $("output").css("color", "inherit");
	$("output").text(`${value}`);
});
