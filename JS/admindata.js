/*

Group Members
Student Name - Student ID - Contribution(s):

Chevannese Ellis - 2301109 - Cart Page and Checkout Pages

Daniel Lowe - 2300734 - Invoice and Additional Functions

Rajay Tomlinson - 2304909 - Product Catalogue

Craig Williamson - 2301516 - Login, Registration, and Reset Pages  */

//sets default users on localstorage when RegistrationData is empty 
function initializeAdminData() {
    const defaultUsers = [
      {
        firstName: "John",
        lastName: "Doe",
        dob: "1990-01-01",
        gender: "Male",
        phone: "873-124-2141",
        email: "john.doe@example.com",
        trn: "001-001-001",
        password: "adminpass",
        dateOfRegistration: new Date().toLocaleDateString(),
        cart: {},
        invoices: []
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        dob: "1985-05-12",
        gender: "Female",
        phone: "873-124-2142",
        email: "jane.smith@example.com",
        trn: "002-002-002",
        password: "adminpass",
        dateOfRegistration: new Date().toLocaleDateString(),
        cart: {},
        invoices: []
      },
      {
        firstName: "Alex",
        lastName: "Johnson",
        dob: "1988-09-23",
        gender: "Other",
        phone: "873-124-2143",
        email: "alex.johnson@example.com",
        trn: "003-003-003",
        password: "adminpass",
        dateOfRegistration: new Date().toLocaleDateString(),
        cart: {},
        invoices: []
      }
    ];
  
    // Fetch existing data from localStorage
    const existingData = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  
    // Check if each default user is already in existing data
    defaultUsers.forEach(defaultUser => {
      const userExists = existingData.some(user => user.trn === defaultUser.trn);
      if (!userExists) {
        existingData.push(defaultUser); // Add default user if not already present
      }
    });
  
    // Update localStorage with the combined data
    localStorage.setItem("RegistrationData", JSON.stringify(existingData));
    console.log("Admin data ensured to contain defaults.");
  }
  
  initializeAdminData(); // Call the function to ensure default data is always present
  