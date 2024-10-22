const professionalList = document.getElementById('professional-list');
const selectedProfessionals = document.getElementById('selected-professionals');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalField = document.getElementById('modal-field');
const modalPhone = document.getElementById('modal-phone');
const modalEmail = document.getElementById('modal-email');
const modalLocation = document.getElementById('modal-location');
const updateButton = document.getElementById('update-button');

// Track the current professional being viewed
let currentProfessionalId = null;

// Track selected professionals (will be saved in localStorage)
let selected = [];
let allProfessionals = []; // Store all professionals for searching

// Load selected professionals from local storage
function loadSelections() {
    const storedSelections = JSON.parse(localStorage.getItem('selectedProfessionals'));
    if (storedSelections) {
        selected = storedSelections;
        updateSelectedProfessionals();
    }
}

// Fetch professionals from the JSON server
async function fetchProfessionals() {
    const response = await fetch('https://project1-6c51.onrender.com/professionals');
    allProfessionals = await response.json(); // Store all professionals for searching
    displayProfessionals(allProfessionals);
}

// Display professionals on the webpage
function displayProfessionals(professionals) {
    professionalList.innerHTML = '';
    professionals.forEach(prof => {
        const div = document.createElement('div');
        div.className = 'professional';
        div.innerHTML = `
            <h4>${prof.name}</h4>
            <p>Field: ${prof.field}</p>
            <button onclick="openModal(${prof.id})">View Details</button>
            <button onclick="selectProfessional(${prof.id})">Select</button>
        `;
        professionalList.appendChild(div);
    });
}

// Filter professionals based on the search input
function filterProfessionals() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProfessionals = allProfessionals.filter(prof => {
        return prof.name.toLowerCase().includes(query) || prof.field.toLowerCase().includes(query);
    });
    displayProfessionals(filteredProfessionals);
}

// Open the modal to display professional details
async function openModal(id) {
    const response = await fetch(`https://project1-6c51.onrender.com/professionals/${id}`);
    const prof = await response.json();

    currentProfessionalId = prof.id; // Set the ID for updating
    modalTitle.innerText = prof.name;
    modalField.innerText = `Field: ${prof.field}`;
    modalPhone.innerText = `Contact: ${prof.phone}`;
    modalEmail.innerText = `Email: ${prof.email}`;
    modalLocation.innerText = `Location: ${prof.location}`;
    
    modal.style.display = "block";
}

// Close the modal
function closeModal() {
    modal.style.display = "none";
}

// Select a professional
function selectProfessional(id) {
    if (!selected.includes(id)) {
        selected.push(id);
        updateSelectedProfessionals();
        saveSelections();
    }
}

// Update the selected professionals display
function updateSelectedProfessionals() {
    selectedProfessionals.innerHTML = '';
    selected.forEach(id => {
        const div = document.createElement('div');
        div.innerHTML = `<span>Professional ID: ${id}</span> <button onclick="removeProfessional(${id})">Remove</button>`;
        selectedProfessionals.appendChild(div);
    });
}

// Remove a selected professional
function removeProfessional(id) {
    selected = selected.filter(profId => profId !== id);
    updateSelectedProfessionals();
    saveSelections();
}

// Save selections to local storage
function saveSelections() {
    localStorage.setItem('selectedProfessionals', JSON.stringify(selected));
}

// Update professional details (for simplicity, updating only phone and email)
async function updateProfessional() {
    const newPhone = prompt("Enter new phone number:");
    const newEmail = prompt("Enter new email:");

    const updatedData = {
        phone: newPhone,
        email: newEmail
    };

    await fetch(`https://project1-6c51.onrender.com/professionals/${currentProfessionalId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });

    closeModal(); // Close the modal after updating
    fetchProfessionals(); // Refresh the list to reflect changes
}

// User Authentication
let users = []; // Array to store users

// Login function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert("Login successful!");
        loadSelections(); // Load selected professionals after login
        document.getElementById('auth-container').style.display = 'none'; // Hide login form
        document.getElementById('professional-list').style.display = 'block'; // Show professional list
    } else {
        alert("Invalid credentials, please try again.");
    }
}

// Registration function
function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (users.find(u => u.username === username)) {
        alert("Username already exists!");
    } else {
        users.push({ username, password });
        alert("Registration successful!");
        showLogin();
    }
}

// Show registration form
function showRegistration() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('registration-container').style.display = 'block';
}

// Show login form
function showLogin() {
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('registration-container').style.display = 'none';
}

// Initialize the app
fetchProfessionals();
loadSelections();

