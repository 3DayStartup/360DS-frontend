<?php
/*
Template Name: User Board
*/
?>
<!--
	user board
-->
<?php get_header(); ?>


<?php $options = get_option('turnkey_theme_options'); ?>

<div id="content" class="group <?php echo $options['numcols']; ?>">

	<div id="main-content">
		<div id="page-loader">Loading...</div>
		<ul id="content">content here</ul>
		<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		</div>

	<?php bloginfo('template_url'); ?>
	<?php if(have_posts()) : while(have_posts()) : the_post(); ?>
	 <?php the_post_thumbnail(); ?>

		<div class="post group" id="<?php the_ID(); ?>">
			<div class="post-content group">					
				<div class="post-content-container">
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
	
	
	<?php get_sidebar(); ?>

</div><!-- #content -->

		<script type="text/template" id="user-template">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
					×
				</button>
				<h3 id="myModalLabel">Modal header <%- name %></h3>
			</div>
			<div class="modal-body">
				<div class="view">
					<a class="toggle"><%- email %></label>
				</div>
				<input class="edit" type="text" data-key="email" value="<%- email %>" />
			</div>
			<div class="modal-footer">
				<button class="btn" data-dismiss="modal" aria-hidden="true">
					Close
				</button>
				<button class="btn btn-primary">
					Save changes
				</button>
			</div>
			
		</script>
		
		
		
		<script type="text/template" id="user-list-template">
			<a class="thumbnail" data-id="<%= id %>" data-toggle="modal" data-target="#myModal"><li>
				<img src="<%= profile_picture %>" alt="">
				<h4><%= name %></h4>
				<h5><%= participant_role %></h5>
				<h5><%= email %></h5>
			</li></a>
		</script>
		
<?php get_footer(); ?>
