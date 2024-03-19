module.exports = function () {
    // Get parent chat container
    const chatContainer = document.querySelector("[class*='hhDfMG']");

    // Fallback classes
    if (!chatContainer)
        chatContainer = document.querySelector(
            "[class*='sc-fHIGvW']"
        );
    if (!chatContainer)
        chatContainer = document.querySelector(
            "[class*='flex-1 flex flex-col gap-3 px-4 pt-16']"
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
