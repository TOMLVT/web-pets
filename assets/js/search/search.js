


$(document).ready(function () {
    // Biến global để lưu trữ kết quả tìm kiếm
    let searchResults = [];

    // Bắt sự kiện submit của form tìm kiếm
    $('#searchForm').submit(function (event) {
        event.preventDefault(); 

        let search = $('#searchInput').val().trim(); // Lấy từ khóa tìm kiếm từ input

        // Chuyển hướng đến trang kết quả tìm kiếm và truyền từ khóa tìm kiếm trong URL
        window.location.href = 'search.html?search=' + encodeURIComponent(search);
    });

    let href = window.location.href;
    let url = new URL(href); // Lấy URL hiện tại
    let search = (url.searchParams.get('search') || '').trim(); // Lấy từ khóa tìm kiếm từ URL

    // Hiển thị từ khóa tìm kiếm
    $('#searchKeywordContainer').html('<h4 class="result-find">Kết quả tìm kiếm: ' + search + '</h4>');

    // Thực hiện tìm kiếm trong dữ liệu JSON khi trang được tải
    $.getJSON("assets/js/data.json").done((data) => {
        searchResults = data.dataProducts.filter((product) => {
            return product.title.toLowerCase().includes(search.toLowerCase());
        });

        // Load sản phẩm phù hợp vào trang
        loadDataProduct(searchResults);

        // Hiển thị thông báo nếu không tìm thấy sản phẩm nào
        if (searchResults.length === 0) {
            loadNothing();
        }
    });

    // Hàm hiển thị thông báo khi không tìm thấy sản phẩm nào
    const loadNothing = () => {
        $('#searchResults').html(`<h3 class='text-danger' style="margin: 150px 0">Có lẽ bạn nhập sai tên sản phẩm hoặc chúng tôi chưa có sản phẩm bạn cần quan tâm</h3>`);
    };

    // Hàm load dữ liệu sản phẩm vào trang
    const loadDataProduct = (data) => {
        let productsContainer = $('#searchResults');
        productsContainer.empty(); 

        $.each(data, function(index, product) {
            let productHTML = '<div class="product" data-id="' + product.id + '">' + 
                '<img src="' + product.img + '" alt="' + product.title + '">' +
                '<h3 class="tt-pr">' + product.title + '</h3>' +
                '<p class="n-pr ">' + product.price.low.New.toLocaleString() + ' VNĐ</p>' + 
                '</div>';

            productsContainer.append(productHTML);
        });
    }

    // Bắt sự kiện click vào nút sắp xếp từ thấp đến cao
    $('#sortPriceLowToHigh').click(function() {
        // Sắp xếp sản phẩm từ thấp đến cao theo giá
        searchResults.sort((a, b) => a.price.low.New - b.price.low.New);
        // Hiển thị sản phẩm đã sắp xếp
        loadDataProduct(searchResults);
    });

    // Bắt sự kiện click vào nút sắp xếp từ cao đến thấp
    $('#sortPriceHighToLow').click(function() {
        // Sắp xếp sản phẩm từ cao đến thấp theo giá
        searchResults.sort((a, b) => b.price.low.New - a.price.low.New);
        // Hiển thị sản phẩm đã sắp xếp
        loadDataProduct(searchResults);
    });

    // Bắt sự kiện click vào sản phẩm
    $('#searchResults').on('click', '.product', function() {
        var productId = $(this).data('id');
        window.location.href = 'chitiet.html?id=' + productId; 
    });
});
