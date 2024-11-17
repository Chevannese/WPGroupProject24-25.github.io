const data = JSON.parse(localStorage.getItem('currentUser'));
const result = data.firstName;
document.getElementsByClassName('Login')[0].innerText = result;
const id = data.trn;

//empties current user cart when invoice is generated
//empties AllProducts when invoice is generated
//this allows the next purchase to not have old cart data
var registrations = JSON.parse(localStorage.getItem('RegistrationData'));
var products = JSON.parse(localStorage.getItem('AllProducts'));
const user = registrations.find(record => record.trn === id);
user.cart = [];
products = [];

//updates this to local storage
localStorage.setItem('RegistrationData', JSON.stringify(registrations));
localStorage.setItem('AllProducts', JSON.stringify(products));

        const invoiceData = JSON.parse(localStorage.getItem('AllInvoices')).slice(-1)[0]; // Get the latest invoice

        // Populate the page
        document.getElementById('invoiceNum').textContent = invoiceData.InvoiceNum;
        document.getElementById('invoiceDate').textContent = invoiceData.DateofInvoice;
        document.getElementById('shippingName').textContent = invoiceData.ShippingName;
        document.getElementById('shippingAddr').textContent = invoiceData.ShippingAddr;

        const itemTable = document.getElementById('itemTable');
        invoiceData.cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.quantity}</td>
                <td>${item.title}</td>
                <td>$${item.total}</td>
            `;
            itemTable.appendChild(row);
        });

        // Populate totals
        document.getElementById('subTotal').textContent = invoiceData.subTotal.toFixed(2);
        document.getElementById('gctTotal').textContent = invoiceData.gctTotal.toFixed(2);
        document.getElementById('discountTotal').textContent = invoiceData.discountTotal.toFixed(2);
        document.getElementById('grandTotal').textContent = invoiceData.grandTotal.toFixed(2);
        alert("Invoice has been sent to Email.");