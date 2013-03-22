
<!DOCTYPE html >
<html >
<head profile="http://gmpg.org/xfn/11">

	<title><?php bloginfo('name'); ?> <?php wp_title(); ?></title>

	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="generator" content="WordPress <?php bloginfo('version'); ?>" /> <!-- Leave this for stats please -->

	<?php $options = get_option('turnkey_theme_options'); ?>

	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
	<link href="<?php echo THEME_CSS; ?>/globals.css" rel="stylesheet" type="text/css" media="screen" />
	<link href="<?php echo THEME_CSS; ?>/<?php if($options['typography'] == null || $options['typography'] == '') { ?>typography1<?php } else { echo $options['typography']; } ?>.css" rel="stylesheet" type="text/css" media="screen" />
	<link href="<?php echo THEME_TEMPLATES; ?>/<?php if($options['templatestyle'] == null || $options['templatestyle'] == '') { ?>modern<?php } else { echo $options['templatestyle']; } ?>/style.css" rel="stylesheet" type="text/css" media="screen" />
	<link href="<?php bloginfo('stylesheet_directory') ?>/style.css" rel="stylesheet" type="text/css" media="screen" />
	<!--[if IE 8]>
		<link href="<?php echo THEME_CSS; ?>/ie8.css" rel="stylesheet" type="text/css" media="screen" /><![endif]-->
	<!--[if IE 7]>
		<link href="<?php echo THEME_CSS; ?>/ie7.css" rel="stylesheet" type="text/css" media="screen" /><![endif]-->
	<!--[if lte IE 6]>
		<style type="text/css">
			img, div, a, input, h2, li, h4, span, .post .info .comments, .post .info .author { behavior: url(<?php echo THEME_JS; ?>/iepngfix-mod.htc) }
		</style>
		<link href="<?php bloginfo('template_directory'); ?>/assets/css/ie6.css" rel="stylesheet" type="text/css" media="screen" /><![endif]-->

	<link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
	<link rel="alternate" type="text/xml" title="RSS .92" href="<?php bloginfo('rss_url'); ?>" />
	<link rel="alternate" type="application/atom+xml" title="Atom 0.3" href="<?php bloginfo('atom_url'); ?>" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<?php	if ( is_singular() && get_option( 'thread_comments' ) )
	wp_enqueue_script( 'comment-reply' );
	wp_head(); ?>

  <?php if($options['customcss'] == true) { ?>
		<link href="<?php echo THEME_URI; ?>/custom.css" rel="stylesheet" type="text/css" media="screen" />
	<?php } ?>


</head>

<body <?php body_class(); ?>>

<div id="super-header" class="group">
	<div class="wrap">

		<?php wp_nav_menu( array( 'container' => '', 'menu_id' => 'top-nav', 'theme_location' => 'turnkey_secondary', 'depth' => '1') ); ?>
		<?php get_search_form(); ?>
		<ul class="social">

			<?php if( $options['facebook'] != '' ): ?>
				<li class="facebook"><a href="http://facebook.com/<?php echo $options['facebook']; ?>" target = "_blank">Facebook</a></li>
			<?php endif; ?>
			<?php if( $options['twitter'] != '' ): ?>
				<li class="twitter"><a href="http://twitter.com/<?php echo $options['twitter']; ?>" target = "_blank">Twitter</a></li>
			<?php endif; ?>
			<?php if( $options['flickr'] != '' ): ?>
				<li class="flickr"><a href="http://flickr.com/<?php echo $options['flickr']; ?>" target = "_blank">Flickr</a></li>
			<?php endif; ?>

			<?php if( $options['youtube'] != '' ): ?>
				<li class="youtube"><a href="http://youtube.com/<?php echo $options['youtube']; ?>" target = "_blank">YouTube</a></li>
			<?php endif; ?>
			<li class="rss"><a href="/feed/rss">RSS</a></li>

		</ul>
	</div><!-- .wrap -->
</div><!-- #super-header -->

<div id="wrapper" class="group <?php if($options['showDates'] == false) { ?>no-dates<?php } ?>">

	<div id="header" class="group">

		<?php if ($options['logoaddress'] != null) { ?>
			<a href="<?php bloginfo('url'); ?>"  class="logo-img"><img src = "<?php echo $options['logoaddress']; ?>" alt="<?php if($options['businessname'] != null) echo $options['businessname']; else echo bloginfo('name'); ?>" /></a>
		<?php } else { ?>
			<a href="<?php bloginfo('url'); ?>" class="logo"><?php if($options['businessname'] != null) echo $options['businessname']; else echo bloginfo('name'); ?></a>
		<?php } ?>

		<?php wp_nav_menu( array( 'container' => '', 'menu_id' => 'main-nav', 'theme_location' => 'turnkey_mainnav' ) ); ?>

	</div> <!-- #header -->

	<?php if(is_front_page()) { ?>

		<?php
			$sliderCount = $wpdb->get_var("SELECT COUNT(*) FROM $wpdb->posts WHERE post_status = 'publish' AND post_type = 'slider'");
			if (0 < $sliderCount) $sliderCount = number_format($sliderCount);
		?>

	<div id="slideshow" class="group">
			<?php if ($sliderCount > 1) {  ?>
			<div id="slide-nav" class="group">
				<a class="prev" href="#">Prev</a>
				<a class="next" href="#">Next</a>
			</div>
			<?php } ?>
		<div class="slide-container">

				<?php
					$loop = new WP_Query(array('post_type' => 'slider', 'orderby' => 'menu_order', 'order' => 'ASC' ));

					if(!$loop->have_posts())
					{ ?>

						 <div class="slide group">
								<div class="slide-content">
								</div><!-- .slide-content -->
								<div class="slide-img">

									<img src = "<?php bloginfo('template_directory'); ?>/assets/images/turnkey_configure.png" />

								</div>
							</div><!-- .slide -->

					<?php }

					while ( $loop->have_posts() ) : $loop->the_post();

						$rotatorMedia = get_post_meta( get_the_ID(), 'turnkey_mediacontent', true );
						$rotatorLink = get_post_meta( get_the_ID(), 'turnkey_rotatorlink', true );
						$rotatorButton = get_post_meta( get_the_ID(), 'turnkey_rotatorbutton', true );
						$rotatorNewWindow = get_post_meta( get_the_ID(), 'turnkey_new_window', true );
					?>

						<div class="slide group <?php if($rotatorMedia != null) echo 'video'; ?>">
							<div class="slide-content">
								<h2><a href="<?php echo $rotatorLink; ?>"><?php the_title(); ?></a></h2>
								<p>
									<?php echo get_the_content(); ?>

								</p>
								<?php if($rotatorButton != null) {  ?>
								<p class="center">
									<a href="<?php echo $rotatorLink; ?>" <?php if($rotatorNewWindow == 'on') echo 'target = "_blank"'; ?> class="btn"><?php if($rotatorButton != null) echo $rotatorButton; ?></a>
								</p>
								<?php } ?>
							</div><!-- .slide-content -->
							<div class="slide-img">

								<?php if( $rotatorMedia != null) { ?>
									<a href="#" class="play-video">Play Video &rarr;</a>
								<?php } ?>

								<?php the_post_thumbnail( 'special' ); ?>

								<?php if( $rotatorMedia != null) { ?>
									<div class="video-embed group">
										<?php echo $rotatorMedia; ?>
									 <br />
										<a class="close" href="#">Close</a>
									</div>
								<?php } ?>
							</div>
						</div><!-- .slide -->

				<?php endwhile; ?>
		</div><!-- .slide-container -->
	</div><!-- #slideshow -->
		<div id="contact-us" class="group">
			<p class="blurb <?php if($options['showIntroButton'] == 1) echo 'short'; else echo 'full'; ?>">
				<?php echo $options['introtextarea']; ?>
			</p>
			<?php if($options['showIntroButton'] == 1) { ?>

				<a href="<?php echo $options['mainbuttonlink']; ?>" class="contact-us btn" <?php if($options['introNewWindow'] == 1) echo 'target = "_blank"'; ?>><?php echo $options['mainbuttontext']; ?> <br /> <em><?php echo $options['mainbuttonsub']; ?></em></a>
			<?php } ?>
		</div>

		<div id="homepage-widgets" class="widget-area group">
			<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('Homepage Widgets')) : ?>
			<?php endif; ?>
		</div><!-- #homepage-widgets -->

	<?php }; ?>

<?php // bloginfo('url'); ?>
<?php // bloginfo('template_directory'); ?>
