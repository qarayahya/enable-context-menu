# Enable Context Menu

This plugin restores right-click context menu functionality in the WordPress block editor. Right-clicking any block in the editor canvas opens the native block settings dropdown — the same "Options" menu available in the List View — positioned at the cursor.

## How it works

- Uses `addFilter` on `editor.BlockListBlock` to attach an `onContextMenu` handler to every block's wrapper element inside the editor iframe.
- On right-click, the clicked block is selected and the native `BlockSettingsMenu` opens at the cursor position.
- Since WordPress 6.7+ renders the editing canvas inside an iframe, cursor coordinates are translated to the outer document before positioning the popover.

## Development

```bash
npm install
npm build
```
