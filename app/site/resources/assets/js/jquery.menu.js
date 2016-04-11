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
		header  = $('.header'),
		navLink    = header.find('ul > li > a, .mailing-icon, .search-icon'),
		subscribe  = $('#subscribe ul'),
		offSet     = -300,
		mobile = false,
		open 	   = false;

	var checkMobile = function() {

		// Check if the site is below 768px width
		if (window.innerWidth <= 768) {
			mobile = true;
		} else {
			mobile = false;
		}
	}

	$(window).on('resize-end', checkMobile);
	$(window).on('resize', checkMobile);

	// Check if the site is below 768px width
		if (window.innerWidth <= 768) {
			mobile = true;
		} else {
			mobile = false;
		}
	
	// Insert the subnavigation wrapper
	navigation.after('<div class="subnav-wrapper"></div>');
	var wrapper = $('.subnav-wrapper');

	var backLink = $('.mobile-back')

	backLink.on('click', function() {
		backLink.hide();
		open = false;
	});

	backLink.hide();

	// Click on main navigation
	navLink.on('click', function() {

		var self = $(this),
			subnav = self.parent().find('.sub-navigation ul').first();

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

			if (window.innerWidth <= 768) {
				backLink.show();
			} 	

		}

		// Close navigation
		function closeNav(callback) {

			wrapper.children('.sub-navigation').remove();

			wrapper.slideUp(500, callback);

			open = false;
		}

		var width = $(window).width();
   		$(window).resize(function(){
        if($(window).width() != width){
            $(window).unbind('resize.offcanvas');
			$(window).on('resize.offcanvas', function(){closeNav.call(this)});
        }
    	});
		
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

	//Close the basket when you click anywhere on the page except when clicking input
	$('html, body').on('click', function(e) {
		if (!$(e.target).parents('.subnav-wrapper').size()) {
			if(!$(e.target).is('input')) {
				wrapper.slideUp(500);
				open = false;
			}
		}
	});

	// If '#subscribe' is appended to URL, open subscribe box and focus it
	if (window.location.hash == '#subscribe' && (window.innerWidth > 768)) {
		wrapper.html(subscribe.clone());
		wrapper.show();

		wrapper.children().show();

		open = $('.newsletter-icon').data('pushid');


		setTimeout(function() {
			$('#app_subscribe_email_address').focus();
		}, 20);
	}
});