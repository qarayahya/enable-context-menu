# Enable Context Menu

Adds a right-click context menu to every block in the WordPress block editor. Right-clicking any block on the canvas opens a custom popover with the most common block actions at your cursor — no toolbar hunting required.

## Actions

| Action | Description |
|--------|-------------|
| **Copy** | Serializes the block and writes it to the clipboard |
| **Paste** | Reads the clipboard and inserts blocks directly after the current block |
| **Duplicate** | Clones the block in place |
| **Copy Styles** | Copies the block's style attributes to the clipboard |
| **Paste Styles** | Applies style attributes from the clipboard to the current block |
| **Rename** | Opens a modal to set a custom label via `metadata.name` |
| **Delete** | Removes the block (hidden when the block is locked) |

## How it works

- Uses `addFilter( 'editor.BlockListBlock' )` with `createHigherOrderComponent` to attach an `onContextMenu` handler to every block's wrapper element inside the editor iframe.
- On right-click, `stopPropagation()` ensures the innermost block is always targeted (not its parent).
- Since WordPress 6.7+ renders the editing canvas inside an iframe, cursor coordinates are translated to the outer document before positioning the popover.
- Paste inserts at `blockIndex + 1` scoped to `rootClientId` so it works correctly inside nested blocks (Group, Columns, etc.).

## Development

```bash
npm install
npm build
```
