document.addEventListener('DOMContentLoaded', function() {
    // Cập nhật số lượng sản phẩm trong giỏ hàng từ localStorage
    updateCartCountlist();
});

function updateCartCountlist() {
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];     
    $('#cartCount-list').text(favorites.length);
} 