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

	var container = $('.inner-container'),
		navigation    = $('.nav-offcanvas, .icons'),
		link      = $('.nav-open'),
		icon      = $('.nav-open i'),
		close     = $('.close'),
		backLink  = $('.mobile-back'),
		offSet    = -200,
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
			container.css('overflow', 'hidden');
			icon.removeClass('fa-bars').addClass('fa-close');
		}

	}

	// Close off canvas
	function closeCanvas() {

		open = false;
		if (mobile === true) {
			container.finish(); navigation.finish();

			container.animate({'left': 0}, 250);
			navigation.animate({'marginLeft': offSet}, 250);

			icon.removeClass('fa-close').addClass('fa-bars');

			backLink.hide();
			$('.subnav-wrapper').hide();
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


	var checkMobile = function() {

		// Check if the site is below 924px width
		if (window.innerWidth <= 924) {
			mobile = true;
		} else {
			mobile = false;
		}
	}

	var width = $(window).width();
    $(window).resize(function(){
        if(($(window).width() != width) && (window.innerWidth <= 924)){
            closeCanvas();
        } else if (($(window).width() != width) && (window.innerWidth >= 924)) {
        	navigation.css('margin-left', '0');
        }
    });

	// $(window).on('resize-end', checkMobile);
	$(window).on('resize', checkMobile);

});