

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
    
// Function to display user frequency as a chart
function ShowUserFrequency() {
    const userData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
    
    let genderCounts = { Male: 0, Female: 0, Other: 0 };
    let ageGroups = { "18-25": 0, "26-35": 0, "36-50": 0, "50+": 0 };

    userData.forEach(user => {
        if (user.gender) genderCounts[user.gender] = (genderCounts[user.gender] || 0) + 1;
        const age = user.age || 0;
        if (age >= 18 && age <= 25) ageGroups["18-25"]++;
        else if (age >= 26 && age <= 35) ageGroups["26-35"]++;
        else if (age >= 36 && age <= 50) ageGroups["36-50"]++;
        else if (age > 50) ageGroups["50+"]++;
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
function ShowInvoices() {
    const allInvoices = JSON.parse(localStorage.getItem("AllInvoices")) || [];
    const searchTrn = document.getElementById("searchTrn").value.toLowerCase();

    const filteredInvoices = allInvoices.filter(invoice =>
        invoice.trn && invoice.trn.toLowerCase().includes(searchTrn)
    );

    const invoiceList = filteredInvoices.map(invoice => `
        <tr>
            <td>${invoice.trn}</td>
            <td>${invoice.date}</td>
            <td>${invoice.amount}</td>
        </tr>
    `).join("");

    document.getElementById("invoiceList").innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>TRN</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                ${invoiceList || '<tr><td colspan="3">No invoices found</td></tr>'}
            </tbody>
        </table>`;
}}