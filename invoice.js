//Retrieving current user name
const invoiceData = JSON.parse(localStorage.getItem('User'));
const result = invoiceData[0];
document.getElementById('Login4').textContent = result;

//Retrieving product titles from product page
const cartData = JSON.parse(localStorage.getItem('cartObj'));
const cartResult = cartData;
var showData = cartData.join(', ')
document.getElementById('productTitle').textContent = showData;

//Retrieving quantity from product page
const qtyValue = JSON.parse(localStorage.getItem('totQty'));
const qtyValueResult = qtyValue[1];
document.getElementById('quantity').textContent = qtyValueResult;

//Retrieving total from product page
const totValue = JSON.parse(localStorage.getItem('totQty'));
const totValueResult = qtyValue[0];
document.getElementById('total').textContent = totValueResult;


document.getElementById('subTotal').textContent = totValueResult;
const subTotal = totValueResult


//Calculates grandTotal
const gctPerc = 0.15;
const gctPrice = gctPerc * totValueResult;
document.getElementById('GCT').textContent  = gctPrice;
const discountPer = 0.30;

const grandTotal = gctPrice + subTotal;
const discountPerc = 0.30;
const  discountPrice = discountPerc * grandTotal;
document.getElementById('discount').textContent = discountPrice
const finalPrice = grandTotal - discountPrice ;
document.getElementById('grandTotal').textContent = finalPrice
const currentDate = new Date().toDateString();
document.getElementById('currentDate').textContent = currentDate;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    

    //Once clicked confirms to cancel order
    document.getElementById("Cancel").addEventListener("click", function () {
        var confirmCancel = confirm("Are you sure you want to cancel your order?");
        if (confirmCancel) {
            //deletes objects from local storage
            localStorage.removeItem('cartObj');
            document.getElementById('productTitle').textContent = '';
            localStorage.removeItem('totQty');
            document.getElementById('total').textContent = '';
            document.getElementById('quantity').textContent = '';
            document.getElementById('subTotal').textContent= '';
            document.getElementById('discount').textContent = '';
            document.getElementById('GCT').textContent = '';
            document.getElementById('grandTotal').textContent = '';

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
