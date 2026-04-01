# Enable Context Menu

Adds a right-click context menu to every block in the WordPress block editor. Right-clicking any block on the canvas opens a custom popover with the most common block actions at your cursor — no toolbar hunting required.

## Try it

[**Preview in WordPress Playground →**](https://playground.wordpress.net/?plugin=https://github.com/qarayahya/enable-context-menu/archive/refs/heads/main.zip)

## Actions

| Action | Shortcut | Description |
|--------|----------|-------------|
| **Copy** | Ctrl+C / ⌘C | Serializes the block and writes it to the clipboard |
| **Paste** | Ctrl+V / ⌘V | Reads the clipboard and inserts blocks directly after the current block |
| **Duplicate** | Ctrl+Shift+D / ⌘⇧D | Clones the block in place |
| **Copy Styles** | | Copies the block's style attributes to the clipboard |
| **Paste Styles** | Ctrl+Alt+V / ⌘⌥V | Applies style attributes from the clipboard to the current block |
| **Reset Styles** | | Clears all colors, typography, spacing, and border values |
| **Rename** | | Opens a modal to set a custom label via `metadata.name` |
| **Delete** | Ctrl+Backspace / ⌘⌫ | Removes the block (hidden when the block is locked) |

## Development

```bash
npm install
npm build
```
