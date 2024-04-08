function displayProducts_ps(products) {
    var productsContainer = $('#products-phocsoc');
    productsContainer.empty(); // Clear previous products

    $.each(products, function(index, product) {
        var productHTML = '<div class="product">' +
            '<img src="' + product.img + '" alt="' + product.title + '">' +
            '<h3 class="tt-pr">' + product.title + '</h3>' +
            '<p class="old-pr">Old Price: ' + (product.price.low.Old).toLocaleString() + ' VND</p>' +
            '<p class="n-pr">New Price: ' + (product.price.low.New).toLocaleString() + ' VND</p>' +
            '</div>';

        productsContainer.append(productHTML);
    });

    // Attach click event to each product to redirect to product detail page
    productsContainer.on('click', '.product', function() {
        var productIndex = $(this).index();
        var productId = products[productIndex].id;
        window.location.href = 'chitiet.html?id=' + productId;
    });
}

// Load JSON data and display Husky products initially
$.getJSON('assets/js/data.json', function(data) {
    var huskyProducts = data.dataProducts.filter(function(product) {
        return product.title.toLowerCase().includes('phốc sốc');
    });
    displayProducts_ps(huskyProducts);
});
