document.addEventListener('DOMContentLoaded', function() {
    const heartIcon = document.getElementById('hearts-list'); // Lấy phần tử biểu tượng trái tim
    const sidebar = document.querySelector('.sidebar');
    const closeSidebarButton = document.getElementById('closeSidebar'); // Lấy thẻ button tắt
    const cartItemList = document.getElementById('cartItemList'); // Lấy danh sách yêu thích
    const totalElement = document.getElementById('total'); // Lấy phần tử hiển thị tổng giá trị

    heartIcon.addEventListener('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a
        sidebar.classList.toggle('show'); // Toggle class 'show' cho sidebar
    });

    closeSidebarButton.addEventListener('click', function(event) {
        sidebar.classList.remove('show'); // Ẩn sidebar khi click vào nút tắt
    });

    // Lưu danh sách sản phẩm yêu thích
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Danh sách sản phẩm yêu thích

    // Function to display the list of favorite items in the sidebar
    function displayFavorites() {
        cartItemList.innerHTML = ''; // Clear previous items

        if (favorites.length === 0) {
            cartItemList.innerHTML = '<p>Danh sách yêu thích trống</p>';
            totalElement.textContent = '0 VNĐ'; // Reset total
        } else {
            let total = 0;
            favorites.forEach((product, index) => {
                // Create HTML markup for each favorite item
                var itemHTML = `
                    <div class="favorite-item">
                        <img src="${product.img}" alt="${product.title}" class="favorite-imgs ">
                        <p class="tt-list">${product.title}</p>
                        <p class="price-list">${formatCurrency(product.price.low.New)}</p>
                        <button class="remove-favorite" data-index="${index}">x</button>
                    </div>`;
                // Append the item to the list
                cartItemList.insertAdjacentHTML('beforeend', itemHTML);
                // Add price of product to total
                total += product.price.low.New;
            });
            totalElement.textContent = `${formatCurrency(total)}`;
        }
    }

    // Function to format currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    // Function to add favorite item
    function addFavorite(product) {
        favorites.push(product); // Add product to favorites
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
        displayFavorites(); // Refresh the displayed favorites list
    }

    // Function to remove favorite item
    function removeFavorite(index) {
        event.preventDefault();
        favorites.splice(index, 1); // Remove product from favorites
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Update localStorage
        displayFavorites(); // Refresh the displayed favorites list
    }

    // Add event listener to remove favorite button
    cartItemList.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-favorite')) {
            const index = event.target.dataset.index;
            removeFavorite(index);
        }
    });

    // Display initial list of favorites
    displayFavorites();
});
