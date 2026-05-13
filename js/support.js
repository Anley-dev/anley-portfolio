/**
 * Manual Payment Logic for Anley's Portfolio
 * Handles order creation, unique decimal generation, and timers.
 */

function initiateOrder(baseAmount) {
    // 1. Unique decimal logic for manual matching
    const uniqueDecimal = (Math.random() * 0.99).toFixed(2);
    const finalAmount = (parseFloat(baseAmount) + parseFloat(uniqueDecimal)).toFixed(2);
    
    // 2. Unique Order ID generation
    const orderId = "ANLEY-" + Math.random().toString(36).substr(2, 6).toUpperCase();

    // 3. UI State Management: Switch from buttons to checkout details
    document.getElementById('support-initial').style.display = 'none';
    document.getElementById('support-checkout').style.display = 'block';
    
    document.getElementById('order-id').innerText = "#" + orderId;
    document.getElementById('order-amount').innerText = finalAmount;

    startCountdown(15 * 60); // Start 15-minute validity timer
}

function startCountdown(duration) {
    let timer = duration, minutes, seconds;
    const display = document.getElementById('timer');
    
    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        display.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "EXPIRED - PLEASE REFRESH";
            display.style.color = "#ff4b4b";
        }
    }, 1000);
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard: " + text);
    });
}

/** 
 * NEW: Custom Support Amount Logic 
 */

function showCustomInput() {
    // Reveals the hidden input field when "Custom" is clicked
    document.getElementById('custom-amount-wrapper').style.display = 'block';
}

function initiateCustomOrder() {
    // Gets the value from the input field
    const amount = document.getElementById('custom-val').value;
    
    // Validate that it's a real number greater than 0
    if (amount && amount > 0) {
        initiateOrder(amount);
    } else {
        alert("Please enter a valid amount to support.");
    }
}

