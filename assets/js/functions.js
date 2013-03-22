$(document).ready(function() {  
	$('.slide-img .play-video').click(function() {
    $(this).next().next().lightbox_me({ destroyOnClose: true, centered: true });
    return false;
	});
	$('.video-embed .close').click(function() {
    $(this).append('body>.video-embed');
	});
	$('#main-nav .active a').append('<span class="left"></span>').append('<span class="right"></span>');
	$('.widget-area div:last-child').addClass('last');
	$('#main-nav li').hover(function(){	
		$(this).find('ul:first').fadeIn("medium");
	}, function() {
		$(this).find('ul:first').fadeOut("medium");
	});
});