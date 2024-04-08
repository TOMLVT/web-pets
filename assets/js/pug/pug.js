// Function to display Pug products
function displayPug(products) {
    var productsContainer = $('#products-pugs');
    productsContainer.empty(); // Clear previous products

    $.each(products, function(index, product) {
        var productHTML = '<div class="product" id="product_' + product.id + '">' +
            '<img src="' + product.img + '" alt="' + product.title + '">' +
            '<h3 class="tt-pr">' + product.title + '</h3>' +
            '<p class="old-pr">' + (product.price.low.Old).toLocaleString() + ' VND</p>' +
            '<p class="n-pr ">' + (product.price.low.New).toLocaleString() + ' VND</p>' +
            '</div>';

        productsContainer.append(productHTML);

        // Attach click event to each product to redirect to product detail page
        $('#product_' + product.id).click(function() {
            window.location.href = 'chitiet.html?id=' + product.id;
        });
    });
}

// Load JSON data and display Pug products initially
$.getJSON('assets/js/data.json', function(data) {
    var pugProducts = data.dataProducts.filter(function(product) {
        return product.title.toLowerCase().includes("pug");
    });
    displayPug(pugProducts);
});
