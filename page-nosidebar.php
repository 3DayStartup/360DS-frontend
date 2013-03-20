<?php 
/* Template Name: No Sidebars - Full Width  */ 
?>

<?php get_header(); ?>


<?php $options = get_option('turnkey_theme_options'); ?>

<div id="content" class="group one-col">

	<div id="main-content">
	
	<?php if(have_posts()) : while(have_posts()) : the_post(); ?>
	 <?php the_post_thumbnail(); ?>

		<div class="post group" id="<?php the_ID(); ?>">
			<div class="post-content group">					
				<div class="post-content-container">
					<h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
					<div class="post-text">
						<?php the_content(); ?>
					</div><!-- .post-text -->
				</div><!-- .post-content-container -->
			</div><!-- .post-content -->
		</div><!-- .post -->	
		<?php endwhile; else : ?>
	
			<div class="post">
			
				<h2>Page Not Found</h2>
				
				<p>Looks like the page you're looking for isn't here anymore. Try browsing the <a href="">categories</a>, <a href="">archives</a>, or using the search box below.</p>
				
				<?php get_search_form(); ?>
			
			</div> <!-- .post -->
	
		<?php endif; ?>
	
		<div id="blog-nav">
			<span class="prev btn"><?php next_posts_link('&larr; &nbsp; Previous') ?></span> 
			<span class="next btn"><?php next_posts_link('Next &nbsp; &rarr;') ?></span>
		</div>
	
	</div><!-- #main-content -->

</div><!-- #content -->


<?php get_footer(); ?>