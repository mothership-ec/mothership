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
 */
;
(function($, window, document) {
	'use strict';

	var Carousel = function ($element, config) {
		var defaults = {
			useArrows: true,
			animation: {
				type: 'slide',
				speed: 500,
			},
			useThumbs: false,
			imagesPerSlide: 1
		};

		this.$element     = $element;
		this.config       = $.extend(defaults, config);
		this.width        = $element.width();
		this.currentSlide = 0;
		this.controls     = {};
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

		if (typeof self.controls.arrowLeft !== 'undefined' && this.currentSlide + 1 = this.slideCount - 1)) {
			self.controls.arrowLeft.addClass('disabled');
		}

		return this.goTo(this.currentSlide + 1);
	};

	Carousel.prototype.prev = function () {
		if (this.currentSlide - 1 < 0) {
			return;
		}

		if (typeof self.controls.arrowLeft !== 'undefined' && this.currentSlide + 1 = this.slideCount - 1)) {
			self.controls.arrowLeft.addClass('disabled')
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

		$slides.css('margin-left', - self.currentSlide*this.width+'px');
	};

	Carousel.prototype.init = function () {
		var self   = this;

		self.$element.data('instance', self);
		self.$slides = self.$element.children('.slides');

		self.update();

		self._initControls();

		$(window).on('orientationchange.carousel resize.carousel', function () {
			self.update();
		});
	};

	Carousel.prototype._initControls = function () {
		this._initArrows();
		this._initThumbs();
	};

	Carousel.prototype._initThumbs = function () {
		if (!this.config.useThumbs) return false;
		var self = this,
			$thumbs = (this.config.thumbElement ? 
				this.config.thumbElement : 
				self.$element.children('.thumbs')),
			thumbCarousel,
			defaultThumbConfig = {
				imagesPerSlide: 2.6
			}
		;
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

	Carousel.prototype._initArrows = function () {
		if (!this.config.useArrows) return false;
		var self = this,
			arrowLeft = self.config.arrowLeft,
			arrowRight = self.config.arrowRight
		;

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
	window.carousel = $('.carousel').carousel({
		imagesPerSlide: 1,
		useThumbs: true
	});
});