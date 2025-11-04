/**
 * Main JS file for Subtle behaviours
 */

/*globals jQuery, document */
(function ($) {
	"use strict";

	$(document).ready(function(){

		// Lazy loading for images
		if ('IntersectionObserver' in window) {
			const imageObserver = new IntersectionObserver((entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target;
						if (img.dataset.src) {
							img.src = img.dataset.src;
							img.classList.add('loaded');
							observer.unobserve(img);
						}
					}
				});
			});

			// Observe all images with data-src
			document.querySelectorAll('img[data-src]').forEach((img) => {
				imageObserver.observe(img);
			});
		} else {
			// Fallback for browsers that don't support IntersectionObserver
			$('img[data-src]').each(function() {
				$(this).attr('src', $(this).data('src'));
			});
		}

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

// Make cards fully clickable
$(document).on('click', function(event) {
	// Check if the clicked element is inside a card but not a link or button
	const cardElement = $(event.target).closest('.card')[0];
	const isLink = $(event.target).closest('a').length > 0;
	const isButton = $(event.target).closest('button').length > 0;
	
	// If clicked inside a card but not on a link or button, toggle the card
	if (cardElement && !isLink && !isButton) {
	  // Prevent the default behavior if clicking on the summary
	  if ($(event.target).closest('summary').length > 0) {
		event.preventDefault();
	  }
	  
	  // Toggle the open state
	  cardElement.open = !cardElement.open;
	}
  });

  
	});

}(jQuery));
