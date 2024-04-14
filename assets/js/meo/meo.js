function displaycat(products) {
    var productsContainer = $('#products-cats');
    productsContainer.empty(); // Clear previous products

    $.each(products, function(index, product) {
        var productHTML = '<div class="product">' +
            '<img src="' + product.img + '" alt="' + product.title + '">' +
            '<h3 class="tt-pr">' + product.title + '</h3>' +
            '<p class="old-pr">' + (product.price.low.Old).toLocaleString() + ' VND</p>' +
            '<p class="n-pr">' + (product.price.low.New).toLocaleString() + ' VND</p>' +
            '</div>';

        productsContainer.append(productHTML);
    });

    // Attach click event to each product to redirect to product detail page
    productsContainer.on('click', '.product', function() {
        var productIndexcat = $(this).index();
        var productId = products[productIndexcat].id;
        window.location.href = 'chitiet.html?id=' + productId;
    });
}

// Load JSON data and display Alaska products initially
$.getJSON('assets/js/data.json', function(data) {
    var catProducts = data.datacat.filter(function(product) {
        return product.title.toLowerCase().includes("meo");
    });
    displaycat(catProducts);
});
