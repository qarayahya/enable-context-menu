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

## Development

```bash
npm install
npm build
```
