



// $(document).ready(function () {
//     // Bắt sự kiện submit của form tìm kiếm
//     $('#searchForm').submit(function (event) {
//         event.preventDefault(); // Ngăn chặn hành động mặc định của form

//         let search = $('#searchInput').val().trim(); // Lấy từ khóa tìm kiếm từ input

//         // Chuyển hướng đến trang kết quả tìm kiếm và truyền từ khóa tìm kiếm trong URL
//         window.location.href = 'search.html?search=' + encodeURIComponent(search);
//     });

//     let href = window.location.href;
//     let url = new URL(href); // Lấy URL hiện tại
//     let search = (url.searchParams.get('search') || '').trim(); // Lấy từ khóa tìm kiếm từ URL

//     // Hiển thị từ khóa tìm kiếm
//     $('#searchKeyword').text(search);

//     // Thực hiện tìm kiếm trong dữ liệu JSON khi trang được tải
//     $.getJSON("assets/js/data.json").done((data) => {
//         let searchResults = data.dataProducts.filter((product) => {
//             return product.title.toLowerCase().includes(search.toLowerCase());
//         });

//         // Load sản phẩm phù hợp vào trang
//         loadDataProduct(searchResults);

//         // Hiển thị thông báo nếu không tìm thấy sản phẩm nào
//         if (searchResults.length === 0) {
//             loadNothing();
//         }
//     });

//     // Hàm hiển thị thông báo khi không tìm thấy sản phẩm nào
//     const loadNothing = () => {
//         $('.products').html(`<h3 class='text-danger' style="margin: 150px 0">Có lẽ bạn nhập sai tên sản phẩm hoặc chúng tôi chưa có sản phẩm bạn cần quan tâm</h3>`);
//     };

//     // Hàm load dữ liệu sản phẩm vào trang
//     const loadDataProduct = (data) => {
//         let productsContainer = $('#searchResults');
//         productsContainer.empty(); // Xóa nội dung trước đó

//         $.each(data, function(index, product) {
//             let productHTML = '<div class="product" data-id="' + product.id + '">' + // Thêm thuộc tính data-id để lưu ID của sản phẩm
//                 '<img src="' + product.img + '" alt="' + product.title + '">' +
//                 '<h3 class="tt-pr">' + product.title + '</h3>' +
//                 '<p class="n-pr ">' + product.price.low.New.toLocaleString() + ' VNĐ</p>' + // Hiển thị giá
//                 '</div>';

//             productsContainer.append(productHTML);
//         });
//     }

//     // Bắt sự kiện click vào sản phẩm
//     $('#searchResults').on('click', '.product', function() {
//         var productId = $(this).data('id');
//         window.location.href = 'chitiet.html?id=' + productId; // Chuyển hướng đến trang chi tiết sản phẩm và truyền ID của sản phẩm
//     });
// });


//===========================================================================


$(document).ready(function () {
    // Bắt sự kiện submit của form tìm kiếm
    $('#searchForm').submit(function (event) {
        event.preventDefault(); 

        let search = $('#searchInput').val().trim(); // Lấy từ khóa tìm kiếm từ input
//===========================================================================

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
        let searchResults = data.dataProducts.filter((product) => {
            return product.title.toLowerCase().includes(search.toLowerCase());
        });
//===========================================================================



//===========================================================================

        // Load sản phẩm phù hợp vào trang
        loadDataProduct(searchResults);

        // Hiển thị thông báo nếu không tìm thấy sản phẩm nào ===============
        if (searchResults.length === 0) {
            loadNothing();
        }
    });

    // Hàm hiển thị thông báo khi không tìm thấy sản phẩm nào ===========
    const loadNothing = () => {
        $('#searchResults').html(`<h3 class='text-danger' style="margin: 150px 0">Có lẽ bạn nhập sai tên sản phẩm hoặc chúng tôi chưa có sản phẩm bạn cần quan tâm</h3>`);
    };
//===========================================================================

    // Hàm load dữ liệu sản phẩm vào trang =====================================
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

    // Bắt sự kiện click vào sản phẩm ======================================
    $('#searchResults').on('click', '.product', function() {
        var productId = $(this).data('id');
        window.location.href = 'chitiet.html?id=' + productId; 
    });
});
