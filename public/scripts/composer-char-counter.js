$("textarea").on("input", function () {
	const limit = 140;
	const textLength = $(this).val().length;
	const value = limit - textLength;
	$("output").text(`${value}`);
});
