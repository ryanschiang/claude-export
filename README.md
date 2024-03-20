# Export/Download Claude Conversations (claude-export)

[![GitHub license](https://img.shields.io/badge/license-MIT-green)](
    ./LICENSE
)

![Working as of March 20, 2024](https://img.shields.io/badge/working%20as%20of-%20march%2020,%202024-blue)

This browser script formats and downloads Anthropic Claude conversations to markdown, JSON, and PNG for sharing and exporting chat logs.

You can export the active Claude chat log directly from the browser console, entirely locally. No data is sent to any server.

**Supports the latest Claude web UI as of March 20, 2024.**

## Usage

 1. Navigate to [claude.ai](https://claude.ai).
 2. Open the chat thread you'd like to export.
 3. Open the browser console (how to open console: [Chrome](https://developer.chrome.com/docs/devtools/open), [Firefox](https://firefox-source-docs.mozilla.org/devtools-user/), [Safari](https://developer.apple.com/library/archive/documentation/NetworkingInternetWeb/Conceptual/Web_Inspector_Tutorial/EnableWebInspector/EnableWebInspector.html))
 4. Follow the below steps depending on which output type you'd like.

> [!IMPORTANT]  
> Always be careful when pasting code into the console. Only paste code from trusted sources, as it can be used to execute malicious code.
> You can explore this repository and verify the code before pasting it into the console, or clone and build the code yourself.

### JSON

1. Copy contents of [`/dist/json.min.js`](./dist/json.min.js)
2. Paste into browser console

#### Example output (JSON):

```json
{
    "meta": {
        "exported_at": "2024-03-19 16:03:09",
        "title": "Sending Javascript Requests"
    },
    "chats": [
        {
            "index": 0,
            "type": "prompt",
            "message": [
                {
                    "type": "p",
                    "data": "How can I send a request in Javascript?"
                }
            ]
        },
        {
            "index": 1,
            "type": "response",
            "message": [
                {
                    "type": "p",
                    "data": "In JavaScript, you can send a request using the built-in fetch function or the XMLHttpRequest object. Here's an example using fetch:"
                },
                {
                    "type": "pre",
                    "language": "javascript",
                    "data": "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => {\n    // Handle the response data\n    console.log(data);\n  })\n  .catch(error => {\n    // Handle any errors\n    console.error('Error:', error);\n  });"
                },
                {
                    "type": "p",
                    "data": "In this example, fetch sends a GET request to the specified URL (https://api.example.com/data). The then block is used to handle the response. The first then converts the response to JSON format using response.json(), and the second then receives the parsed JSON data, which you can then process as needed."
                },
            ]
        },
    ]
}
```

### Markdown

1. Copy contents of [`/dist/md.min.js`](./dist/md.min.js)
2. Paste into browser console

#### Example output (Markdown):

````markdown
# Sending Javascript Requests
`2024-03-19 16:04:20`

_Prompt_:
How can I send a request in Javascript?

_Claude_:
In JavaScript, you can send a request using the built-in fetch function or the XMLHttpRequest object. Here's an example using fetch:

```javascript
fetch('https://api.example.com/data')
.then(response => response.json())
.then(data => {
    // Handle the response data
    console.log(data);
})
.catch(error => {
    // Handle any errors
    console.error('Error:', error);
});
```

In this example, fetch sends a GET request to the specified URL (https://api.example.com/data). The then block is used to handle the response. The first then converts the response to JSON format using response.json(), and the second then receives the parsed JSON data, which you can then process as needed.
````

### Image (.PNG)

1. Copy contents of [`/dist/image.min.js`](./dist/image.min.js)
2. Paste into browser console

> [!NOTE]  
> Downloading as an image uses the `html2canvas` library to take a screenshot of the chat log. This may take a few seconds to process.

#### Example output (Image Export):
![alt text](./public/claude-export-example.png "claude-export Example Output")

## Limitations

This is a trivial implementation as Claude currently does not support sharing or exporting conversations. It may break with future changes.

It currently supports:
- Paragraphs / Text
- Lists
- Code blocks
- Tables

## Acknowledgements

- [html2canvas](https://github.com/niklasvh/html2canvas) - Used to take a screenshot of the chat log and export as a PNG.

## You May Also Like

[`chatgpt-export`](https://github.com/ryanschiang/chatgpt-export) - Export OpenAI ChatGPT conversations to markdown, JSON, and PNG for sharing and exporting chat logs.

## Future Development

- [ ] Nested code blocks (within lists)
- [ ] Fix syntax highlighting
- [x] Trim whitespace on exported images