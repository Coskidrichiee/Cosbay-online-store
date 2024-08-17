// cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Open cart
cartIcon.onclick = () => {
    cart.classList.add('active');
};

// Close cart
closeCart.onclick = () => {
    cart.classList.remove('active');
};

// Cart working js
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);  
} else {
    ready();
}

// Ready function
function ready() {
    // Remove items from cart
    var removeCartButtons = document.getElementsByClassName('Remove-cart');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem); 
    }
    
    // Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);  
    } 
    
    // Add to cart 
    var addCartButtons = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener("click", addCartClicked);
    }
    
    // Buy button work
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}

// Buy button
function buyButtonClicked() {
    alert("Your order is placed");
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

// Remove items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

// Quantity changed
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    price  = price.replace('/,/g', '');
    addProductToCart(title, price, productImg);
    updatetotal();
}

// Add product to cart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to the cart");
            return; // Exit function if item already exists
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash Remove-cart'></i>`;
        
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName("Remove-cart")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

// Update total
function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace(/₦|,/g, ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }

    total = Math.round(total * 100) / 100; 
    document.getElementsByClassName('total-price')[0].innerText = "₦" + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
// star rating..
document.addEventListener('DOMContentLoaded', function() {
    // Select all cart items
    const cartItems = document.querySelectorAll('.product-box');

    cartItems.forEach(item => {
        const stars = item.querySelectorAll('.star');
        const ratingValue = item.querySelector('.ratingValue');
        let currentRating = 0;

        stars.forEach(star => {
            star.addEventListener('click', function() {
                currentRating = parseInt(star.getAttribute('data-value'));
                updateRating();
            });
            star.addEventListener('mouseover', function() {
                updateStars(parseInt(star.getAttribute('data-value')));
            });
            star.addEventListener('mouseout', function() {
                updateStars(currentRating);
            });
        });

        function updateRating() {
            ratingValue.textContent = currentRating;
            updateStars(currentRating);
        }

        function updateStars(rating) {
            stars.forEach(star => {
                const value = parseInt(star.getAttribute('data-value'));
                // Toggle 'selected' class based on whether the star's value is less than or equal to the rating
                star.classList.toggle('selected', value <= rating);
            });
        }
    });
});

 /* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);

// scroll to top button
    document.addEventListener('DOMContentLoaded', function() {
        const goTopBtn = document.getElementById('goTopBtn');
      
        // Show button when scrolled down 100px from the top
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                goTopBtn.style.display = 'block';
            } else {
                goTopBtn.style.display = 'none';
            }
        };
      
        // Smooth scroll to top when button is clicked
        goTopBtn.onclick = function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
      });

      // for clickable heart
      function toggleFavorite(icon) {
        icon.classList.toggle('far'); // Toggle between open heart
        icon.classList.toggle('fas'); // Toggle to filled heart
        icon.classList.toggle('favorited'); // Toggle color
    }


    