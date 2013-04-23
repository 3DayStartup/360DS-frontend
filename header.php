
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

<!-- user board files -->
<meta name="viewport" content="width=device-width">
<link href="<?php echo THEME_CSS; ?>/userboard/bootstrap.min.css" rel="stylesheet" type="text/css" media="screen" /> 
<link href="<?php echo THEME_CSS; ?>/userboard/bootstrap-responsive.min.css" rel="stylesheet" type="text/css" media="screen" /> 
<link href="<?php echo THEME_CSS; ?>/userboard/main.css" rel="stylesheet" type="text/css" media="screen" />
<link href="<?php echo THEME_CSS; ?>/userboard/font-awesome.min.css" rel="stylesheet" type="text/css" media="screen" />

<script data-main="<?php echo THEME_JS; ?>/userboard/main" src="<?php echo THEME_JS; ?>/userboard/require.js"></script>

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
