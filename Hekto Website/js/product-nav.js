// product-nav.js
document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('click', (e) => {
        // Find if we clicked on a product card or image/title inside it
        // Note: exclude 'add to cart' buttons to prevent navigating away instead of adding to cart
        if (e.target.closest('.add-to-cart-btn, [aria-label*="cart" i], a:not([href*="product details.html"]):is(.btn-primary, .cart-button)')) {
            return; // let main.js handle the add to cart
        }

        const productContainer = e.target.closest('.product-card, .trending-card, .latest-product-card, .shop-card, .product-item');
        
        if (productContainer) {
            // Check if what we clicked is something that should navigate
            if (e.target.tagName.toLowerCase() === 'img' || e.target.classList.contains('product-title') || e.target.classList.contains('name') || e.target.tagName.toLowerCase() === 'h4' || e.target.tagName.toLowerCase() === 'h3' || e.target.tagName.toLowerCase() === 'h2') {
                
                e.preventDefault();
                
                // Extract info
                const nameEl = productContainer.querySelector('.product-title, .name, h1, h2, h3, h4');
                const priceEl = productContainer.querySelector('.product-price, .price, .offer-price, .sale-price');
                const imgEl = productContainer.querySelector('img');
                
                const name = nameEl ? nameEl.textContent.trim() : 'Premium Item';
                const price = priceEl ? priceEl.textContent.trim() : '$12.00';
                const image = imgEl ? imgEl.src : '';
                const categoryEl = productContainer.querySelector('.product-category, .category');
                const category = categoryEl ? categoryEl.textContent.trim() : '';

                // Generate simple hash/id
                const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                
                const selectedProduct = {
                    id, name, price, image, category
                };
                
                localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
                
                // Navigate
                window.location.href = "product details.html";
            }
        }
    });

});
