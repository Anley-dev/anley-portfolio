// 1. Load Certificates automatically on page load
async function loadCerts() {
    try {
        const response = await fetch('../data/info.json');
        const data = await response.json();
        const list = document.getElementById('cert-list');
        
        // Only run if the element exists in your HTML
        if (list) {
            list.innerHTML = ""; // Clear current list
            data.stats.top_certs.forEach(cert => {
                const div = document.createElement('div');
                div.className = 'cert-card';
                div.innerText = cert;
                list.appendChild(div);
            });
        }
    } catch (error) {
        console.error("Error loading certificates:", error);
    }
}
loadCerts();

// 2. Chat Logic
const chatInput = document.getElementById('chat-input');
const chatDisplay = document.getElementById('chat-display');

chatInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const msg = chatInput.value.trim();
        if (!msg) return;

        chatInput.value = '';

        // 1. Append user message to display
        chatDisplay.innerHTML += `<div style="margin-bottom: 8px; color: #aaa;">User: ${msg}</div>`;

        try {
            // 2. Talk to your Backend
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            });
            
            const data = await res.json();
            let botReply = data.reply;

            // 3. Handle Scrolling Agent logic
            if (botReply.includes('[SCROLL:certs]')) {
                const section = document.getElementById('certificates-section');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
                // Clean the command from the reply text
                botReply = botReply.replace('[SCROLL:certs]', '');
            }

            // 4. Show Bot Response
            chatDisplay.innerHTML += `<div style="margin-bottom: 12px; color: #00d2ff;">Anley-AI: ${botReply}</div>`;
            chatDisplay.scrollTop = chatDisplay.scrollHeight;

        } catch (error) {
            chatDisplay.innerHTML += `<div style="color: #ff4444;">Error connecting to AI. Check console.</div>`;
            console.error("Chat error:", error);
        }
    }
});

