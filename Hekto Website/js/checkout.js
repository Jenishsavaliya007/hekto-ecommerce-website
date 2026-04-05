// checkout.js
document.addEventListener('DOMContentLoaded', () => {

    const updateTotals = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;

        cart.forEach(item => {
            subtotal += (item.price * item.quantity);
        });

        const rows = document.querySelectorAll('.totals-row');
        rows.forEach(row => {
            const label = row.textContent.toLowerCase();
            if (label.includes('subtotal') || label.includes('totals')) {
                const valueEl = row.lastElementChild;
                if (valueEl) valueEl.textContent = `$${subtotal.toFixed(2)}`;
            }
        });
        
        // Let's also create an invisible element storing if cart is empty
        if(subtotal === 0) {
            alert("Your cart is empty! Returning to shop.");
            window.location.href = "shop list.html";
        }
    };

    updateTotals();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Clear cart
            localStorage.removeItem('cart');
            // Redirect to order completion
            window.location.href = "Order completed.html";
        });
    }
});
