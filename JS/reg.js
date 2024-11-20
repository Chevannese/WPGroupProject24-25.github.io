// Question 1A User Authentication (LocalStorage)
// Helper function to check if TRN is unique in localStorage
function isUniqueTRN(trn) {
  const registrations = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  return !registrations.some(record => record.trn === trn);
}
/*
Question 1A 

iv.	Visitor must be over 18 years old to register. Calculate using JavaScript.
*/
// Function to calculate age based on DOB
function calculateAge(dob) {
  if (!dob) return { valid: false, message: "Date of birth is required." };
  
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18 ? { valid: true } : { valid: false, message: "You must be at least 18 years old to register." };
}
/*
Question 1A 

ii.	all fields are filled (HTML validation). 

iii.	passwords should be at least 8 characters long.

v.	TRN is unique; must be of length and in the format (000-000-000). **TRN is used instead of a username with login.


*/
// Validate user input
function validateInput(input, type) {
  const validationRules = {
    name: /^[a-zA-Z ]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\d{3}-\d{3}-\d{4}$/,
    trn: /^\d{3}-\d{3}-\d{3}$/,
    password: /^.{8,}$/
  };
  return validationRules[type].test(input);
}

// Register user function
function registerUser() {
  const formElements = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value.trim(),
    trn: document.getElementById("trn").value,
    password: document.getElementById("password").value
  };

  // Validate input
  const validationErrors = [];
  if (!validateInput(formElements.firstName, "name")) {
    validationErrors.push("Invalid first name.");
  }
  if (!validateInput(formElements.lastName, "name")) {
    validationErrors.push("Invalid last name.");
  }
  if (!validateInput(formElements.email, "email")) {
    validationErrors.push("Invalid email. Must be in the format example@gmail.com");
  }
  if (!validateInput(formElements.phone, "phone")) {
    validationErrors.push("Invalid phone number. Must be in the format 876-123-4567");
  }
  if (!validateInput(formElements.trn, "trn")) {
    validationErrors.push("Invalid trn. Must be in the format 000-000-000");
  }

  if (!validateInput(formElements.password, "password")) {
    validationErrors.push("Password must be at least 8 characters long.");
  }
  
/*
Question 1A 

iv.	visitor must be over 18 years old to register. Calculate using JavaScript.

*/

  // Validate DOB and age
  const ageCheck = calculateAge(formElements.dob);
  if (!ageCheck.valid) {
    validationErrors.push(ageCheck.message);
  }

  // Validate TRN uniqueness
  if (!isUniqueTRN(formElements.trn)) {
    validationErrors.push("This TRN is already registered. Please use a unique TRN.");
  }

  const errorContainer = document.getElementById("errorContainer");
  
  if (validationErrors.length > 0) {
    errorContainer.innerHTML = validationErrors.join("<br>");
    return;
  } else {
    errorContainer.innerHTML = ""; // Clear errors if no validation issues
  }

  // Create user object
  const user = {
    ...formElements,
    dateOfRegistration: new Date().toISOString(),
    cart: {},
    invoices: []
  };

  // Retrieve existing registration data from localStorage
  const registrations = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  registrations.push(user); // Add new user to the array
/*
Question 1A 

vi.	store registration information (ie. first name, last name, date of birth, gender, phone number, email, tax registration number (trn), password, date of registration, cart{}, invoices[]) as a JavaScript 
object. Each registration record must be appended to localStorage key called RegistrationData using JavaScript (as an array of objects.)

*/
  // Save updated data back to localStorage
  localStorage.setItem("RegistrationData", JSON.stringify(registrations));

  // Display success message
  errorContainer.innerHTML = "<span style='color: green;'>Registration successful!</span>";

  // Goes to index/login page after filling out the register form
  window.location.href = "index.html";
}

// Clear form function
function clearForm() {
  document.getElementById("registrationForm").reset();
  document.getElementById("errorContainer").innerHTML = ""; // Clear error messages on reset
}
