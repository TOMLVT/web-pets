document.addEventListener('DOMContentLoaded', function() {
    // Cập nhật số lượng sản phẩm trong giỏ hàng từ localStorage
    updateCartCount();
});

// Function to update cart count
function updateCartCount() {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartCount = cart.length;
    $('#cartCount').text(cartCount);
}
$(document).on('click', '#viewCartBtn', function() {
        window.location.href = 'giohang.html';
    });