

//Ensures that the DOM Content is loaded to perform the  function ready()
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
ShowUserFrequency();
    ShowInvoices();
    const data = JSON.parse(localStorage.getItem('currentUser'));
    const result = data.firstName;
    document.getElementsByClassName('Login')[0].innerText = result;
    const id = data.trn;
    
function calculateAge(dob) {
    if (!dob) return { valid: false, message: "Date of birth is required." };
    
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }

  // Function to display user frequency as a chart
function ShowUserFrequency() {
    const userData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    
    let genderCounts = { Male: 0, Female: 0, Other: 0 };
    let ageGroups = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };
    let AgeArr = [];
    userData.forEach(player => {
        let age = calculateAge(player.dob);
        AgeArr.push(age);
    }); //console.log(AgeArr);


    userData.forEach(user => {
        if (user.gender) genderCounts[user.gender] = (genderCounts[user.gender] || 0) + 1;
        AgeArr = calculateAge(user.dob) || 0;
        if (AgeArr >= 18 && AgeArr <= 25) ageGroups["18-25"]++;
        else if (AgeArr >= 26 && AgeArr <= 35) ageGroups["26-35"]++;
        else if (AgeArr >= 36 && AgeArr <= 50) ageGroups["36-50"]++;
        else if (AgeArr > 50) ageGroups["50+"]++;

    });



    
    const chartData = {
        labels: ["Male", "Female", "Other", "18-25", "26-35", "36-50", "50+"],
        datasets: [{
            label: "User Frequency",
            data: [
                genderCounts.Male, genderCounts.Female, genderCounts.Other,
                ageGroups["18-25"], ageGroups["26-35"], ageGroups["36-50"], ageGroups["50+"]
            ],
            backgroundColor: [
                "#3498db", "#e74c3c", "#9b59b6", "#1abc9c", "#f39c12", "#2ecc71", "#e67e22"
            ]
        }]
    };

    // Ensure the canvas element exists
    const chartElement = document.getElementById("userFrequencyChart");
    if (chartElement) {
        const ctx = chartElement.getContext("2d");

        // Check if the Chart.js object has been created before
        if (window.myChart) {
            window.myChart.destroy();  // Destroy any previous chart instance
        }

        window.myChart = new Chart(ctx, {
            type: "bar",
            data: chartData,
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: { beginAtZero: true },
                    y: { beginAtZero: true }
                }
            }
        });
    } else {
        console.error("Canvas element with id 'userFrequencyChart' not found.");
    }
}

// Display all invoices and allow searching by TRN
// Function to display all invoices and filter by TRN
const searchButton = document.getElementById("searchButton");
if (searchButton) {
    searchButton.addEventListener("click", ShowInvoices); // Trigger ShowInvoices on button click
} else {
    console.error("Element with id 'searchButton' not found.");
}
}

// Function to search for invoices
function ShowInvoices() {
const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
const searchInput = document.getElementById("searchTrn");
const searchTrn = searchInput ? searchInput.value.toLowerCase() : "";

const filteredInvoices = allInvoices.filter(invoice =>
    invoice.trn && invoice.trn.toLowerCase().includes(searchTrn)
);

const invoiceList = filteredInvoices.map((invoice, index) => `
    <tr>
        <td>${invoice.trn}</td>
        <td>${formatDate(invoice.DateofInvoice)}</td>
        <td style="text-align: center;">
            <button class="view-button" data-index="${index}">View</button>
        </td>
    </tr>
    <tr class="invoice-details" id="details-${index}" style="display: none;">
        <td colspan="3">
            <div>
                <strong>Invoice Number:</strong> ${invoice.InvoiceNum}<br>
                <strong>Shipping Name:</strong> ${invoice.ShippingName}<br>
                <strong>Shipping Address:</strong> ${invoice.ShippingAddr}<br>
                <strong>Date:</strong> ${formatDate(invoice.DateofInvoice)}<br>
                <strong>Grand Total:</strong> $${invoice.grandTotal.toFixed(2)}<br>
                <strong>Items:</strong>
                <ul>
                    ${invoice.cart.map(item => `
                        <li>${item.title} (Qty: ${item.quantity}) - $${item.price.toFixed(2)}</li>
                    `).join("")}
                </ul>
            </div>
        </td>
    </tr>
`).join("");

const invoiceTable = document.getElementById("invoiceList");
if (invoiceTable) {
    invoiceTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>TRN</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceList || '<tr><td colspan="3">No invoices found</td></tr>'}
            </tbody>
        </table>`;

    // Add event listeners to "View" buttons
    const viewButtons = document.querySelectorAll(".view-button");
    viewButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            const detailsRow = document.getElementById(`details-${index}`);
            detailsRow.style.display = detailsRow.style.display === "none" ? "table-row" : "none";
        });
    });
} else {
    console.error("Element with id 'invoiceList' not found.");
}
}

function GenerateInvoice() {
    const data = JSON.parse(localStorage.getItem("currentUser")) || {};
    const id = data.trn;

    // Get registrations and products
    const registrations = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    let products = JSON.parse(localStorage.getItem("AllProducts")) || [];

    // Find user by TRN
    const user = registrations.find(record => record.trn === id);
    if (!user || !user.cart || user.cart.length === 0) {
        alert("No items in the cart to generate an invoice.");
        return;
    }

    // Create the new invoice
    const newInvoice = {
        InvoiceNum: `INV-${Date.now()}`,
        trn: id,
        DateofInvoice: new Date().toISOString(),
        ShippingName: `${data.firstName} ${data.lastName}`,
        ShippingAddr: user.address || "Not provided",
        cart: user.cart,
        subTotal: calculateSubTotal(user.cart),
        gctTotal: calculateGCT(user.cart),
        discountTotal: calculateDiscount(user.cart),
        grandTotal: calculateGrandTotal(user.cart),
    };

    // Save the invoice
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    allInvoices.push(newInvoice);
    localStorage.setItem("AllInvoices", JSON.stringify(allInvoices));

    // Clear the cart and product data
    user.cart = [];
    products = [];
    localStorage.setItem("RegistrationData", JSON.stringify(registrations));
    localStorage.setItem("AllProducts", JSON.stringify(products));

    alert("Invoice has been sent to Email.");
    ShowInvoices();
}

// Helper functions to calculate totals
function calculateSubTotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateGCT(cart) {
    const GCT_RATE = 0.15; // Assuming 15% GCT
    return calculateSubTotal(cart) * GCT_RATE;
}

function calculateDiscount(cart) {
    const DISCOUNT_RATE = 0.1; // Assuming 10% discount
    return calculateSubTotal(cart) * DISCOUNT_RATE;
}

function calculateGrandTotal(cart) {
    return calculateSubTotal(cart) + calculateGCT(cart) - calculateDiscount(cart);
}

// Format date helper
function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
