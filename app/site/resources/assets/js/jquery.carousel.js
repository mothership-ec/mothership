/**
 * Carousel jQuery Plugin
 *
 * Provides functionality to create all the typical types of carousel sliders
 * on modern websites.
 *
 * This is a *private* plugin, and should only be used by Message Digital Design.
 *
 * @author Message Digital Design <dev@message.co.uk>
 * @author Joe Holdcroft <joe@message.co.uk>
 */
(function( $ ){
	var methods = {
		/**
		 * Initialise the plugin.
		 *
		 * @param object options Object of options for this plugin
		 *
		 * @throws Exception     If the animation setting has an invalid value
		 */
		init : function(options) {
			var defaults = {
					arrows    : false,   // Show arrow controls
					indicators: false,   // Show position indicators / controls
					animation : 'slide', // Animation to use for moving between slides
					speed     : 100,     // Speed in milliseconds for the animation
					interval  : false,   // Interval in milliseconds for automatically moving between slides
					flexible  : true,    // Determines whether the carousel has a flexible width

					onReady      : false, // Callback for when the plugin is initialised
					onChangeStart: false, // Callback for the start of the slide change animation
					onChangeEnd  : false, // Callback for the end of the slide change animation
					onComplete   : false, // Callback for the end of the slides being reached
					onInteraction: false  // Callback for when a user interacts with any controls
				},
				settings = $.extend({}, defaults, options);

			/**
			 * Checks if a variable is a valid object with named properties
			 * passed in the 'arrows' option.
			 *
			 * The object must have a property named 'next' and one either named
			 * 'prev' or 'previous'. The value of both of these must be a jQuery
			 * object.
			 *
			 * @param  mixed input The variable to check
			 * @return boolean     True if the input is valid, false otherwise
			 */
			function isArrowControlObject(input)
			{
				if (typeof input !== 'object') {
					return false;
				}

				if (!input.hasOwnProperty('next') || !(input.next instanceof jQuery)) {
					return false;
				}

				if (!input.hasOwnProperty('previous') || !(input.previous instanceof jQuery)) {
					if (!input.hasOwnProperty('prev') || !(input.prev instanceof jQuery)) {
						return false;
					}
				}

				return true;
			}

			return this.each(function() {
				var self  = $(this),
					state = {
						settings  : settings,
						indicators: false,
						arrows    : {
							previous: false,
							next    : false
						},
						interval  : false,
						width     : false,
						slideCount: self.children().length,
						current   : 0
					};

				// Validate the settings
				if (settings.animation !== 'slide') {
					$.error('Unsupported animation type for jQuery.carousel: ' + settings.animation);
				}

				// Wrap slides in an element we can use as a "window" to the slides
				self.wrap($('<div>'));

				var wrap = self.parent();

				// Set the basic structural styling for the carousel
				wrap.css({
					width   : '100%',
					overflow: 'hidden'
				});

				self.children().css({
					float: 'left'
				});

				// Initialise arrow controls
				if (settings.arrows !== false) {
					// An object with named properties for next & previous/prev
					if (isArrowControlObject(settings.arrows)) {
						state.arrows.next     = settings.arrows.next;
						state.arrows.previous = (settings.arrows.hasOwnProperty('previous')) ? settings.arrows.previous : settings.arrows.prev;
					}
					// An array with two elements, the first is assumed the prev control
					else if (typeof settings.arrows === 'object' && settings.arrows.length === 2) {
						state.arrows.next     = settings.arrows[1];
						state.arrows.previous = settings.arrows[0];
					}
					// Generate the arrows
					else if (settings.arrows === true) {
						state.arrows.next     = $('<button class="arrow next">Next</button>').insertAfter(wrap);
						state.arrows.previous = $('<button class="arrow previous">Previous</button>').insertAfter(wrap);
					}

					// Set events for the arrow controls
					state.arrows.next.on('click.carousel', function() {
						methods.goToNext.call(self);
					});
					state.arrows.previous.on('click.carousel', function() {
						methods.goToPrevious.call(self);
					});
				}

				// Initialise indicators
				if (settings.indicators !== false) {
					var indicatorHTML = $('<ol class="indicators"></ol>');

					// Create each indicator
					self.children().each(function() {
						indicatorHTML.append($('<li></li>').click(function() {
							methods.goTo.call(self, $(this).index());
						}));
					});

					// jQuery selector for the destination of the indicators
					if (typeof settings.indicators === 'object' && settings.indicators instanceof jQuery) {
						state.indicators = indicatorHTML.insertAfter(settings.indicators.html);
					}
					// Generate the indicators
					else if (settings.indicators === true) {
						state.indicators = indicatorHTML.insertAfter(wrap);
					}
				}

				// Bind the interaction event, if defined
				if (typeof settings.onInteraction === 'function') {
					var controls = $();

					if (state.indicators !== false) {
						controls = controls.add(state.indicators.children());
					}

					if (state.arrows.previous !== false) {
						controls = controls.add(state.arrows.previous);
					}

					if (state.arrows.next !== false) {
						controls = controls.add(state.arrows.next);
					}

					controls.on('click.carousel', function() {
						settings.onInteraction(self);
					});
				}

				// Save state on the element for use later
				self.data('carousel', state);

				// Calculate the dimensions
				methods.setWidth.call(self, wrap.width());

				// If this is a flexible carousel, set resize listeners to set the width
				if (settings.flexible === true) {
					$(window).on('resize.carousel orientationchange.carousel', function() {
						methods.detectWidthChange.call(self);
					});
				}

				// Set the initial state (first slide)
				methods.updateState.call(self);

				// Fire the onReady event, if defined
				if (typeof settings.onReady === 'function') {
					settings.onReady(self);
				}

				// Start the interval, if defined
				methods.start.call(self);
			});
		},

		/**
		 * Detect if the wrapper's width has changed.
		 *
		 * The wrapper's width is always 100%, so the computed width can change
		 * if a parent element's width has changed.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 */
		detectWidthChange: function() {
			return this.each(function() {
				var self      = $(this),
					wrapWidth = self.parent().width();

				if (wrapWidth !== self.data('carousel').width) {
					methods.setWidth.call(self, wrapWidth);
				}
			});
		},

		/**
		 * Set the width of the carousel.
		 *
		 * This sets the width for each slide, and sets the total width of the
		 * slide container (the list element) to the new width * number of slides.
		 *
		 * @param  int slideWidth New width for the carousel
		 *
		 * @return object         jQuery object for the selected elements, for chaining
		 *
		 * @throws Exception      If the width passed is not a number or is < 0
		 */
		setWidth: function(slideWidth) {
			width = Number(slideWidth);

			if (isNaN(width) || width < 0) {
				$.error('Invalid width set on jQuery.carousel.setWidth: ' + slideWidth);
			}

			return this.each(function() {
				var self  = $(this),
					state = self.data('carousel');

				// Check the width is actually different
				if (width !== state.width) {
					// Update the width on the state
					state.width = width;

					// Update the slides & slide list width
					self.css('width', width * state.slideCount)
						.children().css('width', width);
				}
			});
		},

		/**
		 * Go to a specific slide.
		 *
		 * @param  int slideIndex Index of the slide to go to
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 *
		 * @throws Exception If the slide index does not exist, is not a number
		 *                   or is >= the number of slides
		 */
		goTo : function(slideIndex) {
			index = Number(slideIndex);

			return this.each(function() {
				var self   = $(this),
					state  = self.data('carousel'),
					offset = (100 / state.slideCount) * index;

				// Validate the index
				if (isNaN(index) || index < 0 || index >= state.slideCount) {
					$.error('Invalid slide reference on jQuery.carousel.goTo: ' + slideIndex);
				}

				// Set the current state
				state.current = index;

				// Fire the onChangeStart event, if defined
				if (typeof state.settings.onChangeStart === 'function') {
					state.settings.onChangeStart(self);
				}

				// Animate the change of slide
				self.animate({marginLeft: '-' + (100 * index) + '%'}, {
					duration: state.settings.speed,
					complete: function() {
						// Fire the onChangeEnd event, if defined
						if (typeof state.settings.onChangeEnd === 'function') {
							state.settings.onChangeEnd(self);
						}

						// Fire the onComplete event, if defined & this is the last slide
						if (index + 1 === state.slideCount && typeof state.settings.onComplete === 'function') {
							state.settings.onComplete(self);
						}
					}
				});

				methods.updateState.call(self);
			});
		},

		/**
		 * Update the carousel state.
		 *
		 * This method performs some maintenance tasks such as moving the
		 * `active` class on the indicators and setting `disabled` classes on
		 * the arrows where appropriate.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 */
		updateState : function() {
			return this.each(function() {
				var state = $(this).data('carousel');

				// Set active class on indicator
				if (state.indicators !== false) {
					state.indicators
						.children().removeClass('active')
						.filter(':eq(' + state.current + ')').addClass('active');
				}

				// Set disabled class on controls where necessary
				if (state.arrows.previous !== false) {
					state.arrows.previous.toggleClass('disabled', (state.current === 0));
				}

				if (state.arrows.next !== false) {
					state.arrows.next.toggleClass('disabled', (state.current + 1 === state.slideCount));
				}
			});
		},

		/**
		 * Go to the first slide in the carousel.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 */
		goToStart : function() {
			return methods.goTo.call(this, 0);
		},

		/**
		 * Go to the last slide.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 */
		goToEnd : function() {
			return this.each(function() {
				var self = $(this);

				return methods.goTo.call(self, self.data('carousel').slideCount - 1);
			});
		},

		/**
		 * Go to the slide after the currently active one.
		 *
		 * If the currently active slide is the last slide, nothing happens and
		 * no error is raised.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 */
		goToNext : function() {
			return this.each(function() {
				var self = $(this);

				try {
					return methods.goTo.call(self, self.data('carousel').current + 1);
				}
				catch (e) {
					return false;
				}
			});
		},

		/**
		 * Go to the slide before the currently active one.
		 *
		 * If the currently active slide is the first one, nothing happens and
		 * no error is raised.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 */
		goToPrevious : function() {
			return this.each(function() {
				var self = $(this);

				try {
					return methods.goTo.call(self, self.data('carousel').current - 1);
				}
				catch (e) {
					return false;
				}
			});
		},

		/**
		 * Cycle between slides.
		 *
		 * This method works similary to `goToNext`. The difference is that this
		 * method returns the carousel to the first slide if the currently
		 * active slide is the last one.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 */
		cycle : function() {
			return this.each(function() {
				var self  = $(this),
					state = self.data('carousel');

				// If we're on the last slide, rewind back to the start
				if (state.current + 1 === state.slideCount) {
					methods.goToStart.call(self);
				}
				// Otherwise, go to next
				else {
					methods.goToNext.call(self);
				}
			});
		},

		/**
		 * Start the carousel automatic cycling, if it has been defined in the
		 * settings.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 *
		 * @throws Exception If the speed setting is not set, or <= 0
		 */
		start : function() {
			return this.each(function() {
				var self  = $(this),
					state = self.data('carousel');

				if (state.settings.interval !== false) {
					var speed = Number(state.settings.interval);

					if (isNaN(speed) || speed <= 0) {
						$.error('Invalid interval speed set on jQuery.carousel: ' + state.settings.interval);
					}

					state.interval = setInterval(function() {
						return methods.cycle.call(self);
					}, speed);
				}
			});
		},

		/**
		 * Stop the carousel's automatic cycling, if it is currently running.
		 *
		 * @return object jQuery object for the selected elements, for chaining
		 */
		stop : function() {
			return this.each(function() {
				var state = $(this).data('carousel');

				if (state.interval !== false) {
					clearInterval(state.interval);
				}
			});
		}
	};

	$.fn.carousel = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.carousel');
		}
	};
})(jQuery);