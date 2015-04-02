/**
 * Basket functionality
 *
 * This plugin corseponds with the ading to basket.
 *
 * This is a *private* plugin, and should only be used by Message Digital Design.
 *
 * @author Message Digital Design <dev@message.co.uk>
 */

jQuery(document).ready(function($) {

	$(function() {
		$(document).bind('ajaxStart', function() {
			$('html').addClass('loading');
		}).bind('ajaxStop', function() {
			$('html').removeClass('loading');
		});

		$('form[action*="basket"]').on('submit', function() {
			var self = $(this),
				selectBox = self.find('select'),
				value = selectBox.val();

			// Check if a product selectbox has a value
			if (selectBox.is(':visible') && selectBox.val() == null) {
				selectBox
					.animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
					.animate({ left: "-10px" }, 100).animate({ left: "10px" }, 100)
					.animate({ left: "0px" }, 100);

				$('.error-msg').fadeOut(200);
				$('.error-msg').delay(400).queue(function(n) {
					$(this).remove();
					n();
				});

				selectBox.after('<div class="error-msg"><p>Please select an option</p></div>');
				$('.error-msg').hide();
				$('.error-msg').fadeIn(600);

				return false;

			} else {

				$('.error-msg').fadeOut(200);

			$.ajax({
					url       : self.attr('action'),
					data      : self.serialize(),
					method    : 'POST',
					dataType  : 'html',
					beforeSend: function() {
						self.find('input, textarea, button, select')
								.attr('disabled', true);
						self.find('button').css({opacity: 0.1}).after('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
					},
					success   : function(data) {
						// Get new basket HTML
						var contents = $('.basket .contents', data),
							icon   = $('.basket-icon span', data);


						// Swap out the basket HTML
						$('.basket .contents').replaceWith(contents);
						$('.basket-icon span').replaceWith(icon);

						// Icon animation
						$('.basket-icon span').addClass('pop');

						self.find('button').animate({
							color: '#207A34',
							borderColor: '#207A34'});
						self.find('button').text('success');

						self.find('button').delay(2000).queue(function(n) {
							$(this).text('Add to basket')
								   .animate({
								   		color: '#141F6C',
								   		borderColor: '#141F6C'
								   	});
							n();
						});

					},
					error     : function(data) {
						selectBox = $('.product-info select', data);
						$('.product-info select').replaceWith(selectBox);
					},
					complete  : function(data) {

						self.find('input, textarea, button, select')
								.removeAttr('disabled');
						self.find('button').css({opacity: 1})
						$('.spinner').remove();

					}
				});

				return false;
			}

		});

		var removeBasketItem = function() {
			var self = $(this);

			$.ajax({
				url:      self.attr('href'),
				dataType: 'html',
				beforeSend: function () {
					self.parent('li').css({opacity: 0.1}).after('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
				},
				success:  function(data) {
					// Get new basket HTML
					var contents = $('.basket .contents', data),
						icon   = $('.basket-icon span', data);

					// Swap out the basket HTML
					$('.basket .contents').replaceWith(contents);
					$('.basket-icon span').replaceWith(icon);
				},
				complete: function() {
					$('.btn-bskt-remove').click(removeBasketItem);
					self.parent('li').css({opacity: 1});
					$('.spinner').remove();
				}
			});

			return false;
		};

		// any remove link inside basket - html is replaces so just using $('.btn-bskt-remove') will lose event handlers
		$('.basket').on('click', '.remove', removeBasketItem);
	});

	/**
	 * Basket functionality
	 *
	 * This plugin corseponds with the Off canvas basket for Mothership Site.
	 *
	 * This is a *private* plugin, and should only be used by Message Digital Design.
	 *
	 * @author Message Digital Design <dev@message.co.uk>
	 * @author Richard McCartney <richard@message.co.uk>
	 */

	var container = $('#container'),
		basket    = $('.basket'),
		link      = $('.basket-icon'),
		close     = $('.close'),
		offSet    = -300,
		open      = false,
		mobile    = false;

	basket.css('margin-right', offSet);

	// Open off canvas
	function openCanvas() {

		open = true;

		var body = $('body');

		// This only counts for navigation off canvas
		if (mobile === true) {
			basket.animate({'marginRight': 0}, 250);
			container.animate({'left': offSet}, 250);
		} else {
			basket.animate({'marginRight': 0}, 250);
			container.animate({'left': offSet}, 250);
		}
	}

	// Close off canvas
	function closeCanvas() {

		open = false;

		container.animate({'left': 0}, 250);
		basket.animate({'marginRight': offSet}, 250);

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
		closeCanvas();

		event.preventDefault();
	});

		// Swipe to close basket
	$(function() {
		//Enable swiping...
		$('.basket').swipe( {

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

	$(window).on('resize', function() {
		closeCanvas();

		// Check if the site is below 768px width
		if ($('.container').css('max-width') == '768px') {
			mobile = true;
		} else {
			mobile = false;
		}

	}).trigger('resize');

});