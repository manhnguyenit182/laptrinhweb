
document.addEventListener('DOMContentLoaded', function() {
    const sizeButtons = document.querySelectorAll('.size-button');

    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {       
            sizeButtons.forEach(btn => btn.classList.remove('selected'));     
            this.classList.add('selected');   
            const selectedSize = this.getAttribute('data-size');
            console.log(`Selected size: ${selectedSize}`);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartCount = localStorage.getItem('cartCount') || 0;
    cartCountElement.textContent = cartCount;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {     
            const productCard = event.target.closest('.product-card');
            const productImg = productCard.querySelector('img').src;
            const productName = productCard.querySelector('h2').textContent;
            const productPrice = productCard.querySelector('p').textContent;
            const selectedSize = productCard.querySelector('.size-button.selected');
            if (!selectedSize) {
                alert('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.');
                return;
            }      
            cartCount++;
            cartCountElement.textContent = cartCount; 
            localStorage.setItem('cartCount', cartCount);
            addProductToCart(productName, productPrice, productImg, selectedSize.textContent);
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
        });
    });

    function addProductToCart(productName, productPrice, productImg, productSize) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];     
        cart.push({
            name: productName,
            price: productPrice,
            img: productImg,
            size: productSize,
            quantity: 1
        });     
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
