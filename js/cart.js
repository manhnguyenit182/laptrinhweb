document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const clearCartButton = document.getElementById('clear-cart'); 

    function renderCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = ''; 

        let totalPrice = 0;

        cart.forEach((item, index) => {
            const itemPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
            const itemTotal = itemPrice * item.quantity;
            totalPrice += itemTotal;

            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.img}" alt="Product Image" class="cart-item-image">
                    <div class="cart-item-info">
                        <h2 class="cart-item-name">${item.name}</h2>
                        <p class="cart-item-price">${item.price}</p>
                        <div class="cart-item-size">
                            <label for="size-select-${index}">Kích thước:</label>
                            <select id="size-select-${index}" class="size-select">
                                <option value="40" ${item.size === '40' ? 'selected' : ''}>40</option>
                                <option value="41" ${item.size === '41' ? 'selected' : ''}>41</option>
                                <option value="42" ${item.size === '42' ? 'selected' : ''}>42</option>
                                <option value="43" ${item.size === '43' ? 'selected' : ''}>43</option>
                                <option value="44" ${item.size === '44' ? 'selected' : ''}>44</option>
                            </select>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-button decrease" data-index="${index}">-</button>
                            <input class="quantity-input" type="text" value="${item.quantity}" data-index="${index}">
                            <button class="quantity-button increase" data-index="${index}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-index="${index}">Xóa</button>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        });
        totalPriceElement.textContent = totalPrice.toLocaleString('vi-VN') + 'đ';
        attachEventListeners();
    }

    function updateCartInLocalStorage(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    function attachEventListeners() {
        const decreaseButtons = document.querySelectorAll('.decrease');
        const increaseButtons = document.querySelectorAll('.increase');
        const removeButtons = document.querySelectorAll('.remove-item');
        const sizeSelects = document.querySelectorAll('.size-select');

        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                    updateCartInLocalStorage(cart);
                }
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart[index].quantity += 1;
                updateCartInLocalStorage(cart);
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(index, 1);
                updateCartInLocalStorage(cart);
            });
        });

        sizeSelects.forEach(select => {
            select.addEventListener('change', () => {
                const index = select.id.split('-').pop();
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart[index].size = select.value;
                updateCartInLocalStorage(cart);
            });
        });
    }

    clearCartButton.addEventListener('click', () => {
        localStorage.removeItem('cart');
        localStorage.setItem('cartCount', 0);

        renderCartItems();
    });

    renderCartItems();
});
