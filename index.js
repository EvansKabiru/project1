// Sample data for professionals (this would ideally come from a server)
let professionals = [
    { id: 1, name: "Sam Smith", profession: "Plumber", contact: "0798765432", photo: "url_to_photo_1" },
    { id: 2, name: "Jane Doe", profession: "Electrician", contact: "0787654321", photo: "url_to_photo_2" },
    { id: 3, name: "Merovinjan Mansa", profession: "Mechanic", contact: "0712345678", photo: "url_to_photo_3" },
];

// Function to handle form submission and add professional profiles
document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get form values
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;
    const phone = document.querySelector('input[type="tel"]').value;
    const age = document.querySelector('input[type="number"]').value;
    const location = document.querySelector('input[type="text"]').value;
    const profession = document.querySelector('select').value;
    const photograph = document.querySelector('input[type="file"]').files[0]; // Handle photo
  
    // Form validation
    if (!email || !password || !phone || !age || !location || !profession || !photograph) {
      alert("All fields are required!");
      return;
    }
  
    // Create a professional profile
    const profileCard = document.createElement('div');
    profileCard.classList.add('profile-card');
  
    // Profile content
    profileCard.innerHTML = `
      <h3>Profession: ${profession}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Location:</strong> ${location}</p>
      <img src="${URL.createObjectURL(photograph)}" alt="Professional Photograph" style="width:100px;height:100px;border-radius:50%;"/>
    `;
  
    // Append the new profile to the professional profile grid
    document.querySelector('.professional-profiles').appendChild(profileCard);
  
    // Clear the form after submission
    document.querySelector('.form').reset();
  });
  
  // Search functionality
  document.querySelector('.search button').addEventListener('click', function() {
    const searchTerm = document.querySelector('input[type="search"]').value.toLowerCase();
  
    // Get all profile cards
    const profiles = document.querySelectorAll('.profile-card');
  
    // Filter profiles based on the search term
    profiles.forEach(profile => {
      const professionText = profile.querySelector('h3').innerText.toLowerCase();
      if (professionText.includes(searchTerm)) {
        profile.style.display = 'block'; // Show matching profiles
      } else {
        profile.style.display = 'none'; // Hide non-matching profiles
      }
    });
  });
  
// Array to hold selected professional(s)
let selectedProfessionals = [];

// Function to display all professionals
function displayProfessionals() {
    const professionalList = document.getElementById("professional-list");
    professionalList.innerHTML = ""; // Clears previous entries

    professionals.forEach(professional => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${professional.photo}" alt="${professional.name}" width="50">
            Contact: ${professional.contact}
        `;

        const selectButton = document.createElement("button");
        selectButton.textContent = "Select";
        selectButton.onclick = () => selectProfessional(professional.id);
        listItem.appendChild(selectButton);
        professionalList.appendChild(listItem);
    });
}

// Function to select a professional
function selectProfessional(id) {
    const professional = professionals.find(prof => prof.id === id);
    if (!selectedProfessionals.includes(professional)) {
        selectedProfessionals.push(professional);
        alert(`${professional.name} selected!`);
    } else {
        alert(`${professional.name} is already selected.`);
    }
    updateSelectedList();
}

// Function to update the selected professionals list
function updateSelectedList() {
    const selectedList = document.getElementById("selected-professionals");
    selectedList.innerHTML = ""; // Clear previous entries

    selectedProfessionals.forEach(professional => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${professional.name} - ${professional.profession}`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeProfessional(professional.id);
        
        listItem.appendChild(removeButton);
        selectedList.appendChild(listItem);
    });
}

// Function to remove a professional from the selection
function removeProfessional(id) {
    selectedProfessionals = selectedProfessionals.filter(prof => prof.id !== id);
    alert(`Professional removed from selection.`);
    updateSelectedList();
}

// Initial display of professionals
displayProfessionals();
