<?php

add_action( 'admin_init', 'theme_options_init' );
add_action( 'admin_menu', 'theme_options_add_menu' );



/**
 * Init plugin options to white list our options
 */
function theme_options_init(){
	register_setting( 'sample_options', 'turnkey_theme_options', 'theme_options_validate' );
}

/**
 * Load up the menu page
 */
function theme_options_add_menu() {
	add_theme_page( __( 'Theme Options' ), __( 'Turnkey Theme' ), 'edit_theme_options', 'theme_options', 'theme_options_do_page' );
}

/**
 * Create arrays for our select and radio options
 */
$style_options = array(
	'modern' => array(
		'value' =>	'modern',
		'label' => __( 'Modern' )
	),
	'textured' => array(
		'value' =>	'textured',
		'label' => __( 'Textured' )
	),
	'corporate' => array(
		'value' => 'corporate',
		'label' => __( 'Corporate' )
	),
	'3dsevent' => array(
		'value' => '3dsevent',
		'label' => __('3DS Event Template')
	)
);

$cols_options = array(
		'one-col' => array(
			'value' =>	'one-col',
			'label' => __( 'One Column - No Sidebars' )
		),
		'two-col' => array(
			'value' =>	'two-col',
			'label' => __( 'Two Columns' )
		),
		'three-col' => array(
			'value' => 'three-col',
			'label' => __( 'Three Columns' )
		)
	);    
  
$type_options = array(
	'typography1' => array(
		'value' =>	'typography1',
		'label' => __( 'Bebas Neue and Georgia' )
	),
	'typography2' => array(
		'value' =>	'typography2',
		'label' => __( 'Eau and Lucida Grande or Verdana' )
	),
	'typography3' => array(
		'value' => 'typography3',
		'label' => __( 'Chunk Five and CartoGothic' )
	)
);

/**
 * Create the options page
 */
function theme_options_do_page() {
	global $style_options, $cols_options, $type_options;

	if ( ! isset( $_REQUEST['updated'] ) )
		$_REQUEST['updated'] = false;

	?>
	
	<div class="wrap">
		<?php screen_icon(); echo "<h2>" . get_current_theme() . __( ' Theme Options' ) . "</h2>"; ?>

		<?php if ( false !== $_REQUEST['updated'] ) : ?>
		<div class="updated fade"><p><strong><?php _e( 'Options saved' ); ?></strong></p></div>
		<?php endif; ?>

		<form method="post" action="options.php">
			<?php settings_fields( 'sample_options' ); ?>
			<?php $options = get_option( 'turnkey_theme_options' ); ?>
			
		<div style="float: left; width: 49%;">
			<div class="postbox metabox-holder" style="padding-top: 0px">
				<h3 class="hndle" style="font-size: 16px; padding: 10px 10px"><span>Business Information</span></h3>
		
					<table class="form-table">
		
						<?php
						/**
						 * Business or Organization Name
						 */
						?>
						<tr valign="top"><th scope="row"><?php _e( 'Business or Organization Name' ); ?></th>
							<td>
								<input id="turnkey_theme_options[businessname]" class="regular-text" type="text" name="turnkey_theme_options[businessname]" value="<?php esc_attr_e( $options['businessname'] ); ?>" /><br />
								<label class="description" for="turnkey_theme_options[businessname]"><?php _e( 'This name will display in the header and footer.' ); ?></label>
							</td>
						</tr>
						
						<?php
						/**
						 * Street Name
						 */
						?>
						<tr valign="top"><th scope="row"><?php _e( 'Street Name' ); ?></th>
							<td>
								<input id="turnkey_theme_options[addressline1]" class="regular-text" type="text" name="turnkey_theme_options[addressline1]" value="<?php esc_attr_e( $options['addressline1'] ); ?>" /><br />
								<label class="description" for="turnkey_theme_options[addressline1]"><?php _e( 'This line will appear in the footer. Example: 123 Street Road.' ); ?></label>
							</td>
						</tr>
						
						<?php
						/**
						 * City, State, Zip/Postal Code
						 */
						?>
						<tr valign="top"><th scope="row"><?php _e( 'City, State, Zip/Postal Code' ); ?></th>
							<td>
								<input id="turnkey_theme_options[addressline2]" class="regular-text" type="text" name="turnkey_theme_options[addressline2]" value="<?php esc_attr_e( $options['addressline2'] ); ?>" /><br />
								<label class="description" for="turnkey_theme_options[addressline2]"><?php _e( 'This line will appear in the footer. Example: Reno, NV 89503' ); ?></label>
							</td>
						</tr>
						
						
						<?php
						/**
						 * Phone Number
						 */
						?>
						<tr valign="top"><th scope="row"><?php _e( 'Phone Number' ); ?></th>
							<td>
								<input id="turnkey_theme_options[phonenumber]" class="regular-text" type="text" name="turnkey_theme_options[phonenumber]" value="<?php esc_attr_e( $options['phonenumber'] ); ?>" /><br />
								<label class="description" for="turnkey_theme_options[phonenumber]"><?php _e( 'This phone number will display in the footer. ' ); ?></label>
							</td>
						</tr>
						
						
						<?php
						/**
						 * Logo URL
						 */
						?>
						<tr valign="top"><th scope="row"><?php _e( 'Your Logo URL' ); ?></th>
							<td>
								<input id="turnkey_theme_options[logoaddress]" class="regular-text" type="text" name="turnkey_theme_options[logoaddress]" value="<?php esc_attr_e( $options['logoaddress'] ); ?>" /><br />
								<label class="description" for="turnkey_theme_options[logoaddress]"><?php _e( 'This logo will display in the header. Logo should have a transparent background or sampled color from header. Upload with the WordPress <a href = "' . get_bloginfo('url') .'/wp-admin/media-new.php" target = "_blank">media uploader</a>.' ); ?></label>
							</td>
						</tr>
					<tr>
						<td colspan="2">
							<p class="submit" style="text-align: center; border-top: 1px #dddddd solid; padding: 10px 0 0 0">
								<input type="submit" class="button-primary" value="<?php _e( 'Save Options' ); ?>" style="padding: 8px 20px; font-size: 12px !	important"/>
							</p>	
						</td>
					</tr>
				</table>
			</div>
			<div class="postbox metabox-holder" style="padding-top: 0px">
				<h3 class="hndle title" style="font-size: 16px; padding: 10px 10px"><span>Social Networks</span></h3>		
				<table class="form-table">
							
					
					<?php
					/**
					 * Twitter
					 */
					?>
					<tr valign="top"><th scope="row"><?php _e( 'Twitter' ); ?></th>
						<td>
							<input id="turnkey_theme_options[twitter]" class="regular-text" type="text" name="turnkey_theme_options[twitter]" value="<?php esc_attr_e( $options['twitter'] ); ?>" /><br />
							<label class="description" for="turnkey_theme_options[twitter]"><?php _e( 'Your Twitter handle, please do not include the @ character (example: salesforce)' ); ?></label>
						</td>
					</tr>
					
					<?php
					/**
					 * Facebook
					 */
					?>
					<tr valign="top"><th scope="row"><?php _e( 'Facebook' ); ?></th>
						<td>
							<input id="turnkey_theme_options[facebook]" class="regular-text" type="text" name="turnkey_theme_options[facebook]" value="<?php esc_attr_e( $options['facebook'] ); ?>" /><br />
							<label class="description" for="turnkey_theme_options[facebook]"><?php _e( 'Your facebook handle, following www.facebook.com/ (example: salesforce)' ); ?></label>
						</td>
					</tr>
					
					<?php
					/**
					 * Flickr
					 */
					?>
					<tr valign="top"><th scope="row"><?php _e( 'Flickr' ); ?></th>
						<td>
							<input id="turnkey_theme_options[flickr]" class="regular-text" type="text" name="turnkey_theme_options[flickr]" value="<?php esc_attr_e( $options['flickr'] ); ?>" /><br />
							<label class="description" for="turnkey_theme_options[flickr]"><?php _e( 'Your flickr username, following www.flickr.com/ (example: salesforce)' ); ?></label>
						</td>
					</tr>
					
					
					<?php
					/**
					 * YouTube
					 */
					?>
					<tr valign="top"><th scope="row"><?php _e( 'YouTube' ); ?></th>
						<td>
							<input id="turnkey_theme_options[youtube]" class="regular-text" type="text" name="turnkey_theme_options[youtube]" value="<?php esc_attr_e( $options['youtube'] ); ?>" /><br />
							<label class="description" for="turnkey_theme_options[youtube]"><?php _e( 'Your YouTube handle, following www.youtube.com/ (example: salesforce)' ); ?></label>
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<p class="submit" style="text-align: center; border-top: 1px #dddddd solid; padding: 10px 0 0 0">
								<input type="submit" class="button-primary" value="<?php _e( 'Save Options' ); ?>" style="padding: 8px 20px; font-size: 12px !	important"/>
							</p>	
						</td>
					</tr>
				</table>
			</div>		
		</div>
		<div style="float: right; width: 49%">
		<div class="postbox metabox-holder" style="padding-top: 0px">
			<h3 class="hndle title" style="font-size: 16px; padding: 10px 10px"><span>Theme Style and Display</span></h3>
			<table class="form-table">			

				<tr valign="top"><th scope="row"><?php _e( 'Select a style' ); ?></th>
					<td>
						<select name="turnkey_theme_options[templatestyle]">
							<?php
								$selectedStyle = $options['templatestyle'];
								$p = '';
								$r = '';

								foreach ( $style_options as $option ) {
									$label = $option['label'];
									if ( $selectedStyle == $option['value'] ) // Make default first in list
										$p = "\n\t<option style=\"padding-right: 10px;\" selected='selected' value='" . esc_attr( $option['value'] ) . "'>$label</option>";
									else
										$r .= "\n\t<option style=\"padding-right: 10px;\" value='" . esc_attr( $option['value'] ) . "'>$label</option>";
								}
								echo $p . $r;
							?>
						</select><br />
						<label class="description" for="turnkey_theme_options[templatestyle]"><?php _e( 'Select one of three distinct theme styles' ); ?></label>
					</td>
				</tr>

				<tr valign="top"><th scope="row"><?php _e( 'Select a type style' ); ?></th>
					<td>
						<select name="turnkey_theme_options[typography]">
							<?php
								$selectedStyle = $options['typography'];
								$p = '';
								$r = '';

								foreach ( $type_options as $option ) {
									$label = $option['label'];
									if ( $selectedStyle == $option['value'] ) // Make default first in list
										$p = "\n\t<option style=\"padding-right: 10px;\" selected='selected' value='" . esc_attr( $option['value'] ) . "'>$label</option>";
									else
										$r .= "\n\t<option style=\"padding-right: 10px;\" value='" . esc_attr( $option['value'] ) . "'>$label</option>";
								}
								echo $p . $r;
							?>
						</select><br />
						<label class="description" for="turnkey_theme_options[typography]"><?php _e( 'Select one of three typography schemes' ); ?></label>
					</td>
				</tr>   
				
				  	<tr valign="top"><th scope="row"><?php _e( 'Use custom.css?' ); ?></th>
						  	 <td>
									<input id="turnkey_theme_options[customcss]" name="turnkey_theme_options[customcss]" type="checkbox" value="1" <?php checked( '1', $options['customcss'] ); ?> />
									<label class="description" for="turnkey_theme_options[customcss]"><?php _e( 'Use your own styles defined in custom.css' ); ?></label>
								</td>
						</tr>
				
				<?php
				/**
				 * Checkbox to show or hide the blog entries on the home page
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Blog Entries' ); ?></th>
					<td>
						<input id="turnkey_theme_options[showPosts]" name="turnkey_theme_options[showPosts]" type="checkbox" value="1" <?php checked( '1', $options['showPosts'] ); ?> />
						<label class="description" for="turnkey_theme_options[showPosts]"><?php _e( 'Display on home page' ); ?></label>
					</td>
				</tr>
				
					<?php
					/**
					 * Checkbox to show or hide dates on blog entries
					 */
					?>
					<tr valign="top"><th scope="row"><?php _e( 'Blog Entry Dates' ); ?></th>
						<td>
							<input id="turnkey_theme_options[showDates]" name="turnkey_theme_options[showDates]" type="checkbox" value="1" <?php checked( '1', $options['showDates'] ); ?> />
							<label class="description" for="turnkey_theme_options[showPosts]"><?php _e( 'Display dates on entries' ); ?></label>
						</td>
					</tr>

				<?php
				/**
				 * A sample of radio buttons
				 */
				?>
				<tr valign="top"><th scope="row"><?php _e( 'Number of Columns' ); ?></th>
					<td>
						<fieldset><legend class="screen-reader-text"><span><?php _e( 'Number of Columns' ); ?></span></legend>
						<?php
							if ( ! isset( $checked ) )
								$checked = '';
							foreach ( $cols_options as $option ) {
								$radio_setting = $options['numcols'];

								if ( '' != $radio_setting ) {
									if ( $options['numcols'] == $option['value'] ) {
										$checked = "checked=\"checked\"";
									} else {
										$checked = '';
									}
								}
								?>
								<label class="description"><input type="radio" name="turnkey_theme_options[numcols]" value="<?php esc_attr_e( $option['value'] ); ?>" <?php echo $checked; ?> /> <?php echo $option['label']; ?></label><br />
								<?php
							}
						?>
						</fieldset>
					</td>
				</tr>
					<tr>
						<td colspan="2">
							<p class="submit" style="text-align: center; border-top: 1px #dddddd solid; padding: 10px 0 0 0">
								<input type="submit" class="button-primary" value="<?php _e( 'Save Options' ); ?>" style="padding: 8px 20px; font-size: 12px !	important"/>
							</p>	
						</td>
					</tr>
			</table>
		</div>
	
			<div class="postbox metabox-holder" style="padding-top: 0px">
				<h3 class="hndle title" style="font-size: 16px; padding: 10px 10px"><span>Featured Text</span></h3>
					<table class="form-table">
					</tr>
					
					<?php
					/**
					 * Intro Text
					 */
					?>
					<tr valign="top"><th scope="row"><?php _e( 'Intro Text' ); ?></th>
						<td>
							<textarea id="turnkey_theme_options[introtextarea]" class="large-text" cols="50" rows="5" name="turnkey_theme_options[introtextarea]"><?php echo stripslashes( $options['introtextarea'] ); ?></textarea><br />
							<label class="description" for="turnkey_theme_options[introtextarea]"><?php _e( 'This intro text hows up on the home page' ); ?></label>
						</td>
					</tr> 
					<tr>
						<td colspan="2">
							<p class="submit" style="text-align: center; border-top: 1px #dddddd solid; padding: 10px 0 0 0">
								<input type="submit" class="button-primary" value="<?php _e( 'Save Options' ); ?>" style="padding: 8px 20px; font-size: 12px !	important"/>
							</p>	
						</td>
					</tr>
				</table>
			</div>   
			
			 <div class="postbox metabox-holder" style="padding-top: 0px">
					<h3 class="hndle title" style="font-size: 16px; padding: 10px 10px"><span>Intro Button</span></h3>
						<table class="form-table">
						</tr>   
						
						
						<tr valign="top"><th scope="row"><?php _e( 'Display Intro Button?' ); ?></th>
							<td>
								<input id="turnkey_theme_options[showIntroButton]" name="turnkey_theme_options[showIntroButton]" type="checkbox" value="1" <?php checked( '1', $options['showIntroButton'] ); ?> />
								<label class="description" for="turnkey_theme_options[showIntroButton]"><?php _e( 'Display intro button on home page' ); ?></label>
							</td>
						</tr>

						<?php
						/**
						 * Intro Hero Button
						 */
						?>
						<tr valign="top"><th scope="row"><?php _e( 'Intro Button Main Text' ); ?></th>
							<td>
								<input id="turnkey_theme_options[mainbuttontext]" class="regular-text" type="text" name="turnkey_theme_options[mainbuttontext]" value="<?php esc_attr_e( $options['mainbuttontext'] ); ?>" /><br />
								<label class="description" for="turnkey_theme_options[mainbuttontext]"><?php _e( 'Intro button main text' ); ?></label>
							</td>
						</tr>

						<?php
						/**
						 * Intro Hero Button Subtext
						 */
						?>
						<tr valign="top"><th scope="row"><?php _e( 'Intro Button Sub Text' ); ?></th>
							<td>
								<input id="turnkey_theme_options[mainbuttonsub]" class="regular-text" type="text" name="turnkey_theme_options[mainbuttonsub]" value="<?php esc_attr_e( $options['mainbuttonsub'] ); ?>" /><br />
								<label class="description" for="turnkey_theme_options[mainbuttonsub]"><?php _e( 'Intro button sub-text' ); ?></label>
							</td>
						</tr>

						<?php
						/**
						 * Intro Hero Button Link
						 */
						?>
						<tr valign="top"><th scope="row"><?php _e( 'Intro Button Link' ); ?></th>
							<td>
								<input id="turnkey_theme_options[mainbuttonlink]" class="regular-text" type="text" name="turnkey_theme_options[mainbuttonlink]" value="<?php esc_attr_e( $options['mainbuttonlink'] ); ?>" /><br />
								<label class="description" for="turnkey_theme_options[mainbuttonlink]"><?php _e( 'A url to where you\'d like this button to link to' ); ?></label>
							</td>
						</tr>  
						
						    
					    <tr valign="top"><th scope="row"><?php _e( 'Open in New Window?' ); ?></th>
							<td>
								<input id="turnkey_theme_options[introNewWindow]" name="turnkey_theme_options[introNewWindow]" type="checkbox" value="1" <?php checked( '1', $options['introNewWindow'] ); ?> />
								<label class="description" for="turnkey_theme_options[introNewWindow]"><?php _e( 'Open intro button in new window?' ); ?></label>
							</td>
						</tr>   
							
							
						<tr>
							<td colspan="2">
								<p class="submit" style="text-align: center; border-top: 1px #dddddd solid; padding: 10px 0 0 0">
									<input type="submit" class="button-primary" value="<?php _e( 'Save Options' ); ?>" style="padding: 8px 20px; font-size: 12px !	important"/>
								</p>	
							</td>
						</tr>

					</table>
				</div>
	
			<div class="postbox metabox-holder" style="padding-top: 0px">
				<h3 class="hndle title" style="font-size: 16px; padding: 10px 10px"><span>Rotating Slider</span></h3>
					 <table class="form-table">

							<?php
							/**
							 * Rotator Instructions
							 */
							?>
							<tr valign="top">
								<td>
									<label class="description">To select images and content to appear in the rotating slider, you must create slides under the Turnkey Silder panel. Images in the slider will be 580 by 340 pixels. <a href = "<?php bloginfo('url'); ?>/wp-admin/edit.php?post_type=slider" target = "_blank">[Configure here]</a></label>
								</td>
							</tr>    
							<tr valign="top">
									<td><?php _e( 'Rotating Auto-advance' ); ?>
										 <select name="turnkey_theme_options[sliderTimer]"> 
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 0) echo 'selected'; ?> value = "0">No auto advance</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 1000) echo 'selected'; ?> value = "1000">1 second</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 2000) echo 'selected'; ?> value = "2000">2 seconds</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 3000) echo 'selected'; ?> value = "3000">3 seconds</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 4000) echo 'selected'; ?> value = "4000">4 seconds</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 5000) echo 'selected'; ?> value = "5000">5 seconds</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 6000) echo 'selected'; ?> value = "6000">6 seconds</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 7000) echo 'selected'; ?> value = "7000">7 seconds</option>     
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 8000) echo 'selected'; ?> value = "8000">8 seconds</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 9000) echo 'selected'; ?> value = "9000">9 seconds</option>
											   <option style = "padding-right: 10px;" <?php if($options['sliderTimer'] == 10000) echo 'selected'; ?> value = "10000">10 seconds</option>
											</select><br />
										<label class="description" for="turnkey_theme_options[sliderTimer]"><?php _e( 'Select time in seconds' ); ?></label>
									</td>
								</tr>
					<tr>
						<td colspan="2">
							<p class="submit" style="text-align: center; border-top: 1px #dddddd solid; padding: 10px 0 0 0">
								<input type="submit" class="button-primary" value="<?php _e( 'Save Options' ); ?>" style="padding: 8px 20px; font-size: 12px !	important"/>
							</p>	
						</td>
					</tr>
						</table>
				</div>
					
				<div class="postbox metabox-holder" style="padding-top: 0px">
					<h3 class="hndle title" style="font-size: 16px; padding: 10px 10px" target ="_blank"><span>Widgets</span></h3>
						<table class="form-table">
						
					<?php
					/**
					 * Widgets options
					 */
					?>
					<tr valign="top">
						<td>
							<label class="description">To display your widgets, configure them under the Widgets panel. <a href = "<?php bloginfo('url'); ?>/wp-admin/widgets.php" target ="_blank" target = "_blank">[Configure here]</a></label>
						</td>
					</tr>
				</table>
			</div>
			<div class="postbox metabox-holder" style="padding-top: 0px">
				<h3 class="hndle title" style="font-size: 16px; padding: 10px 10px"><span>Menus &amp; Navigation</span></h3>
					<table class="form-table">
					
					
					<?php
					/**
					 * Menu options
					 */
					?>
					<tr valign="top">
						<td>
								<label class="description">This theme uses WordPress menus. You may customize them in the Theme Menus panel. <a href = "<?php bloginfo('url'); ?>/wp-admin/nav-menus.php" target ="_blank">[Configure here]</a></label>
						</td>
					</tr>
				</table>
			</div>  
			
			
		</div>
		</div>
		</form>
	<?php
}

/**
 * Sanitize and validate input. Accepts an array, return a sanitized array.
 */
function theme_options_validate( $input ) {
	global $style_options, $cols_options, $type_options;
	
	$input['numSlides'] = $_GET;

	if ( ! isset( $input['showPosts'] ) )
		$input['showPosts'] = null;
		$input['showPosts'] = ( $input['showPosts'] == 1 ? 1 : 0 );
		
	if ( ! isset( $input['showDates'] ) )
		$input['showDates'] = null;
		$input['showDates'] = ( $input['showDates'] == 1 ? 1 : 0 ); 
		
	if ( ! isset( $input['showIntroButton'] ) )
	   $input['showIntroButton'] = null;
		$input['showIntroButton'] = ( $input['showIntroButton'] == 1 ? 1 : 0 );   
		
	if ( ! isset( $input['introNewWindow'] ) )
		$input['introNewWindow'] = null;
		$input['introNewWindow'] = ( $input['introNewWindow'] == 1 ? 1 : 0 );      
		
		
	if ( ! isset( $input['customcss'] ) )
		$input['customcss'] = null;
		$input['customcss'] = ( $input['customcss'] == 1 ? 1 : 0 );       
	  
   $input['sliderTimer'] = $input['sliderTimer'];
	$input['twitter'] = wp_filter_nohtml_kses( $input['twitter'] );
	$input['facebook'] = wp_filter_nohtml_kses( $input['facebook'] );
	$input['flickr'] = wp_filter_nohtml_kses( $input['flickr'] );
	$input['youtube'] = wp_filter_nohtml_kses( $input['youtube'] );
	$input['businessname'] = wp_filter_nohtml_kses( $input['businessname'] );
	$input['addressline1'] = wp_filter_nohtml_kses( $input['addressline1'] );
	$input['addressline2'] = wp_filter_nohtml_kses( $input['addressline2'] );
	$input['phonenumber'] = wp_filter_nohtml_kses( $input['phonenumber'] );
	$input['logoaddress'] = wp_filter_nohtml_kses( $input['logoaddress'] );

	
	if ( ! array_key_exists( $input['templatestyle'], $style_options ) )
		$input['templatestyle'] = null;

	if ( ! array_key_exists( $input['typography'], $type_options ) )
		$input['typography'] = null;

	if ( ! isset( $input['numcols'] ) )
		$input['numcols'] = null;
	if ( ! array_key_exists( $input['numcols'], $cols_options ) )
		$input['numcols'] = null;

	$input['introtextarea'] = wp_filter_post_kses( $input['introtextarea'] );

	return $input;
}

// adapted from http://planetozh.com/blog/2009/05/handling-plugins-options-in-wordpress-28-with-register_setting/
