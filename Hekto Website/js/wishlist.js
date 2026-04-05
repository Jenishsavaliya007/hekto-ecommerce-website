// wishlist.js
document.addEventListener('DOMContentLoaded', () => {
    const wishlistTbody = document.querySelector('.cart-products tbody');
    if (!wishlistTbody) return;

    // Overwrite some UI elements so it looks right
    const ths = document.querySelectorAll('.cart-products thead th');
    if (ths.length > 3) ths[3].style.display = 'none'; // hide Total Header
    if (ths.length > 2) ths[2].style.display = 'none'; // hide Quantity Header

    const renderWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistTbody.innerHTML = '';
        
        if (wishlist.length === 0) {
            wishlistTbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 48px; color: #a0aec0;">Your wishlist is completely empty.</td></tr>';
            return;
        }

        wishlist.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>
                <div class="product-details">
                  <div class="product-image" style="position: relative;">
                    <img src="${item.image}" alt="${item.name}" width="72" height="72" style="border-radius: 8px; object-fit: cover;" />
                    <button class="remove-wishlist-btn" data-index="${index}" aria-label="Remove ${item.name} from wishlist" title="Remove product" style="position: absolute; top: -5px; right: -5px; background: #000; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none;">&times;</button>
                  </div>
                  <div class="product-info">
                    <div class="name" style="font-weight: 600; font-size: 14px;">${item.name}</div>
                    <div class="color" style="font-size: 11px; color: #a0aec0;">Color: ${item.color}</div>
                    <div class="size" style="font-size: 11px; color: #a0aec0;">Size: ${item.size}</div>
                  </div>
                </div>
              </td>
              <td class="cart-price" style="text-align: center;">$${item.price.toFixed(2)}</td>
              <td style="display:none;"></td>
              <td style="display:none;"></td>
            `;
            wishlistTbody.appendChild(tr);
        });

        attachEvents();
    };

    const attachEvents = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        document.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                wishlist.splice(index, 1);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                renderWishlist();
            });
        });
    };

    renderWishlist();

    const wishlistActions = document.querySelector('.cart-actions');
    if (wishlistActions) {
        // Change Update Cart to something else or hide it
        const updateBtn = wishlistActions.querySelector('.update-cart-btn');
        if(updateBtn) updateBtn.style.display = 'none';

        wishlistActions.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON' && e.target.textContent.toLowerCase().includes('clear')) {
                localStorage.removeItem('wishlist');
                renderWishlist();
            }
        });
    }
});
