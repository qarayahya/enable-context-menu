<?php
/**
 * Plugin Name:         Enable Context Menu
 * Plugin URI:          https://blocklayouts.com/plugins/enable-context-menu/
 * Description:         Enables the block settings context menu on right-click in the WordPress block editor.
 * Version:             1.0.0
 * Requires at least:   6.3
 * Requires PHP:        7.4
 * Author:              blocklayouts
 * Author URI:          https://blocklayouts.com/
 * License:             GPL-2.0-or-later
 * License URI:         https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:         enable-context-menu
 *
 * @package enable-context-menu
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue block editor assets.
 */
function enable_context_menu_enqueue_editor_assets() {

	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_enqueue_script(
		'enable-context-menu-editor-scripts',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	wp_enqueue_style(
		'enable-context-menu-editor-styles',
		plugins_url( '/build/index.css', __FILE__ ),
		array(),
		$asset_file['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'enable_context_menu_enqueue_editor_assets' );
