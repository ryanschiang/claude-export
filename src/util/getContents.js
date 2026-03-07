module.exports = function () {
    // Get chat title (if exists)
    const titleEle = document.querySelector(
        "button[data-testid='chat-menu-trigger']"
    );
    const titleText = titleEle ? titleEle.textContent : "";

    // Collect user and assistant messages with DOM order
    const userMessages = document.querySelectorAll('[data-testid="user-message"]');
    const assistantMessages = document.querySelectorAll('div.standard-markdown');

    const allMessages = [];
    userMessages.forEach(el => {
        allMessages.push({ role: 'user', el });
    });
    assistantMessages.forEach(el => {
        allMessages.push({ role: 'assistant', el });
    });

    // Sort by document order
    allMessages.sort((a, b) => {
        const pos = a.el.compareDocumentPosition(b.el);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
    });

    return {
        messages: allMessages,
        title: titleText,
    };
};
