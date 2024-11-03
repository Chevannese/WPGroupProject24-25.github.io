
const data = JSON.parse(localStorage.getItem('User'));
const result = data[0];
document.getElementById('Login').textContent = result;
let cartTitle = [];

var total = 0;
var quantity = 0
// Check if the document is still loading, and attach the 'ready' event if needed
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Get all buttons with class 'addItem'
    var addToCartButtons = document.getElementsByClassName('addItem');
    
    // Loop through the buttons and add an event listener to each
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
    
    document.getElementById("Checkout").addEventListener("click", function () {
        var confirmCheckout = confirm("Are you sure you want to checkout?");
        if (confirmCheckout) {

            localStorage.setItem('totQty', JSON.stringify([total, quantity]));
            window.location.href = "invoice.html";
        }
    })

    //Once clicked confirms to cancel order
    document.getElementById("Cancel").addEventListener("click", function () {
        var confirmCancel = confirm("Are you sure you want to cancel your order?");
        if (confirmCancel) {
            total = 0;
            quantity = 0;
            document.getElementsByClassName('totalPrice')[0].innerHTML = '$' + total;
            document.getElementsByClassName('QTY')[0].innerHTML = quantity;
            console.log(total, quantity);
            
            cartTitle = [];
            console.log(cartTitle);

        }
    })

    //Once clicked confirms to exit product page
    document.getElementById("Exit").addEventListener("click", function () {
        var confirmExit = confirm("Are you sure you want to exit?");
        if (confirmExit) {
            window.location.href = "login.html";
        }
    });

    
    
}



function addToCartClicked(event) {
    var button = event.target;
    
    // Assuming the HTML structure is such that we can access the shop item with this method
    var shopItem = button.parentElement; // Using closest to find the nearest parent with class 'shop-item'

    // Get the title and price of the product from the item
    var title = shopItem.getElementsByClassName('title')[0].innerText;
    var priceElement = shopItem.getElementsByClassName('price')[0].innerText;
    var image = shopItem.getElementsByClassName('image')[0].src;
    cartTitle.push(title);
    console.log(cartTitle);

    localStorage.setItem('cartObj', JSON.stringify(cartTitle));
    console.log(title, priceElement, image);

    

    // Remove the dollar sign and convert the price to a float
    var price = parseFloat(priceElement.replace('$', ''));

    total = total + price;
    quantity++;
    document.getElementsByClassName('totalPrice')[0].innerHTML = '$' + total;
    document.getElementsByClassName('QTY')[0].innerHTML = quantity;
    console.log(total,quantity);
}




function updateCartTotal()
{
    var AllPrice = document.getElementsByClassName('price');

    var cartRows = document.getElementsByClassName('cartRow');
    var total = 0;
    // Works up to the above info
    // Loop through each cart row and calculate the total price
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('price')[0].innerText;
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        total += price;
        console.log(total);
    }
    document.getElementsByClassName('totalPrice')[0].innerHTML = '$' + total;
}
