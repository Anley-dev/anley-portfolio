// 1. Load Certificates automatically on page load
async function loadCerts() {
    const response = await fetch('../data/info.json');
    const data = await response.json();
    const list = document.getElementById('cert-list');
    
    data.stats.top_certs.forEach(cert => {
        const div = document.createElement('div');
        div.className = 'cert-card';
        div.innerText = cert;
        list.appendChild(div);
    });
}
loadCerts();

// 2. Chat Logic
const input = document.getElementById('chat-input');
input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const msg = input.value;
        input.value = '';
        
        // Append user message to display
        document.getElementById('chat-display').innerHTML += `<div><b>You:</b> ${msg}</div>`;

        // Talk to your Backend
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message: msg })
        });
        const data = await res.json();
        
        // Handle Scrolling Agent logic
        if (data.reply.includes('[SCROLL:certs]')) {
            document.getElementById('certificates-section').scrollIntoView({behavior: 'smooth'});
        }

        document.getElementById('chat-display').innerHTML += `<div><b>Bot:</b> ${data.reply.replace(/\[SCROLL:.*\]/, '')}</div>`;
    }
});

