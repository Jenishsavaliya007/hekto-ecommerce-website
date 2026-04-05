document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const mainNav = document.querySelector('nav.navigation, nav.desktop-nav, nav.mobile-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });
    }

    // 2. Tabs Functionality (for Home Page or other tabs)
    const tabs = document.querySelectorAll('.tabs .tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabGroup = tab.closest('.tabs');
                tabGroup.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Hide panels if aria-controls is set
                const container = tab.closest('section') || document.body;
                const panelId = tab.getAttribute('aria-controls');
                if(panelId) {
                    const targetPanel = document.getElementById(panelId);
                    if(targetPanel) {
                        const tabPanels = targetPanel.parentElement.querySelectorAll('[role="tabpanel"]');
                        tabPanels.forEach(p => {
                            p.setAttribute('hidden', true);
                            p.classList.remove('active');
                        });
                        targetPanel.removeAttribute('hidden');
                        targetPanel.classList.add('active');
                    }
                }
            });
        });
    }

    // 3. Add to Cart functionality
    const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
    const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart badge
    const updateCartBadge = () => {
        const cart = getCart();
        const count = cart.reduce((acc, item) => acc + (parseInt(item.quantity) || 1), 0);
        const cartIcons = document.querySelectorAll('a[href*="shopping cart.html"], a[aria-label="Shopping Cart"]');
        cartIcons.forEach(icon => {
            let badge = icon.querySelector('.cart-badge');
            if(!badge) {
                badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.style.cssText = 'background: #ff0080; color: white; border-radius: 50%; padding: 2px 6px; font-size: 10px; margin-left: 4px; vertical-align: super;';
                icon.appendChild(badge);
            }
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    // Initialize badge
    updateCartBadge();
    
    // Listen to custom event for cross-script updates
    document.addEventListener('cartUpdated', updateCartBadge);

    // Setup Add to Cart buttons heuristically
    document.addEventListener('click', (e) => {
        const addToCartBtn = e.target.closest('.add-to-cart-btn, [aria-label*="cart" i], a:not([href*="cart.html"]):is(.btn-primary, .cart-button), .category-item:last-child');
        
        let proceed = false;
        if(addToCartBtn) {
            const label = addToCartBtn.getAttribute('aria-label') || '';
            let content = addToCartBtn.textContent.trim().toLowerCase();
            // sometimes title is used
            const titleAttr = addToCartBtn.getAttribute('title') || '';
            if (content.includes('add to cart') || label.toLowerCase().includes('add to cart') || titleAttr.toLowerCase().includes('cart')) {
                proceed = true;
            }
            // Add icon buttons check
            if(!proceed && addToCartBtn.querySelector('.material-icons') && addToCartBtn.querySelector('.material-icons').textContent.includes('shopping_cart')) {
                proceed = true;
            }
        }
        
        if(proceed) {
            e.preventDefault();
            
            // Try to extract product info
            let productContainer = addToCartBtn.closest('.product-card, .trending-card, .latest-product-card, .product-details-area, .product-item, .shop-card');
            
            // If button is standalone, we might not find a container, skip
            if(!productContainer) {
                alert("Cart functionality is active, but product details couldn't be extracted from this component.");
                return;
            }
            
            const nameEl = productContainer.querySelector('.product-title, .name, h1, h2, h3, h4');
            const priceEl = productContainer.querySelector('.product-price, .price, .offer-price, .sale-price');
            const imgEl = productContainer.querySelector('img');
            
            const name = nameEl ? nameEl.textContent.trim() : 'Premium Item';
            let priceText = priceEl ? priceEl.textContent.trim() : '$12.00';
            const priceMatches = priceText.match(/[\d.]+/);
            const price = priceMatches ? parseFloat(priceMatches[0]) : 12.00;
            const image = imgEl ? imgEl.src : 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3219c972-7419-49d6-a299-55720063ec26.png'; // fallback image
            
            const qtyInput = productContainer.querySelector('input[type="number"], .qty-input');
            const quantity = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
            
            const cart = getCart();
            const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
            
            const existingItem = cart.find(item => item.id === id);
            if(existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ id, name, price, image, quantity, color: 'Default', size: 'Default' });
            }
            
            saveCart(cart);
            updateCartBadge();
            
            alert(`Added ${quantity}x "${name}" to your cart!`);
        }
    });

    // 4. Form Prevention
    // 5. Wishlist functionality
    document.addEventListener('click', (e) => {
        const wishlistBtn = e.target.closest('.btn-heart, [aria-label*="wishlist" i], [title*="wishlist" i]');
        if(wishlistBtn || (e.target.textContent && e.target.textContent.includes('favorite_border'))) {
            e.preventDefault();
            let productContainer = (wishlistBtn && wishlistBtn.closest) ? wishlistBtn.closest('.product-card, .trending-card, .latest-product-card, .product-details-area, .product-item, .shop-card, main') : null;
            if(!productContainer) {
                // If it's the top navbar icon, redirect to wishlist page
                window.location.href = "wishlist.html";
                return;
            }

            const nameEl = productContainer.querySelector('.product-title, .name, h1, h2, h3, h4');
            const priceEl = productContainer.querySelector('.product-price, .price, .offer-price, .sale-price');
            const imgEl = productContainer.querySelector('img');
            
            const name = nameEl ? nameEl.textContent.trim() : 'Premium Item';
            const priceText = priceEl ? priceEl.textContent.trim() : '$12.00';
            const priceMatches = priceText.match(/[\d.]+/);
            const price = priceMatches ? parseFloat(priceMatches[0]) : 12.00;
            const image = imgEl ? imgEl.src : '';
            
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
            
            if(!wishlist.find(item => item.id === id)) {
                wishlist.push({ id, name, price, image, color: 'Default', size: 'Default' });
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                alert(`Added "${name}" to your Wishlist!`);
            } else {
                alert(`"${name}" is already in your Wishlist!`);
            }
        }
    });

});
