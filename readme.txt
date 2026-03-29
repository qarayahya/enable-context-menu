=== Enable Context Menu ===
Contributors:       blocklayouts, qarayahya
Tags:               block editor, context menu, right-click, gutenberg
Requires at least:  6.3
Tested up to:       6.8
Stable tag:         1.0.0
Requires PHP:       7.4
License:            GPL-2.0-or-later
License URI:        https://www.gnu.org/licenses/gpl-2.0.html

Adds a right-click context menu to every block in the WordPress block editor with actions like copy, paste, duplicate, delete, copy/paste styles, and rename.

== Description ==

Enable Context Menu adds a custom right-click context menu to every block in the WordPress block editor. Instead of hunting through the toolbar or the List View, you can right-click any block directly on the canvas to access the most common block actions — all positioned at your cursor.

**Available actions:**

* Copy — serialize the block to the clipboard
* Paste — insert clipboard blocks directly after the current block
* Duplicate — clone the block in place
* Copy Styles — copy the block's style attributes to the clipboard
* Paste Styles — apply style attributes from the clipboard to the current block
* Rename — give the block a custom label via its metadata
* Delete — remove the block (hidden if the block is locked)

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/enable-context-menu` directory, or install the plugin through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Open any post, page, or template in the block editor and right-click any block.

== Frequently Asked Questions ==

= Where does the menu appear? =

The context menu appears at the cursor position when you right-click any block in the editor canvas.

= Does it work with the Site Editor? =

Yes, the context menu works in both the post editor and the Site Editor.

= Does it work with custom post types? =

Yes, it works in the block editor for all post types.

= Does it work inside nested blocks like Group or Columns? =

Yes. Right-clicking an inner block opens the menu for that specific block. Paste also inserts after the correct block within its parent container.

= Can I rename any block? =

Rename is shown only for blocks that support the `renaming` block support flag, which most core blocks do by default.

== Changelog ==

= 1.0.0 =

* Initial release with copy, paste, duplicate, delete, copy/paste styles, and rename actions
