function displayProductsGolden(productsgl) {
    var productsContainer = $('#products-golden');
    productsContainer.empty(); // Clear previous products

    $.each(productsgl, function(index, product_gl) {
        var productHTML = '<div class="product">' +
            '<img src="' + product_gl.img + '" alt="' + product_gl.title + '">' +
            '<h3 class="tt-pr">' + product_gl.title + '</h3>' +
            '<p class="old-pr">Old Price: ' + (product_gl.price.low.Old).toLocaleString() + ' VND</p>' +
            '<p class="n-pr">New Price: ' + (product_gl.price.low.New).toLocaleString() + ' VND</p>' +
            '</div>';

        productsContainer.append(productHTML);
    });

    // Attach click event to each product to redirect to product detail page
    productsContainer.on('click', '.product', function() {
        var productIndex = $(this).index();
        var productId = productsgl[productIndex].id;
        window.location.href = 'chitiet.html?id=' + productId;
    });
}

// Load JSON data and display Golden products initially
$.getJSON('assets/js/data.json', function(data) {
    var goldenProducts = data.dataProducts.filter(function(product_gl) {
        return product_gl.title.toLowerCase().includes('golden');
    });
    displayProductsGolden(goldenProducts);
});
