<?php      

define('THEME_URI', get_stylesheet_directory_uri());
define('THEME_IMAGES', THEME_URI . '/assets/img');
define('THEME_CSS', THEME_URI . '/assets/css');
define('THEME_JS', THEME_URI . '/assets/js');
define('THEME_TEMPLATES', THEME_URI . '/assets/templates');   

$GLOBALS['content_width'] = 900;

/* Define Theme Defaults */
$options = get_option('turnkey_theme_options'); 
if($options['templatestyle'] == null)
	$options['templatestyle'] = 'modern';     
if($options['typography'] == null)
	$options['typography'] = 'typography1';

function turnkeySlider() {   
	
	
 		$options = get_option('turnkey_theme_options');  
                
		if($options['sliderTimer'] != null)
			$rotateTimer = $options['sliderTimer'];
		else
			$rotateTimer = 5000;
	
   ?>    
          
	<script type="text/javascript" charset="utf-8">     
	$(document).ready(function() {  
		$('.slide-container').cycle({ fx: 'scrollHorz',next: '#slide-nav .next',prev: '#slide-nav .prev',pause: 1, timeout:<?php echo $rotateTimer; ?>});	   
	});
	</script>

<?php
	}    
	
	add_action('wp_head', 'turnkeySlider');

require_once ( get_stylesheet_directory() . '/theme-options.php' );
require_once ( 'slider/turnkey-slider.php' );

if (function_exists('register_sidebar')) {
	register_sidebar(array(
		'name'=> 'Homepage Widgets',
		'id' => 'homepage_widgets',
		'before_widget' => '<div class="widget group %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h3>',
		'after_title' => '</h3>'
	));
	register_sidebar(array(
		'name'=> 'Sidebar 1',
		'id' => 'sidebar_1',
		'before_widget' => '<div class="widget group %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4>',
		'after_title' => '</h4>'
	));
	register_sidebar(array(
		'name'=> 'Sidebar 2',
		'id' => 'sidebar_2',
		'before_widget' => '<div class="widget group %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h4>',
		'after_title' => '</h4>'
	));
	register_sidebar(array(
		'name'=> 'Footer Widgets',
		'id' => 'footer-widgets',
		'before_widget' => '<div class="widget group %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h3>',
		'after_title' => '</h3>'
	));
}

if ( function_exists( 'register_nav_menus' ) ) {
	register_nav_menus(
		array(
			'turnkey_mainnav' => 'TurnKey Main Navigation',
			'turnkey_secondary' => 'TurnKey Secondary Navigation'
		)
	);
};

add_theme_support( 'post-thumbnails' );

// Makes Sure thumbnails show up in RSS
function do_post_thumbnail_feeds($content) {
	global $post;
	if(has_post_thumbnail($post->ID)) {
		$content = '<div>' . get_the_post_thumbnail($post->ID) . '</div>' . $content;
	}
	return $content;
}
add_filter('the_excerpt_rss', 'do_post_thumbnail_feeds');
add_filter('the_content_feed', 'do_post_thumbnail_feeds');

// Define Thumbnail Images Sizes
if ( function_exists( 'add_image_size' ) ) {
	add_image_size( 'post-thumb-threecol', 390, 200, true );
	add_image_size( 'post-thumb-onetwocol', 520, 200, true );
	/* Slide Image */ add_image_size( 'special', 580, 340, true );
}

if ( !is_admin() ) { // instruction to only load if it is not the admin area

	function googlejquery() {
	    wp_deregister_script( 'jquery' );
	    wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js');
	}    
	
	add_action('init', 'googlejquery');
	
	wp_register_script('functions',
     get_bloginfo('template_directory') . '/assets/js/functions.js');
  wp_register_script('cycle',
     get_bloginfo('template_directory') . '/assets/js/cycle.min.js');
  wp_register_script('lightbox',
     get_bloginfo('template_directory') . '/assets/js/lightbox_me.js');
   // enqueue the script
	 wp_enqueue_script('jquery'); 
   wp_enqueue_script('functions');
   wp_enqueue_script('cycle');
   wp_enqueue_script('lightbox'); 
};

function the_breadcrumb() {
	if (!is_home()) {
		echo '<a href="';
		echo get_option('home');
		echo '">';
		bloginfo('name');
		echo "</a> &raquo; ";
		if (is_category() || is_single()) {
			the_category('title_li=');
			if (is_single()) {
				echo " &raquo; ";
				the_title();
			}
		} elseif (is_page()) {
			echo " <span class='current'> ";
			echo the_title();
			echo " </span> ";

		}
	}
}

// Add Automatic Feed Links
add_theme_support('automatic-feed-links'); 

?>