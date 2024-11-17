//Retrieves stored information on local storage of current User
const data = JSON.parse(localStorage.getItem('currentUser'));
const result = data.firstName;
//Displays the first name of user on page
document.getElementsByClassName('Login')[0].innerText = result;
const id = data.trn;
const AllInvoices = JSON.parse(localStorage.getItem('AllInvoices')) || [];
var quantity = 0;
var total = 0;

//Returns back to cart page
function exitForm()
{
    alert("Returning to Cart Page...");
    clearForm();
    window.location.href = 'cart.html';
}

//Clears Form Data
function clearForm() {
    document.getElementById("shippingForm").reset();
  }

  const users = JSON.parse(localStorage.getItem('RegistrationData'));
  const find = users.find(record => record.trn === id);

  find.cart.forEach(item => 
    {
    //Accumulate Total from User Cart
      total += item.total;

  });

  //Displays each item on a new line
  document.getElementById('grandTotal').innerHTML = total;
  document.getElementById('total').innerHTML = find.cart.map(item => item.total).join('<br>');
  document.getElementById('quantity').innerHTML = find.cart.map(item => item.quantity).join('<br>');
  document.getElementById('productTitle').innerHTML = find.cart.map(item => item.title).join('<br>');



function shippingUser()
{
    //Collects data based on user input
    const shippingName = document.getElementById('shippingName').value;
    const shippingAddr = document.getElementById('shippingAddr').value;
    const amount = document.getElementById('amount').value;
    //Initializes variables to prevent errors
    var subTotal = 0;
    var gctTotal = 0;
    var discountTotal = 0;
    var grandTotal = 0;

    const registrations = JSON.parse(localStorage.getItem('RegistrationData'));
    const user = registrations.find(record => record.trn === id);
    //Loops through user cart to accumulate amount from all items
    user.cart.forEach(item => {
        subTotal += item.subTotal || 0;
        gctTotal += item.gct || 0;
        discountTotal += item.discount || 0;
        grandTotal += item.total || 0;
    });

    //Custom Validations
    function checkShippingName(shippingName)
    {
        if(!shippingName.trim())
        {
            throw new Error("Shipping Company Name is required");
        }
        return "Access is granted";

    }

    function checkShippingAddr(shippingAddr)
    {
        if(!shippingAddr.trim())
        {
            throw new Error("Shipping Address is required");
        }
        return "Access is granted";
    }

    function checkAmount(amount,grandTotal)
    {
        if(amount < grandTotal)
        {
            throw new Error("The amount entered is less than Total in cart");
        }
        
        return "Access is granted";
    }

    try
    {
        //Form Validation checks
        checkShippingName(shippingName);
        checkShippingAddr(shippingAddr);
        checkAmount(amount,grandTotal);
        //Generates a unique invoice number based on current time
        const invoiceNum = `INVOICE_${Date.now()}`;
        //Creates new Invoice Array that contains shipping details and cart information
        var newInvoice = 
        {
            ShippingName: shippingName,
            ShippingAddr: shippingAddr,
            DateofInvoice: new Date().toLocaleString(),
            InvoiceNum: invoiceNum,
            Amount: amount,
            trn: user.trn,
            cart: user.cart,
            discountTotal: discountTotal,
            gctTotal: gctTotal,
            subTotal: subTotal,
            grandTotal: grandTotal
        };
        //Initializes user invoice if it does not exist
        if (!user.invoices) {
            user.invoices = [];
        }
        //adds new invoice to AllInvoices and user invoice
        AllInvoices.push(newInvoice);
        user.invoices.push(newInvoice);
        //Updates local storage regarding new invoice
        localStorage.setItem('RegistrationData', JSON.stringify(registrations));
        localStorage.setItem('AllInvoices', JSON.stringify(AllInvoices));

        //Clears Form and redirects to invoice page
        alert("Generating Invoice...");
        clearForm();
        window.location.href = 'invoice.html';
    }
    catch (error)
    {
        console.error(error.message)
        alert(error.message);
    }
}