/* -----------------------------------------
   PANES
----------------------------------------- */

$(document).ready(pane);
$(window).on("resize", function () {
	pane();
});
function pane() {
	$(".even .group-left").each(function () {
		if (window.innerWidth < 768) {
			var EvenLeftHeight = $(this).height();
			$(this).height(EvenLeftHeight);
			$(this).css("top", EvenLeftHeight);

		}
		else {
			$(this).css("top", 0);
		}
	});


	$(".even .group-right").each(function () {
		if (window.innerWidth < 768) {
			var EvenRightHeight = $(this).prev().height();
			$(this).height(EvenRightHeight);
			$(this).css("top", -EvenRightHeight);

		}
		else {
			$(this).css("top", 0);
		}
	});

	$(".pane-img").each(function () {
		var SetHeight = $(this).parent().height();
		$(this).height(SetHeight);
	});
	
}