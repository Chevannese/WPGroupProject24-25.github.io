//Retrieves stored information on local storage of current User
const data = JSON.parse(localStorage.getItem('currentUser'));
const result = data.firstName;
//Displays the first name of user on page
document.getElementsByClassName('Login')[0].innerText = result;
const id = data.trn;

//Ensures that the DOM Content is loaded to perform the  function ready()
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    loadCartFromLocalStorage();
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    document.getElementsByClassName('btn-checkout')[0].addEventListener('click', checkoutClicked);
    document.getElementsByClassName('btn-cancel')[0].addEventListener('click',cancelClicked);
    document.getElementsByClassName('btn-exit')[0].addEventListener('click',exitClicked);
}

function loadCartFromLocalStorage() {
    var cartItems = JSON.parse(localStorage.getItem('AllProducts'));
    if (!cartItems) return;
    
    var cartContainer = document.getElementsByClassName('cart-items')[0];
    cartContainer.innerHTML = ''; // Clear any existing items

    cartItems.forEach(item => {
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        var cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.imageSrc}" width="100px" height="100px">
                <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="${item.quantity}">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;
        cartRow.innerHTML = cartRowContents;
        cartContainer.append(cartRow);

        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    });

    updateCartTotal();
}

function updateCartTotal() {
    // Retrieve cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem('AllProducts')) || [];
    var subTotal = 0;
    var gctTotal = 0;
    var discountTotal = 0;
    var grandTotal = 0;

    // Loop through each item and accumulate totals
    cartItems.forEach(item => {
        subTotal += item.subTotal || 0;
        gctTotal += item.gct || 0;
        discountTotal += item.discount || 0;
        grandTotal += item.total || 0;
    });

    const registrations = JSON.parse(localStorage.getItem('RegistrationData'));
    const user = registrations.find(record => record.trn === id);
    if (user) {
        if (!Array.isArray(user.cart)) {
            user.cart = []; // Initialize user cart if it doesn't exist
        }
    }

    // Update display values in the DOM
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + subTotal.toFixed(2);
    document.getElementsByClassName('cart-gct-price')[0].innerText = '$' + gctTotal.toFixed(2);
    document.getElementsByClassName('cart-discount-price')[0].innerText = '$' + discountTotal.toFixed(2);
    document.getElementsByClassName('cart-grand-price')[0].innerText = '$' + grandTotal.toFixed(2);
}


function checkoutClicked() {
    alert('Thank you for your purchase')
    window.location.href = "checkout.html";
}

function cancelClicked() {
    // Clear AllProducts from localStorage
    localStorage.removeItem('AllProducts');

    // Clear the user's cart in RegistrationData
    const registrations = JSON.parse(localStorage.getItem('RegistrationData'));
    const user = registrations.find(record => record.trn === id);

    if (user) {
        user.cart = [];
        localStorage.setItem('RegistrationData', JSON.stringify(registrations));
    }

    // Clear the cart display
    var cartContainer = document.getElementsByClassName('cart-items')[0];
    cartContainer.innerHTML = ''; // Remove all items from the cart container

    // Update cart totals on the screen
    updateCartTotal();
}

//Redirects to product page after confirmation
function exitClicked() {
    var confirmExit = confirm('Are you sure you want to exit?');
    if(confirmExit)
    {
        window.location.href = "product.html";
    }
    
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartRow = buttonClicked.parentElement.parentElement;
    var title = cartRow.getElementsByClassName('cart-item-title')[0].innerText;

    // Remove the item from localStorage
    var cartItems = JSON.parse(localStorage.getItem('AllProducts'));
    cartItems = cartItems.filter(item => item.title !== title);
    localStorage.setItem('AllProducts', JSON.stringify(cartItems));

    // Removes the item 
    cartRow.remove();

    updateCartTotal();
    syncUserCart(); // Sync changes to user's cart
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    var cartRow = input.parentElement.parentElement;
    var title = cartRow.getElementsByClassName('cart-item-title')[0].innerText;

    

    // Update the quantity in localStorage
    var cartItems = JSON.parse(localStorage.getItem('AllProducts'));
    cartItems.forEach(item => {
        if (item.title === title) {
            item.quantity = input.value;
            item.subTotal = item.price * item.quantity;


            item.gct = item.subTotal * 0.15;          
            item.discount = item.subTotal * 0.30;     
            item.total = item.subTotal + item.gct - item.discount;
        }
    });
    localStorage.setItem('AllProducts', JSON.stringify(cartItems));

    updateCartTotal();
    syncUserCart();
}

//Syncs AllProducts and user cart data
function syncUserCart() {
    const registrations = JSON.parse(localStorage.getItem('RegistrationData'));
    const user = registrations.find(record => record.trn === id);

    if (user) {
        user.cart = JSON.parse(localStorage.getItem('AllProducts')) || [];
        localStorage.setItem('RegistrationData', JSON.stringify(registrations));
    }
}





