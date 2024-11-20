//Question 1B: Login Page

let attemptCount = 0;
/* 
Question 1B ii and iii
*/
function loginUser() {
  const trn = document.getElementById("trn").value.trim();
  const password = document.getElementById("password").value;
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.innerHTML = ""; // Clear previous errors

  // Input validation for TRN and password fields
  if (!trn) {
    errorContainer.innerHTML = "TRN is required.";
    return;
  }

  const trnPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/; // TRN format pattern (000-000-000)
  if (!trnPattern.test(trn)) {
    errorContainer.innerHTML = "TRN must follow the format 000-000-000.";
    return;
  }

  if (!password) {
    errorContainer.innerHTML = "Password is required.";
    return;
  }

  if (password.length < 8) {
    errorContainer.innerHTML = "Password must be at least 8 characters long.";
    return;
  }

  // Attempt to find user in registration data
  const registrations = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  const user = registrations.find(record => record.trn === trn && record.password === password);

  if (user) {
    // Successful login
    //Collects current user data for later use
    let currentUser =
    {
      firstName: user.firstName,
      trn: user.trn
    }
    localStorage.setItem('currentUser',JSON.stringify(currentUser));
    clearForm();
    window.location.href = "product.html"; // Redirect to product catalog
  } else {
    attemptCount++;
    errorContainer.innerHTML = `Invalid TRN or password. You have ${3 - attemptCount} attempts left.`;

    if (attemptCount >= 3) {
      window.location.href = "reset.html"; // Redirect to error locked page
    }
  }
}

function clearForm() {
  document.getElementById("loginForm").reset();
  document.getElementById("errorContainer").innerHTML = ""; // Clear error messages on reset
  attemptCount = 0; // Reset attempt count
}

function resetPassword() {
  window.location.href = "reset.html"; // Redirect to reset password page
}

function updatePassword() {
  const trn = document.getElementById("trn").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.innerHTML = ""; // Clear previous errors

  // Input validation
  if (!trn || !password || !confirmPassword) {
    errorContainer.innerHTML = "All fields are required.";
    return;
  }

  if (password.length < 8) {
    errorContainer.innerHTML = "Password must be at least 8 characters long.";
    return;
  }

  if (password !== confirmPassword) {
    errorContainer.innerHTML = "Passwords do not match.";
    return;
  }

  // Check TRN and update password
  const registrations = JSON.parse(localStorage.getItem("RegistrationData")) || [];
  const user = registrations.find(record => record.trn === trn);

  if (user) {
    user.password = password; // Update password
    localStorage.setItem("RegistrationData", JSON.stringify(registrations)); // Save updated data
    alert("Password has been updated successfully.");
    
    window.location.href = "index.html"; // Redirect to index.html
  } else {
    errorContainer.innerHTML = "TRN not found. Please enter a valid TRN.";
  }
}

/*function clearLocalStorage() {
  localStorage.clear();
  alert("Local storage has been cleared.");
} */
