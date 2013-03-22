</div> <!-- #wrapper -->

<?php $options = get_option('turnkey_theme_options'); ?>

<div id="footer" class="group">
	<div id="footer-container" class="group">
		<div class="info">
			<p>
				<strong>&copy; <?php echo $options['businessname']; ?></strong> <br />
				<?php echo $options['addressline1']; ?> <br />
				<?php echo $options['addressline2']; ?> <br />
				<?php echo $options['phonenumber']; ?>
			</p>
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
		</div><!-- .info -->
		
			<div id="footer-widgets" class="widget-area group">
				<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('Footer Widgets')) : ?>
				<?php endif; ?>
			</div>
	</div><!-- #footer-container -->
</div><!-- #footer -->
	

<?php if(is_home()) { ?> 
	<div id="super-footer" class="group">
		<span class="powered-by-salesforce">This theme is brought to you by <a href="http://www.salesforce.com" target="_blank">Salesforce CRM</a>.</span>
	</div>
<?php } else {  ?>
	<div id="super-footer" class="group">
		<span class="powered-by-salesforce"><?php bloginfo('description'); ?></span>
	</div>
<?php } ?>     

<?php wp_footer(); ?>

</body>



</html>
