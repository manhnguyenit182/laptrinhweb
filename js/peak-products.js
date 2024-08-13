/*const peakProducts = [
    {
        id: 'peak1',
        name: 'Peak Product 1',
        price: 1400000,
        image: './images/product/peak/product1.jpg',
        sizes: ['40', '41', '42', '43', '44'],
        description: 'Đôi giày bóng rổ WIND TUNNEL 4.0 với công nghệ A-FLASHEDGE mang lại sự thoải mái và hỗ trợ tối đa cho người chơi bóng rổ.'
    },
    {
        id: 'peak2',
        name: 'Peak Product 2',
        price: 1500000,
        image: './images/product/peak/product2.jpg',
        sizes: ['40', '41', '42', '43', '44'],
        description: 'Đôi giày bóng rổ WIND TUNNEL 4.0 với công nghệ A-FLASHEDGE mang lại sự thoải mái và hỗ trợ tối đa cho người chơi bóng rổ.'
    },
    {
        id: 'peak3',
        name: 'Peak Product 3',
        price: 1300000,
        image: './images/product/peak/product3.jpg',
        sizes: ['40', '41', '42', '43', '44'],
        description: 'Đôi giày bóng rổ WIND TUNNEL 4.0 với công nghệ A-FLASHEDGE mang lại sự thoải mái và hỗ trợ tối đa cho người chơi bóng rổ.'
    },
    {
        id: 'peak4',
        name: 'Peak Product 4',
        price: 1300000,
        image: './images/product/peak/product4.jpg',
        sizes: ['40', '41', '42', '43', '44'],
        description: 'Đôi giày bóng rổ WIND TUNNEL 4.0 với công nghệ A-FLASHEDGE mang lại sự thoải mái và hỗ trợ tối đa cho người chơi bóng rổ.'
    },
    {
        id: 'peak5',
        name: 'Peak Product 5',
        price: 1300000,
        image: './images/product/peak/product5.jpg',
        sizes: ['40', '41', '42', '43', '44'],
        description: 'Đôi giày bóng rổ WIND TUNNEL 4.0 với công nghệ A-FLASHEDGE mang lại sự thoải mái và hỗ trợ tối đa cho người chơi bóng rổ.'
    },
];*/

import {products} from './products.js';

document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const searchBar = document.getElementById('search-bar');

    function displayProducts(products) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <a href="product.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
                <h2>${product.name}</h2>
                <p>${product.price.toLocaleString('vi-VN')}đ</p>
                <div class="sizes">
                    ${product.sizes.map(size => `<button class="size-button" data-size="${size}">${size}</button>`).join('')}
                </div>
                <button class="add-to-cart" disabled>Thêm vào giỏ</button>
            `;

            productList.appendChild(productCard);

            const sizeButtons = productCard.querySelectorAll('.size-button');
            const addToCartButton = productCard.querySelector('.add-to-cart');
            let selectedSize = null;

            sizeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    selectedSize = this.getAttribute('data-size');
                    sizeButtons.forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    addToCartButton.removeAttribute('disabled');
                });
            });

            addToCartButton.addEventListener('click', () => {
                if (selectedSize) {
                    addToCart(product, selectedSize);
                } else {
                    alert('Vui lòng chọn kích cỡ giày trước khi thêm vào giỏ hàng.');
                }
            });
        });
    }

    function filterProducts(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = products.peak.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    }

    searchBar.addEventListener('input', filterProducts);

    displayProducts(products.peak);

    function addToCart(product, size) {
        const cartItem = {
            ...product,
            selectedSize: size
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm sản phẩm vào giỏ hàng');
        console.log(cart);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    const product = products.peak.find(p => p.id === productId);
    const productDetail = document.getElementById('product-detail');
    const productDescription = document.getElementById('product-description');

    productDetail.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
        <h1>${product.name}</h1>
        <p>${product.price.toLocaleString('vi-VN')}đ</p>
        <div class="sizes">
            ${product.sizes.map(size => `<button class="size-button" data-size="${size}">${size}</button>`).join('')}
        </div>
        <div class="quantity">
            <p>Số lượng</p>
            <button id="decrease">-</button>
            <input id="quantity" type="text" value="1">
            <button id="increase">+</button>
        </div>
        <button id="add-to-cart" class="add-to-cart" disabled>Thêm vào giỏ</button>
        <button class="contact"><a href="#footer">Liên hệ tư vấn</a></button>
        </div>
        `;
    productDescription.innerHTML = `
        <h2>Mô tả sản phẩm</h2>
        <p>${product.description}</p>
`;
    const sizeButtons = productDetail.querySelectorAll('.size-button');
    const addToCartButton = productDetail.querySelector('#add-to-cart');
    const quantityInput = productDetail.querySelector('#quantity');
    const increaseButton = productDetail.querySelector('#increase');
    const decreaseButton = productDetail.querySelector('#decrease');
    let selectedSize = null;

    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedSize = this.getAttribute('data-size');
            sizeButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            addToCartButton.removeAttribute('disabled');
        });
    });
    increaseButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value, 10);
        if (quantity < 99) { // Optional: Set a max limit for quantity
            quantityInput.value = quantity + 1;
        }
    });

    decreaseButton.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value, 10);
        if (quantity > 1) { // Prevent quantity from going below 1
            quantityInput.value = quantity - 1;
        }
    });

    addToCartButton.addEventListener('click', () => {
        if (selectedSize) {
            const quantity = parseInt(quantityInput.value, 10);
            addToCart(product, selectedSize, quantity);
        } else {
            alert('Vui lòng chọn kích cỡ giày trước khi thêm vào giỏ hàng.');
        }
    });

    function addToCart(product, size, quantity) {
        const cartItem = {
            ...product,
            selectedSize: size,
            quantity: quantity
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Đã thêm sản phẩm vào giỏ hàng');
        console.log(cart);
    }
});