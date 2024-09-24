module.exports = function () {
    // Get parent chat container
    const chatContainer = document.querySelector(
        "div.flex-1.flex.flex-col.gap-3.px-4"
    );

    // Get chat title (if exists)
    const titleEle = document.querySelector(
        "button[data-testid='chat-menu-trigger']"
    );
    const titleText = titleEle ? titleEle.textContent : "";

    // Find all chat elements
    const elements = chatContainer.querySelectorAll(
        "div.font-claude-message, div.font-user-message"
    );

    return {
        elements,
        title: titleText,
    };
};
