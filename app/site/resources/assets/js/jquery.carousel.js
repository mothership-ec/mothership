/**
 * options:
 *
 * useArrows (true): if false then no arrows will be shown
 * arrowLeft (undefined): if given then this element will be used as the left arrow
 * arrowRight (undefined): if given then this element will be used as the right arrow
 * useThumbs (false): if true then thumbnail navigation will be used
 * thumbElement (undefined): if given this will be used to contain the thumbs
 * animation:
 *   - type (slide): the type of animation (currently supports slide and none)
 *   - speed (500): if the animation supports speed, then this value will be used
 * imagesPerSlide (1): the number of images shown at any one time
 * allowZoom (false): if true then then images will zoom on click
 */
;
(function($, window, document) {
	'use strict';

	function Carousel ($element, config) {
		var defaults = {
			useArrows: true,
			animation: {
				type: 'slide',
				speed: 500,
			},
			useThumbs: false,
			imagesPerSlide: 1,
			allowZoom: false
		};

		this.$element     = $element;
		this.config       = $.extend(defaults, config);
		this.width        = $element.width();
		this.currentSlide = 0;
		this.controls     = {};
		this.zoomed       = false;
	};

	Carousel.prototype.goTo = function (slide) {
		var self = this,
			animationType = self.config.animation.type,
			animationSpeed = self.config.animation.speed,
			slide = parseInt(slide),
			marginLeft = - slide*this.width
		;

		self.currentSlide = slide;

		if (slide > self.slideCount - 1) {
			throw new Error('Slide out of range');
		}

		if (animationType === 'slide') {
			self.$slides.stop().animate({
				marginLeft: marginLeft+'px'
			}, animationSpeed, 'linear');
		} else if (animationType === 'none') {
			self.$slides.css('margin-left', marginLeft+'px');
		} else {
			throw new Error('Animation of type ' + animationType + ' is not supported');
		}

		self.update();

		return slide;
	};

	Carousel.prototype.next = function () {
		if (this.currentSlide + 1 > this.slideCount - 1) {
			return;
		}

		return this.goTo(this.currentSlide + 1);
	};

	Carousel.prototype.prev = function () {
		if (this.currentSlide - 1 < 0) {
			return;
		}


		return this.goTo(this.currentSlide - 1);
	};

	Carousel.prototype.update = function () {
		var self = this,
			$slides = self.$slides
		;

		self.width = self.$element.width();
		self.slideCount = Math.ceil(self.$slides.children().size()/self.config.imagesPerSlide);

		$slides.css('min-width', (self.slideCount*self.width) +'px')

		$slides.children().each(function (key, item) {
			$(item).outerWidth(self.width/self.config.imagesPerSlide);
		});

		self._updateControls();

		$slides.css('margin-left', - self.currentSlide*this.width+'px');
	};

	Carousel.prototype._updateControls = function () {
		if (typeof this.controls.arrowLeft !== 'undefined') {
			if (this.currentSlide <= 0) {
				this.controls.arrowLeft.addClass('disabled')
			} else {
				this.controls.arrowLeft.removeClass('disabled')
			}
		}

		if (typeof this.controls.arrowRight !== 'undefined') {
			if (this.currentSlide + 1 >= this.slideCount) {
				this.controls.arrowRight.addClass('disabled');
			} else {
				this.controls.arrowRight.removeClass('disabled');
			}
		}
	};

	Carousel.prototype.init = function () {
		var self = this;

		self.$element.data('instance', self);
		self.$slides = self.$element.children('.slides');

		self._initControls();

		$(window).on('orientationchange.carousel resize.carousel', function () {
			self.update();
		});

		self.$slides.children().each(function (k, v) {
			var $v = $(v),
				image
			;

			if (image = $v.data('image')) {
				$v.append($('<img src="'+image+'">'));
			}
		});

		self.update();
	};

	Carousel.prototype._initControls = function () {
		this._initArrows();
		this._initThumbs();
		this._initZoom();
	};

	Carousel.prototype.zoom = function (slide) {
		var self = this,
			$zoom,
			$zoomSlide = self.$slides.find(':nth-child('+slide+')'),
			$zoomImage = $zoomSlide.data('zoom') ?
				 $('<img src="'+$zoomSlide.data('zoom')+'">') :
				$zoomSlide.children('img')
		;

		if (slide > self.slideCount - 1) {
			throw new Error('Slide out of range');
		}

		if (typeof self.$zoom === 'undefined') {
			$zoom = $('<div class="zoom">');
			self.$element.append($zoom);
			self.$zoom = $zoom;
		}

		$zoom = self.$zoom;

		slide = slide || self.currentSlide;

		if (self.zoomed) {
			self.unZoom();
		}

		$zoom.html($zoomImage);

		$zoom.slideDown();

		self.zoomed = true;
	};

	Carousel.prototype.unZoom = function () {
		var self = this;

		if (!this.zoomed) return false;

		self.$zoom.slideUp();

		self.zoomed = false;
	};

	Carousel.prototype._initThumbs = function () {
		var self = this,
			$thumbs = (self.config.thumbElement ? 
				self.config.thumbElement : 
				self.$element.children('.thumbs')),
			thumbCarousel,
			defaultThumbConfig = {
				imagesPerSlide: 2.6
			}
		;

		if (!self.config.useThumbs) return false;
		
		$thumbs.append($('<ul class="slides">'));

		self.$slides.children().each(function(k, v) {
			var imgurl = $(v).data('thumb'),
				element = $('<li><a class="thumb" data-slide="'+k+'" href="#"><img src="'+imgurl+'"></a></li>')
			;

			$thumbs.children('.slides').append(element);
		});

		$thumbs.on('click.carousel', '.thumb', function (e) {
			e.preventDefault();
			self.goTo($(this).data('slide'));
		});

		thumbCarousel = new Carousel($thumbs, defaultThumbConfig);
		thumbCarousel.init();

		self.thumbs = thumbCarousel;

		return thumbCarousel;
	};

	Carousel.prototype._initZoom = function () {
		var self = this;

		if (!this.config.allowZoom) return false;

		self.$slides.children().each(function (k, v) {
			$(v).on('click', function () {
				self.zoom(k);
			});
		});
	};

	Carousel.prototype._initArrows = function () {
		var self = this,
			arrowLeft = self.config.arrowLeft,
			arrowRight = self.config.arrowRight
		;

		if (!self.config.useArrows) return false;

		if (typeof arrowLeft === 'undefined') {
			arrowLeft = self.$element.children('.arrow.left');

			if (!arrowLeft.size()) {
				arrowLeft = $('<a href="#" class="arrow left">prev</a>');
				self.$element.append(arrowLeft);
			}
		}

		if (typeof arrowRight === 'undefined') {
			arrowRight = self.$element.children('.arrow.right');

			if (!arrowRight.size()) {
				arrowRight = $('<a href="#" class="arrow right">next</a>');
				self.$element.append(arrowRight);
			}
		}

		arrowLeft.on('click.carousel', function (e) {
			e.preventDefault();
			self.prev.call(self);
		});

		arrowRight.on('click.carousel', function (e) {
			e.preventDefault();
			self.next.call(self);
		});

		self.controls.arrowLeft = arrowLeft;
		self.controls.arrowRight = arrowRight;
	};

	$.fn.carousel = function (options) {
		var carousel = new Carousel(this, options);

		carousel.init();

		return carousel;
	};

})(jQuery, window, document);

$(document).on('ready', function() {
	window.carousel1 = $('#carousel1').carousel();
	window.carousel2 = $('#carousel2').carousel({
		useThumbs: true
	});
	window.carousel3 = $('#carousel3').carousel({
		useThumbs: true,
		allowZoom: true
	});
});