<?php get_header(); ?>
<?php $options = get_option('turnkey_theme_options'); ?>

<?php if($options['showPosts'] == false && is_home() ) {} else { ?>
<div id="content" class="group <?php echo $options['numcols']; ?>">
	<h2 class="updates">
		<?php if(is_home()) { ?>Recent Updates
		<?php /* If this is a category archive */ } elseif (is_category()) { ?>
		Archive for the &#8216;<?php single_cat_title(); ?>&#8217; Category
		<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
		Posts Tagged &#8216;<?php single_tag_title(); ?>&#8217;
		<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
		Archive for <?php the_time('F jS, Y'); ?>
		<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
		Archive for <?php the_time('F, Y'); ?>
		<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
		Archive for <?php the_time('Y'); ?>
		<?php /* If this is an author archive */ } elseif (is_author()) { ?>
		Author Archive
		<?php /* If this is an author archive */ } elseif (is_search()) { ?>
			Search Results for &lsquo;<?php the_search_query(); ?>&rsquo;
		<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
		Blog Archives
		<?php } ?></h2>
	<div id="main-content">
	
	<?php if(have_posts()) : while(have_posts()) : the_post(); ?>
		<div <?php post_class();?> id="post-<?php the_ID(); ?>">
			<?php if($options['showDates'] == true) { ?>
			<span class="date"><?php the_time('M'); ?><strong><?php the_time('d'); ?></strong></span>
			<?php } ?>
			<div class="post-content group">					
				<div class="post-content-container">
					<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		      <span class="info">
		      	<strong class="author">Posted by <?php the_author_link(); ?></strong>
		      	<strong class="comments"><a href="<?php comments_link(); ?>"><?php comments_number('0 Comments', '1 Comment', '% Comments'); ?></a></strong>
		      	<strong class="tags"> <?php the_tags(); ?></strong>
		      </span>
		
					<div class="post-text group">
					<?php if($options['numcols'] == 'three-col') { ?>
						<?php the_post_thumbnail('post-thumb-threecol'); ?>
					<?php } else { ?>
						<?php the_post_thumbnail('post-thumb-onetwocol'); ?>
					<?php } 
					the_excerpt(); ?>
					</div><!-- .post-text -->	
					<p class="keep-reading"><a href="<?php the_permalink();?>" class="btn">Keep Reading &rarr;</a></p>
				</div><!-- .post-content-container -->
			</div><!-- .post-content -->
		</div><!-- .post -->	
		<?php endwhile; else : ?>
	
			<div class="post">
			
				<h2>Page Not Found</h2>
				
				<p>Looks like the page you're looking for isn't here anymore. Try browsing the <a href="">categories</a>, <a href="">archives</a>, or using the search box below.</p>
				
				<?php get_search_form();?>
			
			</div> <!-- .post -->
	
		<?php endif; ?>
	
		<div id="blog-nav">
			<span class="prev btn"><?php previous_posts_link('&larr; &nbsp; Previous') ?></span> 
			<span class="next btn"><?php next_posts_link('Next &nbsp; &rarr;') ?></span>
		</div>
	
	</div><!-- #main-content -->

	<?php get_sidebar(); ?>
</div>
<?php } ?>
<?php get_footer(); ?>