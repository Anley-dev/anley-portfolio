function initiateOrder(baseAmount) {
    console.log("Initiating order for:", baseAmount);
    
    // Step 6: Generate unique decimal for manual matching
    const uniqueDecimal = (Math.random() * 0.99).toFixed(2);
    const finalAmount = (parseFloat(baseAmount) + parseFloat(uniqueDecimal)).toFixed(2);
    
    // Step 1: Create a unique Order ID
    const orderId = "ANLEY-" + Math.random().toString(36).substr(2, 6).toUpperCase();

    // UI Updates - Ensure these IDs match your HTML exactly
    const initialView = document.getElementById('support-initial');
    const checkoutView = document.getElementById('support-checkout');
    
    if (initialView && checkoutView) {
        initialView.style.display = 'none';
        checkoutView.style.display = 'block';
        
        document.getElementById('order-id').innerText = orderId;
        document.getElementById('order-amount').innerText = finalAmount;

        startTimer(15 * 60); // Step 10: 15-minute countdown
    } else {
        console.error("Support view elements not found!");
    }
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const display = document.getElementById('timer');
    
    const countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdown);
            display.textContent = "EXPIRED";
            display.style.color = "#ff4b4b";
        }
    }, 1000);
}

