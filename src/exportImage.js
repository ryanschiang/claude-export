const getTimestamp = require("./util/getTimestamp");
const getContents = require("./util/getContents");
const html2canvas = require("html2canvas");

(function exportImage() {
    const captureElement = document.querySelector(
        "div.flex-1.flex.flex-col.gap-3.px-4.pt-16"
    );
    const prompts = document.querySelectorAll(
        "div.font-user-message"
    );
    prompts.forEach((prompt) => {
        prompt.style.position = "relative";
    });

    const style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet?.insertRule(
        "body > div:last-child img { display: inline-block; }"
    );

    const { title } = getContents();
    let filename = title
        ? title
              .trim()
              .toLowerCase()
              .replace(/^[^\w\d]+|[^\w\d]+$/g, "")
              .replace(/[\s\W-]+/g, "-")
        : "claude";

    const headerEle = document.createElement("div");
    headerEle.style.position = "absolute";
    headerEle.style.left = "0";
    headerEle.style.right = "0";
    headerEle.style.top = "8px";
    headerEle.style.textAlign = "center";

    const titleEle = document.createElement("h1");
    titleEle.textContent = title;
    titleEle.style.fontSize = "18px";

    const timestampEle = document.createElement("p");
    timestampEle.textContent = getTimestamp();
    timestampEle.style.fontSize = "12px";
    timestampEle.style.opacity = "0.7";

    headerEle.appendChild(titleEle);
    headerEle.appendChild(timestampEle);
    captureElement.prepend(headerEle);

    html2canvas(captureElement, {
        logging: true,
        letterRendering: 1,
        foreignObjectRendering: false,
    })
        .then((canvas) => {
            canvas.style.display = "none";
            document.body.appendChild(canvas);
            return canvas;
        })
        .then((canvas) => {
            const image = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.setAttribute("download", `${filename}.png`);
            a.setAttribute("href", image);
            a.click();
            canvas.remove();
        })
        .then(() => {
            style.remove();
            headerEle.remove();
        });
})();
