// product-details.js
document.addEventListener('DOMContentLoaded', () => {

    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        const titleEl = document.getElementById('product-title');
        if (titleEl) titleEl.textContent = selectedProduct.name;

        // main image
        const imgEl = document.getElementById('product-main-image');
        if (imgEl && selectedProduct.image !== '') imgEl.src = selectedProduct.image;

        // update thumbnails loosely
        const thumbnails = document.querySelectorAll('.thumbnail-list img');
        if(thumbnails.length > 0 && selectedProduct.image !== '') {
            thumbnails[0].src = selectedProduct.image;
        }

        // Price element might contain an old-price span
        const priceEls = document.querySelectorAll('.price');
        priceEls.forEach(el => {
            // inside product-info usually
            if (el.closest('.product-info')) {
                // keep the old price if it exists, or calculate a fake one
                let oldPriceHTML = '';
                const oldPriceSpan = el.querySelector('.old-price');
                if(!oldPriceSpan) {
                    const fakeOld = (parseFloat(selectedProduct.price.replace(/[^0-9.]/g, '')) * 1.2).toFixed(2);
                    oldPriceHTML = ` <span class="old-price" style="text-decoration:line-through;color:#fb2e86;font-size:0.8em;padding-left:10px;">$${fakeOld}</span>`;
                } else {
                    oldPriceHTML = ` ${oldPriceSpan.outerHTML}`;
                }
                
                el.innerHTML = `${selectedProduct.price}${oldPriceHTML}`;
            }
        });

        const categoryEls = document.querySelectorAll('p');
        categoryEls.forEach(el => {
            if (el.innerHTML.includes('<strong>Categories:</strong>')) {
                el.innerHTML = `<strong>Categories:</strong> ${selectedProduct.category || 'Fashion, Uncategorized'}`;
            }
        });
        
        // update breadcrumb
        const breadcrumbSpan = document.querySelector('.breadcrumbs span[aria-current="page"]');
        if(breadcrumbSpan) {
            breadcrumbSpan.textContent = selectedProduct.name;
        }
    }

    // Connect image gallery
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    const mainImg = document.getElementById('product-main-image');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImg.src = thumb.src;
        });
    });

});
