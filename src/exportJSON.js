const consoleSave = require('./util/consoleSave');
const getTimestamp = require('./util/getTimestamp');
const getContents = require('./util/getContents');

(function exportJSON() {
  const chats = [];
  const json = {
    meta: {
      exported_at: getTimestamp(),
    },
  };

  const { title, messages } = getContents();

  if (title) {
    json.meta.title = title;
  }

  function parseChildren(container) {
    const message = [];
    const children = container.children;

    for (let n = 0; n < children.length; n++) {
      const childNode = children[n];
      const tag = childNode.tagName;
      if (!tag) continue;

      if (tag === "P") {
        message.push({ type: "p", data: childNode.textContent });
      } else if (tag === "OL" || tag === "UL") {
        const listItems = [];
        childNode.querySelectorAll(":scope > li").forEach(function (li) {
          listItems.push({ type: "li", data: li.textContent });
        });
        message.push({ type: tag.toLowerCase(), data: listItems });
      } else if (tag === "PRE") {
        const codeEle = childNode.querySelector("code");
        if (codeEle) {
          const langClass = Array.from(codeEle.classList).find(function (c) {
            return c.startsWith("language-");
          });
          const lang = langClass ? langClass.replace("language-", "") : "";
          message.push({ type: "pre", language: lang, data: codeEle.textContent });
        }
      } else if (tag === "TABLE") {
        const tableSections = [];
        childNode.childNodes.forEach(function (tableSectionNode) {
          if (
            tableSectionNode.nodeType === Node.ELEMENT_NODE &&
            (tableSectionNode.tagName === "THEAD" || tableSectionNode.tagName === "TBODY")
          ) {
            const tableRows = [];
            tableSectionNode.querySelectorAll(":scope > tr").forEach(function (tr) {
              const tableCells = [];
              tr.querySelectorAll(":scope > td, :scope > th").forEach(function (cell) {
                tableCells.push({ type: cell.tagName.toLowerCase(), data: cell.textContent });
              });
              tableRows.push({ type: "tr", data: tableCells });
            });
            tableSections.push({ type: tableSectionNode.tagName.toLowerCase(), data: tableRows });
          }
        });
        message.push({ type: "table", data: tableSections });
      }
    }
    return message;
  }

  messages.forEach(function (msg, i) {
    const object = { index: i };

    if (msg.role === "user") {
      object.type = "prompt";
      const paragraphs = msg.el.querySelectorAll(":scope > p");
      if (paragraphs.length > 0) {
        object.message = [];
        paragraphs.forEach(function (p) {
          object.message.push({ type: "p", data: p.textContent });
        });
      } else {
        object.message = [msg.el.textContent.trim()];
      }
    } else {
      object.type = "response";
      object.message = parseChildren(msg.el);
    }

    chats.push(object);
  });

  json.chats = chats;

  consoleSave(console, "json", title);
  console.save(json);
  return json;
})();
