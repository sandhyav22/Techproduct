// Elements
const authBtn = document.getElementById("authBtn");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Popups
function openPopup(id) {
  document.getElementById(id).style.display = "flex";
}
function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

// Initial state
let state = "register";  // register → login → logout
let loggedUser = null;

// Toggle Register → Login → Logout
authBtn.addEventListener("click", () => {
  if (state === "register") {
    openPopup("registerPopup");
  } 
  else if (state === "login") {
    openPopup("loginPopup");
  } 
  else if (state === "logout") {
    loggedUser = null;
    authBtn.textContent = "Register";
    state = "register";
  }
});

// Handle Register
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;

  loggedUser = { name, email };

  closePopup("registerPopup");
  authBtn.textContent = "Login";
  state = "login";
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;

  loggedUser = { name: "User", email };

  closePopup("loginPopup");

  authBtn.textContent = loggedUser.name + " (Logout)";
  state = "logout";
});

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  navLinks.style.display =
    navLinks.style.display === "flex" ? "none" : "flex";
});


document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stop form submit

    let valid = true;

    // Helper function for validation
    function validateField(id, message, testFn) {
        const input = document.getElementById(id);
        const error = input.nextElementSibling;

        if (!testFn(input.value.trim())) {
            error.textContent = message;
            error.style.display = "block";
            input.classList.add("invalid");
            valid = false;
        } else {
            error.style.display = "none";
            input.classList.remove("invalid");
        }
    }

    // Validation rules
    validateField("fullName", "Full name is required", v => v.length >= 3);
    validateField("email", "Enter a valid email", v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    validateField("phone", "Enter a valid 10-digit number", v => /^[0-9]{10}$/.test(v));
    validateField("address", "Address cannot be empty", v => v.length >= 5);
    validateField("city", "Enter a valid city", v => v.length >= 2);
    validateField("pincode", "Enter a 6-digit pincode", v => /^[0-9]{6}$/.test(v));
    validateField("state", "Enter a valid state", v => v.length >= 2);

    // If everything is valid
    if (valid) {
        alert("Order Placed Successfully! 🎉");
        this.reset();
    }
});
