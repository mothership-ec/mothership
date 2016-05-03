/**
 * Mothership Site jQuery
 *
 * All general site scripts are to be contained here
 */

jQuery(document).ready(function($) {

	var resizeTimeout;
	$(window).resize(function() {
	    clearTimeout(resizeTimeout);
	    resizeTimeout = setTimeout(function(){$(window).trigger('resize-end')}, 500);
	});

	var mobile = false;

    if (window.innerWidth <= 768) {
        mobile = true;
    } else {
        mobile = false;
    }

	 var stickyFooter = function(){
    	var marginals = $('.header').height() + $('.footer').height(),
    		winHeight = $(window).height(),
    		content = $('main.content');

        if (mobile == false) {
            content.css('min-height',  winHeight - marginals);
        } 
    }

    $(window).on('load', stickyFooter);
    $(window).on('resize', stickyFooter);


    // Set JS class
    $('.no-js').removeClass('no-js').addClass('js');


	// Scroll to top button
	$('.top').on('click', function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

	// Tabs 


	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})


	// Returns Toggle


	$(function() {
        var toggleReturnsInput = function() {
            var val;
            val = $('#form_resolution').val();

            if ('refund' == val) {
                $('#form_exchangeUnit').parents('.field').hide(0);
            }
            else {
                $('#form_exchangeUnit').parents('.field').show(0);
            }
        };

        $('#form_resolution').change(function() {
            toggleReturnsInput();
        });

        toggleReturnsInput();
    });
    
});