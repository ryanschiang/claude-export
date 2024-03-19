# claude-export

Format and download Anthropic Claude conversations to markdown, JSON, and PNG for sharing and exporting chat logs.

Exports the active Claude chat log directly from the browser console.

## Usage

 1. Navigate to [claude.ai](https://claude.ai).
 2. Open the chat thread you'd like to export.
 3. Follow the below steps depending on which output type you'd like.

### JSON

1. Open browser console
2. Copy and paste this function:

`fetch('https://raw.githubusercontent.com/ryanschiang/claude-export/main/dist/json.min.js').then(response => response.text()).then(text => eval(text))`

OR:

1. Copy contents of `/dist/json.min.js`
2. Paste into browser console

### Markdown

1. Open browser console
2. Copy and paste this function:

`fetch('https://raw.githubusercontent.com/ryanschiang/claude-export/main/dist/md.min.js').then(response => response.text()).then(text => eval(text))`

OR:

1. Copy contents of `/dist/md.min.js`
2. Paste into browser console

### Image (.PNG)

1. Open browser console
2. Copy and paste this function:

`fetch('https://raw.githubusercontent.com/ryanschiang/claude-export/main/dist/image.min.js').then(response => response.text()).then(text => eval(text))`

OR:

1. Copy contents of `/dist/image.min.js`
2. Paste into browser console

#### Example output:
![alt text](./public/claude-export-example.png "claude-export Example Output")

## Limitations

This is a trivial implementation as Claude currently does not support sharing or exporting conversations. It may break with future changes.

It currently supports:
- Paragraphs / Text
- Lists
- Code blocks
- Tables

## Future Work

[ ] Nested code blocks (within lists)
[ ] Trim whitespace on exported images
[ ] Fix syntax highlighting