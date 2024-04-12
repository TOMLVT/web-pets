'use strict';
    const modal = document.querySelector('[data-modal]');
    const modalCloseBtn = document.querySelector('[data-modal-close]');
    const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

    const modalCloseFunc = function () {
        modal.classList.add('closed')
    }

    modalCloseOverlay.addEventListener('click', modalCloseFunc);
    modalCloseBtn.addEventListener('click', modalCloseFunc);


/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
      
        nav.classList.toggle('show-menu')
 
       
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')

 //slider
 // js slider 
 document.addEventListener("DOMContentLoaded", function() {
  const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: {
      delay: 2000, // Tự động chuyển slide sau mỗi 2 giây
    },
    pagination: {
      el: '.swiper-pagination', // Thanh điều hướng
      clickable: true,
    },
  });
});

/*=============== SWIPER JS ===============*/
let swiperCards = new Swiper(".card__content", {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
  
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
    breakpoints:{
      600: {
        slidesPerView: 2,
      },
      968: {
        slidesPerView: 3,
      },
    },
  });
// JS modal phản hồi từ khách hàng
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const modalLink = document.getElementById('nav__modal-respect');
  const closeBtn = document.getElementById('close');

  modalLink.addEventListener('click', function (event) {
      event.preventDefault();
      modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', function () {
      modal.style.display = 'none';
  });

  window.addEventListener('click', function (event) {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });

  const submitBtn = document.getElementById('submitFeedback');
  const feedbackInput = document.getElementById('feedback');

  submitBtn.addEventListener('click', function () {
      const feedback = feedbackInput.value;
      // Do whatever you want with the feedback, like sending it to a server
      console.log(feedback);
      // Clear the input field
      feedbackInput.value = '';
      // Close the modal
      modal.style.display = 'none';
  });
});



//==================================================
  // Function to display products
  function displayProducts(products) {
    var productsContainer = $('#products');
    productsContainer.empty(); // Clear previous products

    $.each(products, function(index, product) {
        var productHTML = '<div class="product" data-id="' + product.id + '">' +
            '<img src="' + product.img + '" alt="' + product.title + '">' +
            '<h3>' + product.title + '</h3>' +
            '<p>Old Price: ' + (product.price.low.Old).toLocaleString() + ' VND</p>' +
            '<p>New Price: ' + (product.price.low.New).toLocaleString() + ' VND</p>' +
            '</div>';

        productsContainer.append(productHTML);
    });

    // Attach click event to each product to redirect to product detail page
    $('#products').on('click', '.product', function() {
        var productId = $(this).data('id');
        window.location.href = 'chitiet.html?id=' + productId;
    });
}



// Load JSON data and display all products initially
$.getJSON('assets/js/data.json', function(data) {
    // Display products
   
    displayProducts(data.dataProducts);
});

// Handle price filter change
$('#priceFilter').change(function() {
    var selectedPrice = $(this).val();
    $.getJSON('assets/js/data.json', function(data) {
        if (selectedPrice === 'under3000000') {
            var filteredProducts = data.dataProducts.filter(function(product) {
                return product.price.low.Old < 3000000;
            });
            displayProducts(filteredProducts);
        } else if (selectedPrice === 'over5000000') {
            var filteredProducts = data.dataProducts.filter(function(product) {
                return product.price.low.New > 5000000;
            });
            displayProducts(filteredProducts);
        } else {
            displayProducts(data.dataProducts);
        }
    });
});

// Attach click event to "View Cart" button to redirect to cart page
$('#viewCartBtn').click(function() {
    window.location.href = 'giohang.html';
});

// // Count items in cart and display count on "View Cart" button
// function updateCartCount() {
//     var cart = JSON.parse(localStorage.getItem('cart')) || [];
//     var cartCount = cart.length;
//     $('#cartCount').text(cartCount);
// }

// // Update cart count when page is loaded
// $(document).ready(function() {
//     updateCartCount();
// });
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
// Search function











// Function to display search results


//========================================================================


  



 // Trong main.js

document.addEventListener('DOMContentLoaded', function() {
    const addToFavoriteButtons = document.querySelectorAll('.addToFavorite');

    addToFavoriteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = button.dataset.productId;
            
            // Sử dụng fetch để lấy dữ liệu từ tệp JSON
            fetch('assets/js/data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const product = data.dataProducts.find(product => product.id === productId);
                    if (product) {
                        addToFavorites(product);
                    } else {
                        console.error('Product not found in data.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        });
    });

//     function addToFavorites(product) {
//         // Lấy danh sách sản phẩm yêu thích từ localStorage
//         const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//         // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích chưa
//         const existingIndex = favorites.findIndex(item => item.id === product.id);
//         if (existingIndex === -1) {
//             // Nếu chưa tồn tại, thêm vào danh sách
//             favorites.push(product);
//             // Lưu lại danh sách yêu thích vào localStorage
//             localStorage.setItem('favorites', JSON.stringify(favorites));
//             alert('Sản phẩm đã được thêm vào danh sách yêu thích.');
//         } else {
//             // Nếu đã tồn tại, thông báo cho người dùng
//             alert('Sản phẩm đã có trong danh sách yêu thích.');
//         }
//     }
 });


//====================================================



























// document.addEventListener("keydown", function (event){
//   if (event.ctrlKey){
//      event.preventDefault();
//   }
//   if(event.keyCode == 123){
//      event.preventDefault();
//   }
// });

// document.addEventListener('contextmenu', function(event) {
//   event.preventDefault(); // Chặn hành động mặc định khi chuột phải được nhấp
//   alert(' Hệ thống lỗi !');
// });
//==================================================================================
// phần thông báo nhỏ khi click
function closeNotification() {
    var notification = document.querySelector('.notification');
    notification.style.top = '-30%'; // Di chuyển thông báo ra khỏi khung nhìn
    notification.style.opacity = '0'; // Ẩn đi thông báo
  }
  
  function showNotification() {
    var notification = document.querySelector('.notification');
    notification.style.top = '0'; // Di chuyển thông báo xuống vị trí mong muốn
    notification.style.opacity = '1'; // Hiển thị thông báo
  }















