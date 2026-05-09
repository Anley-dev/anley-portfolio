document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatDisplay = document.getElementById('chat-display');

    if (!chatInput || !chatDisplay) return;

    chatInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const query = chatInput.value.trim();
            if (!query) return;

            // 1. Show your message in the terminal
            chatInput.value = '';
            chatDisplay.innerHTML += `<div style="margin-bottom: 10px; color: #fff;">> ${query}</div>`;
            chatDisplay.scrollTop = chatDisplay.scrollHeight;

            try {
                // 2. Send the message to your Vercel API
                const response = await fetch('/api/v2', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: query })
                });

                const data = await response.json();
                // 3. Handle the AI reply
                let reply = data.reply || "System offline. Check API logs.";

                // Special command: if AI says to scroll, do it!
                if (reply.includes('[SCROLL:certs]')) {
                    const section = document.getElementById('certificates-section');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                    reply = reply.replace('[SCROLL:certs]', '');
                }

                chatDisplay.innerHTML += `<div style="margin-bottom: 15px; color: #00d2ff;">Anley-AI: ${reply}</div>`;
                chatDisplay.scrollTop = chatDisplay.scrollHeight;

            } catch (err) {
                chatDisplay.innerHTML += `<div style="color: #ff4444;">Connection Error. Is the API running?</div>`;
            }
        }
    });
});
// Function to show/hide the chat
function toggleChat() {
    const chatWindow = document.getElementById('chat-container');
    const launcher = document.getElementById('chat-launcher');
    
    if (chatWindow.classList.contains('chat-hidden')) {
        chatWindow.classList.remove('chat-hidden');
        // Optional: change button text when open
        launcher.innerHTML = '<span class="icon">❌</span> <span class="text">Close</span>';
    } else {
        chatWindow.classList.add('chat-hidden');
        launcher.innerHTML = '<span class="icon">🤖</span> <span class="text">Chat with AI</span>';
    }
}

