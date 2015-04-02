/**
 * Navigation pushdown menu
 *
 * This plugin corseponds with the navigation menu for Tonic.
 *
 * This is a *private* plugin, and should only be used by Message Digital Design.
 *
 * @author Message Digital Design <dev@message.co.uk>
 * @author Richard McCartney <richard@message.co.uk>
 */

jQuery(document).ready(function($) {

	// Set all required variables
	var navigation = $('.navigation'),
		navLink    = navigation.find('ul > li > a'),
		backLink   = $('.mobile-back'),
		open 	   = false;

	// Insert the subnavigation wrapper
	navigation.after('<div class="subnav-wrapper"></div>');
	var wrapper = $('.subnav-wrapper');

	backLink.css({
		zIndex: '-9999'
	})

	// Click on main navigation
	navLink.on('click', function() {

		var self = $(this),
			subnav = self.parent().find('.sub-navigation ul');

		// Allow clicks on links without sub navigation
		if(!self.siblings('.sub-navigation').length) {
			return;
		}

		// Open navigation
		function openNav(callback) {
			wrapper.html(subnav.clone());
			wrapper.slideDown(500, callback);

			wrapper.children().show();

			open = self.data('pushid');

			backLink.css({
				zIndex: '999999'
			})

		}

		// Close navigation
		function closeNav(callback) {

			wrapper.children('.sub-navigation').remove();

			wrapper.slideUp(500, callback);

			open = false;

		}
		$(window).unbind('resize.offcanvas');
		$(window).on('resize.offcanvas', function(){closeNav.call(this)});

		// Open and close if statement
		if (open !== false) {
			if (open !== self.data('pushid')){
				closeNav(openNav);
			}else {

				closeNav();
			}
		} else if (open === false) {
			openNav();
		}


		return false;
	});

	$('.mobile-back').on('click', function() {
		wrapper.children('.sub-navigation').remove();
		wrapper.slideUp(500);
		open = false;

		backLink.css({
			zIndex: '-9999'
		});
	});

});