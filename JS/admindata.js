
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
  