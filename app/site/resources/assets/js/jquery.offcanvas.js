/**
 * Navigation functionality
 *
 * This plugin corseponds with the ading to Navigation.
 *
 * This is a *private* plugin, and should only be used by Message Digital Design.
 *
 * @author Message Digital Design <dev@message.co.uk>
 * @author Richard McCartney <richard@message.co.uk>
 */

jQuery(document).ready(function($) {

	var container = $('#container'),
		navigation    = $('.nav-offcanvas'),
		link      = $('.nav-open'),
		close     = $('.close'),
		offSet    = -300,
		open      = false,
		mobile    = false;

	// Open off canvas
	function openCanvas() {

		open = true;

		var body = $('body');

		// This only counts for navigation off canvas
		if (mobile === true) {
			container.finish(); navigation.finish();

			container.animate({'left': -offSet}, 250);
			navigation.animate({'marginLeft': 0}, 250);
		}

	}

	// Close off canvas
	function closeCanvas() {

		open = false;
		if (mobile === true) {
			container.finish(); navigation.finish();

			container.animate({'left': 0}, 250);
			navigation.animate({'marginLeft': offSet}, 250);
        }
	}

	// Open and close from off canvas link
	link.on('click', function(event) {
		event.preventDefault();
		/* Act on the event */

		var canvasTarget = $(this).data('target'),
			canvasDir    = $(this).data('direction');

		if (open === false) {
			openCanvas(canvasTarget, canvasDir);
		} else {
			closeCanvas();
		}

	});

	// close canvas
	close.on('click', function(event) {
		event.preventDefault();

		closeCanvas();
	});

		// Swipe to close navigation
	$(function() {
		//Enable swiping...
		$('.nav-offcanvas').swipe( {

			//Generic swipe handler for all directions
			swipeRight:function(event, direction, distance, duration) {
				if (open === true) {
					closeCanvas();
				}
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold: 100
		});
	});

	var checkMobile = function() {

		// Check if the site is below 768px width
		if (window.innerWidth <= 768) {
			mobile = true;
			navigation.animate({'marginLeft': offSet}, 0);
		} else {
			mobile = false;
			navigation.css('margin-left', 'auto');
		}
	}

	// $(window).on('resize-end', checkMobile);
	$(window).on('resize', checkMobile);

});