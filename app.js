import { chatWithAI } from "./Gemini.js";

document.getElementById('aiForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const userInput = document.getElementById('prompt').value;
    if (!userInput.trim()) return;  // Ignore empty inputs

    // Display user's message
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML += `<div class="user-message"><strong>You:</strong> ${userInput}</div>`;

    // Clear input field
    document.getElementById('prompt').value = "";

    try {
        const aiResponse = await chatWithAI(userInput);

        // Parse AI's response to HTML with Markdown rendering using Showdown
        const converter = new showdown.Converter();
        const html = converter.makeHtml(aiResponse);

        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'ai-message';
        aiMessageDiv.innerHTML = `<strong>AI:</strong> ${html}`;
        chatBox.appendChild(aiMessageDiv);

        // Scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error("Error handling chat:", error);
        chatBox.innerHTML += `<div class="ai-message"><strong>Error:</strong> An error occurred while processing your message. Please try again.</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
