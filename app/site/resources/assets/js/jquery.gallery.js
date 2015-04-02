/**
 * Product Gallery Module
 *
 * This plugin corseponds with the product gallery in Mothership. You are able to customise
 * this plugin to needs of how it should work.
 *
 * This is a *private* plugin, and should only be used by Message Digital Design.
 *
 * @author Message Digital Design <dev@message.co.uk>
 * @author Richard McCartney <richard@message.co.uk>
 */

$(function() {

	// Set all required variables
	var content    = $('#content'),
		container  = $('.gallery'),
		image	   = $('.gallery .image a'),
		newImage   = '',
		thumbnails = $('.thumbnails'),
		children   = thumbnails.children('li'),
		count      = thumbnails.children().length,
		loader     = $('<div class="spinner"></div>').insertAfter(image).hide(),
		push       = 0,
		offset     = 0,
		totalWidth = 0,
		maxOffset  = 0,
		calcHeight = 0;

	/**
	 * Insert modal in to the DOM
	 */

	if (container.is(':visible')) {
		var modalhref = image.attr('href'),
			modal = $('<div class="modal-image" style="height: 0px;"><img src="' +modalhref+ '"/><span>Click to close</span></div>').insertAfter(content);


		modal.css('height', 0);
	}


	/**
	 * Wrap image gallery with wrap and set thumbnail width calulated
	 * from the total children in the thumbnail list
	 */

	// Check if there are 4 or more children before applying wrap controls
	if (count > 4) {

		// Wrap all thumb elements
		thumbnails.wrap('<div class="wrapper" style="width: 100%; overflow: hidden;" />');

		// Set wrap variable
		var wrap = thumbnails.parent();

		/**
		 * Add gallery controls to the thumbnails, be able to cycle through a block
		 * or each one indervidually
		 */

		// Gallery buttons
		var nextBtn = $('<button class="next" data-right>next</button>').insertAfter(wrap),
		    prevBtn = $('<button class="previous" data-left>previous</button>').insertBefore(wrap);


		$(window).on('resize', function() {

			var wrapWidth = wrap.width();

			$('.thumbnails li').each(function() {
				var setWidth = wrapWidth / 4;

				$(this).css('width', setWidth);
			});

			totalWidth = children.width() * count;

			// Set thumbnails width to total width
			thumbnails.css('width', totalWidth);

			/**
			 * Thumbnail slide function, calculates the current offset and checks which direction
			 * the thumbnails are ment to go
			 */

			// Set max offset to the width of one Thumbnail element
			maxOffset = (count - 4) * (parseInt(totalWidth, 10) / parseInt(count, 10));

			// If offset is 0 disabled previous button
			if (offset === 0) {
				prevBtn.addClass('disabled');
			}

			/**
			 * Calulation for push amount on the thumbnail carousel. Amount should be
			 * set to the width of one thumbnail.
			 */

			// Set push value
			push = parseInt(totalWidth, 10) / parseInt(count, 10);

			console.log(push);

		}).trigger('resize');

		// Slide caluclation for sliding each thumb element
		var slide = function(distance) {

			// Set offset to distance
			offset += distance;

			/**
			 * Offset checks for the carousel, btoh if statements stop the carousel from over
			 * lapping and keeps it inside of the container wrap
			 */

			if(offset < 0) {
				offset = 0;
			}

			if(offset > maxOffset) {
				offset = maxOffset;
			}

			// Animation to move the thumbnails
			thumbnails.animate({'margin-left': -offset});
		};

		// Move carousel right
		nextBtn.on('click', function() {

			// Push thumbnails
			slide(push);

			// Set disabled classes on controls
			prevBtn.removeClass('disabled');

			if (offset == maxOffset) {
				$(this).addClass('disabled');
			}

			return false;
		});

		// Move carousel left
		prevBtn.on('click', function() {

			// Push thumbnails
			slide(-push);
			nextBtn.removeClass('disabled');

			// Set disabled classes on controls
			if (offset === 0) {
				$(this).addClass('disabled');
			}

			return false;
		});

	}

	/**
	 * Load in new main image, taken from a thumbnail an image is loaded in off canvas and repleces
	 * the current main image and lightbox link
	 */

	$('.gallery').on('click', '.thumbnails li a', function(e) {

		// Stop link from reloading the page
		e.preventDefault();

		// If thumbnail is active nothing should happen
		if ($(this).hasClass('active')) {

			return false;

		} else {

			// Show loader
			loader.show();

			// Remove any active class
			children.find('a').removeClass('active');

			// Set clicked thumbnail to active
			$(this).addClass('active');

			// Get href links for both the preview image and zoom image
			var preview = $(this).data('preview'),
				zoomImg = $(this).data('zoom');

			// Load in new gallery item
			$('<img src="'+ preview +'">').load(function() {

				// Insert after the current
				$(this).insertAfter(image);
				$(this).wrap('<a href="' +zoomImg+ '" class="modal-loading"></a>');

				var newImg = $('.modal-loading');

				// Fade out and remove current image, hide loader and show new image
				loader.fadeIn(1000);
				image.hide().delay(2000).remove();
				loader.fadeOut(1000);
				newImg.fadeIn(3000).removeClass('modal-loading');

				// set image variable to new image
				image = newImg;
			});

			// Remove current modal
			$('.modal-image').remove();

			// Insert new modal
			$('<img src="' +zoomImg+ '"/>').load(function() {

				// Insert new modal image and wrap
				$(this).insertAfter(content);
				$(this).wrap('<div class="modal-image"></div>');

				$('<span>Click to close</span>').insertAfter('.modal-image img');

				modal = $('.modal-image');



				modal.css('height', 0);
			});
		}
	});

	/**
	 * Load in modal of big image, this should slide down the content and slide up the new
	 * large modal image
	 */

	$('.gallery').on('click', '.image a', function(e) {

		if ($('.header').css('position') === 'fixed') {
			return false;
		} else {
			// Stop link from loading
			e.preventDefault();

			// Calculate the height of the image inside the modal
			calcHeight = modal.find('img').outerHeight();

			// Slide content
			content.slideUp(500);

			// Slide and fade show the new modal
			modal.delay(500).animate({
				height: calcHeight + 'px',
				opacity: 1
			});
		}

	});

	// Click modal to close
	$('body').on('click', '.modal-image', function() {

		// Animate the height and opacity to hide active modal
		modal.animate({
			height: 0,
			opacity: 0
		}, 500);

		// Slide back down the content
		content.delay(500).slideDown();
	});

	// IE8 Fix
	$('.modal-image').click();

	// Resize modal when open
	$(window).on('resize', function() {

		var modal = $('.modal-image'),
				modalImg = modal.children('img'),
				imgHeight = modalImg.outerHeight();

		// If the modal is visible set height
		if (modal.css('opacity') == '1') {
			modal.css({
				height: imgHeight
			});
		}

	}).trigger('resize');
});
