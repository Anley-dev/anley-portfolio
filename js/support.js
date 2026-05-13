/**
 * Manual Payment Logic for Anley's Portfolio
 * Handles order creation, unique decimal generation, and timers.
 */

function initiateOrder(baseAmount) {
    // Unique decimal logic (Step 6)
    const uniqueDecimal = (Math.random() * 0.99).toFixed(2);
    const finalAmount = (parseFloat(baseAmount) + parseFloat(uniqueDecimal)).toFixed(2);
    
    // Unique Order ID (Step 1)
    const orderId = "ANLEY-" + Math.random().toString(36).substr(2, 6).toUpperCase();

    // UI State Management
    document.getElementById('support-initial').style.display = 'none';
    document.getElementById('support-checkout').style.display = 'block';
    
    document.getElementById('order-id').innerText = "#" + orderId;
    document.getElementById('order-amount').innerText = finalAmount;

    startCountdown(15 * 60); // 15 Minute Timer
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
        }
    }, 1000);
}

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied: " + text);
    });
}

