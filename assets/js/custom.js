/**
 * Main JS file for Subtle behaviours
 */

/*globals jQuery, document */
(function ($) {
	"use strict";

	$(document).ready(function(){

		// Responsive video embeds
		$('.post-content').fitVids();

		// Scroll to content
		$('.cover .arrow-down').on('click', function(e) {
			$('html, body').animate({'scrollTop': $('.cover').height()}, 800);
			e.preventDefault();
		});

		// Animated Back To Top link
		$('.site-footer .arrow-up').on('click', function(e) {
			$('html, body').animate({'scrollTop': 0});
			e.preventDefault();
		});

		// Sidebar
		$('.sidebar-toggle').on('click', function(e){
			$('body').toggleClass('sidebar-opened');
			e.preventDefault();
		});

		// Show comments
		$('.comments-title').on('click', function() {
			var disqus_shortname = 'my_disqus_shortname'; // replace my_disqus_shortname with your shortname

			// Load the disqus javascript
			$.ajax({
				type: "GET",
				url: "//" + disqus_shortname + ".disqus.com/embed.js",
				dataType: "script",
				cache: true
			});
			$(this).off('click').addClass('comments-loaded');
		});

	});

}(jQuery));
