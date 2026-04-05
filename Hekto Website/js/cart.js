document.addEventListener('DOMContentLoaded', () => {
    const cartTbody = document.querySelector('.cart-products tbody');
    if (!cartTbody) return;

    const renderCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartTbody.innerHTML = '';
        
        if (cart.length === 0) {
            cartTbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 48px; color: #a0aec0;">Your cart is completely empty.</td></tr>';
            updateTotals(0);
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>
                <div class="product-details">
                  <div class="product-image" style="position: relative;">
                    <img src="${item.image}" alt="${item.name}" width="72" height="72" style="border-radius: 8px; object-fit: cover;" />
                    <button class="remove-product-btn" data-index="${index}" aria-label="Remove ${item.name} from cart" title="Remove product" style="position: absolute; top: -5px; right: -5px; background: #000; color: white; border-radius: 50%; width: 20px; height: 20px; font-size: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none;">&times;</button>
                  </div>
                  <div class="product-info">
                    <div class="name" style="font-weight: 600; font-size: 14px;">${item.name}</div>
                    <div class="color" style="font-size: 11px; color: #a0aec0;">Color: ${item.color}</div>
                    <div class="size" style="font-size: 11px; color: #a0aec0;">Size: ${item.size}</div>
                  </div>
                </div>
              </td>
              <td class="cart-price" style="text-align: center;">$${item.price.toFixed(2)}</td>
              <td class="cart-quantity" style="text-align: center;">
                <div class="quantity-controls" style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                  <button aria-label="Decrease quantity" class="qty-decrement" data-index="${index}" style="background: #e2e8f0; width: 24px; height: 24px; border-radius: 4px; font-weight: bold; cursor: pointer; border: none;">−</button>
                  <input type="number" readonly value="${item.quantity}" min="1" max="99" style="width: 40px; text-align: center; border: 1px solid #e2e8f0; border-radius: 4px; pointer-events: none;" />
                  <button aria-label="Increase quantity" class="qty-increment" data-index="${index}" style="background: #e2e8f0; width: 24px; height: 24px; border-radius: 4px; font-weight: bold; cursor: pointer; border: none;">+</button>
                </div>
              </td>
              <td class="cart-total" style="text-align: right; padding-right: 16px;">$${itemTotal.toFixed(2)}</td>
            `;
            cartTbody.appendChild(tr);
        });

        updateTotals(subtotal);
        attachEvents();
    };

    const updateTotals = (subtotal) => {
        const rows = document.querySelectorAll('.totals-row');
        rows.forEach(row => {
            const label = row.textContent.toLowerCase();
            if (label.includes('subtotal') || label.includes('totals')) {
                const valueEl = row.lastElementChild;
                if (valueEl) valueEl.textContent = `$${subtotal.toFixed(2)}`;
            }
        });
    };

    const attachEvents = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        document.querySelectorAll('.qty-increment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart[index].quantity += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                document.dispatchEvent(new Event('cartUpdated'));
            });
        });

        document.querySelectorAll('.qty-decrement').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    document.dispatchEvent(new Event('cartUpdated'));
                }
            });
        });

        document.querySelectorAll('.remove-product-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
                document.dispatchEvent(new Event('cartUpdated'));
            });
        });
    };

    renderCart();

    const cartActions = document.querySelector('.cart-actions');
    if (cartActions) {
        cartActions.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON' && e.target.textContent.toLowerCase().includes('clear cart')) {
                localStorage.removeItem('cart');
                renderCart();
                document.dispatchEvent(new Event('cartUpdated'));
            }
        });
    }
});
