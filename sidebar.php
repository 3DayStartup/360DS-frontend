<?php $options = get_option('turnkey_theme_options'); ?>
<?php if($options['numcols'] != 'one-col') { ?>
<div id="sidebar">
	<div class="sidebar widget-area group" id="sidebar-1">
			<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar 1')) : ?>
			<?php endif; ?>		
	</div><!-- #sidebar-1 -->
		
	<div class="sidebar widget-area group" id="sidebar-2">
			<?php if (!function_exists('dynamic_sidebar') || !dynamic_sidebar('Sidebar 2')) : ?>
			<?php endif; ?>
	</div> <!-- #sidebar-2 -->			
</div>
<?php } ?>