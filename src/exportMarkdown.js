const consoleSave = require("./util/consoleSave");
const getTimestamp = require("./util/getTimestamp");
const getContents = require("./util/getContents");

(function exportMarkdown() {
  let markdown = "";

  const { messages, title } = getContents();

  const timestamp = getTimestamp();
  markdown += `# ${title || "Claude Chat"}\n\`${timestamp}\`\n\n`;

  function parseElement(node) {
    let out = "";
    const tag = node.tagName;
    if (!tag) return out;

    if (tag === "P") {
      out += node.textContent + "\n";
    } else if (tag === "OL") {
      let idx = 1;
      node.querySelectorAll(":scope > li").forEach(function (li) {
        out += idx++ + ". " + li.textContent.trim() + "\n";
      });
    } else if (tag === "UL") {
      node.querySelectorAll(":scope > li").forEach(function (li) {
        out += "- " + li.textContent.trim() + "\n";
      });
    } else if (tag === "PRE") {
      const codeEle = node.querySelector("code");
      if (codeEle) {
        const langClass = Array.from(codeEle.classList).find(function (c) {
          return c.startsWith("language-");
        });
        const lang = langClass ? langClass.replace("language-", "") : "";
        out += "```" + lang + "\n" + codeEle.textContent + "\n```\n";
      } else {
        out += "```\n" + node.textContent + "\n```\n";
      }
    } else if (tag === "TABLE") {
      const thead = node.querySelector("thead");
      const tbody = node.querySelector("tbody");
      if (thead) {
        const ths = thead.querySelectorAll("th");
        out +=
          "| " +
          Array.from(ths)
            .map(function (th) { return th.textContent; })
            .join(" | ") +
          " |\n";
        out +=
          "| " +
          Array.from(ths)
            .map(function () { return "---"; })
            .join(" | ") +
          " |\n";
      }
      if (tbody) {
        tbody.querySelectorAll("tr").forEach(function (tr) {
          const tds = tr.querySelectorAll("td");
          out +=
            "| " +
            Array.from(tds)
              .map(function (td) { return td.textContent; })
              .join(" | ") +
            " |\n";
        });
      }
    } else if (
      tag === "H1" ||
      tag === "H2" ||
      tag === "H3" ||
      tag === "H4"
    ) {
      const level = parseInt(tag[1]) + 1;
      out += "#".repeat(level) + " " + node.textContent + "\n";
    } else if (tag === "BLOCKQUOTE") {
      out += "> " + node.textContent.trim() + "\n";
    }

    return out;
  }

  messages.forEach(function (msg) {
    if (msg.role === "user") {
      markdown += "_Prompt_:\n";
      const paragraphs = msg.el.querySelectorAll(":scope > p");
      if (paragraphs.length > 0) {
        paragraphs.forEach(function (p) {
          markdown += p.textContent + "\n";
        });
      } else {
        markdown += msg.el.textContent.trim() + "\n";
      }
    } else {
      markdown += "_Claude_:\n";
      const children = msg.el.children;
      for (let i = 0; i < children.length; i++) {
        markdown += parseElement(children[i]);
      }
    }
    markdown += "\n";
  });

  // Save to file
  consoleSave(console, "md", title);
  console.save(markdown);
  return markdown;
})();
