(function($) {
	

	$.fn.carousel = function (options) {
		var insance = {};

		instance.slides = this.children('li');

		console.log(instance.slides);
	};
})(jQuery);


$(document).on('load', function() {});