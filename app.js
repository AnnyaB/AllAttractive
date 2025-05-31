console.log("Gaur Lila JS loaded");
// Ensure the DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  const lilasContainer = document.getElementById('lilas');
  const searchInput = document.getElementById('searchInput');
  const toggleBtn = document.getElementById('toggleMode');

  // Load Lilas
  fetch('lilas.json')
    .then(res => res.json())
    .then(data => {
      renderLilas(data);
      searchInput.addEventListener('input', () => {
        const filtered = data.filter(lila => 
          lila.title.toLowerCase().includes(searchInput.value.toLowerCase()));
        renderLilas(filtered);
      });
    });

  // Render Function
  function renderLilas(lilas) {
    lilasContainer.innerHTML = '';
    lilas.forEach(lila => {
      lilasContainer.innerHTML += `
        <div class="card">
          <img src="${lila.image}" alt="${lila.title}" />
          <h3>${lila.title}</h3>
          <p>${lila.description}</p>
          <small>${lila.reference}</small>
        </div>
      `;
    });
  }

  // Mode Toggle
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // Newsletter form
  document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Subscribed successfully! (Simulated)');
  });
});

// Toggle Notification Dropdown
  document.getElementById('notificationBtn').addEventListener('click', function () {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Handle Notification Form Submission
  document.getElementById('notificationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const selected = Array.from(document.querySelectorAll('input[name="notifications"]:checked'))
                         .map(cb => cb.value);
    alert("Preferences saved:\n" + selected.join('\n'));
  });

  // Contact Form Submission (can later connect to backend/email API)
  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Thank you for contacting us! Hare Krishna!");
    this.reset();
  });

  
const selectAllCheckbox = document.getElementById('selectAll');
const optionCheckboxes = document.querySelectorAll('.notif-option');

if (selectAllCheckbox && optionCheckboxes.length) {
  // When "Select All" changes, check/uncheck all options
  selectAllCheckbox.addEventListener('change', function () {
    optionCheckboxes.forEach(cb => cb.checked = this.checked);
  });

  // When any option changes, update "Select All" checked status
  optionCheckboxes.forEach(cb => {
    cb.addEventListener('change', function () {
      const allChecked = Array.from(optionCheckboxes).every(cb => cb.checked);
      selectAllCheckbox.checked = allChecked;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const signUpBtn = document.getElementById('signUpBtn');
  const logInBtn = document.getElementById('logInBtn');
  const authModal = document.getElementById('authModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalTitle = document.getElementById('modalTitle');
  const authForm = document.getElementById('authForm');
  const authName = document.getElementById('authName');
  const authEmail = document.getElementById('authEmail');
  const authPassword = document.getElementById('authPassword');
  const authMessage = document.getElementById('authMessage');
  const welcomeMsg = document.getElementById('welcomeMsg');

  let isSignUp = true;

  function openModal(signUp) {
    isSignUp = signUp;
    authMessage.textContent = '';
    authForm.reset();
    modalTitle.textContent = signUp ? 'Sign Up' : 'Log In';
    authName.style.display = signUp ? 'block' : 'none';
    authModal.style.display = 'flex';
  }

  function closeModal() {
    authModal.style.display = 'none';
  }

  signUpBtn.addEventListener('click', () => openModal(true));
  logInBtn.addEventListener('click', () => openModal(false));
  closeModalBtn.addEventListener('click', closeModal);

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    authMessage.textContent = '';

    const email = authEmail.value.trim();
    const password = authPassword.value.trim();
    const name = authName.value.trim();

    if (!email || !password || (isSignUp && !name)) {
      authMessage.textContent = 'Please fill in all required fields.';
      return;
    }

    // Simple validation (email format check can be improved)
    if (!email.includes('@')) {
      authMessage.textContent = 'Please enter a valid email.';
      return;
    }

    // Simulate signup/login success
    if (isSignUp) {
      // Save user info locally (just demo)
      localStorage.setItem('krsnaUser', JSON.stringify({name, email}));
      welcomeMsg.textContent = `Welcome, ${name}! Thank you for signing up.`;
    } else {
      // Simulate login by checking localStorage (very basic)
      const storedUser = JSON.parse(localStorage.getItem('krsnaUser'));
      if (storedUser && storedUser.email === email) {
        welcomeMsg.textContent = `Welcome back, ${storedUser.name}!`;
      } else {
        authMessage.textContent = 'No user found with this email.';
        return;
      }
    }

    welcomeMsg.style.display = 'block';
    closeModal();
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const authModal = document.getElementById('authModal');
  const signUpBtn = document.getElementById('signUpBtn');
  const logInBtn = document.getElementById('logInBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const authForm = document.getElementById('authForm');
  const authName = document.getElementById('authName');
  const authEmail = document.getElementById('authEmail');
  const authPassword = document.getElementById('authPassword');
  const authMessage = document.getElementById('authMessage');
  const modalTitle = document.getElementById('modalTitle');
  const welcomeMsg = document.getElementById('welcomeMsg');

  let isSignUp = true; // Track current mode

  // Show modal in Sign Up mode
  signUpBtn.addEventListener('click', () => {
    isSignUp = true;
    modalTitle.textContent = 'Sign Up';
    authName.style.display = 'block';
    authName.required = true;
    authEmail.value = '';
    authPassword.value = '';
    authMessage.textContent = '';
    authModal.style.display = 'flex';
  });

  // Show modal in Log In mode
  logInBtn.addEventListener('click', () => {
    isSignUp = false;
    modalTitle.textContent = 'Log In';
    authName.style.display = 'none';
    authName.required = false;
    authEmail.value = '';
    authPassword.value = '';
    authMessage.textContent = '';
    authModal.style.display = 'flex';
  });

  // Close modal
  closeModalBtn.addEventListener('click', () => {
    authModal.style.display = 'none';
    authMessage.textContent = '';
  });

  // Handle form submission for signup/login
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    authMessage.textContent = '';

    const email = authEmail.value.trim();
    const password = authPassword.value.trim();
    const name = authName.value.trim();

    if (isSignUp) {
      // Sign Up POST request
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          welcomeMsg.style.display = 'block';
          welcomeMsg.textContent = `Welcome, ${data.name || name}! Sign-up successful.`;
          authModal.style.display = 'none';
        } else {
          authMessage.textContent = data.message || 'Sign-up failed.';
        }
      } catch (err) {
        authMessage.textContent = 'Error connecting to server.';
      }
    } else {
      // Log In POST request
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();

        if (response.ok) {
          welcomeMsg.style.display = 'block';
          welcomeMsg.textContent = `Welcome back, ${data.name || email}! Logged in successfully.`;
          authModal.style.display = 'none';
        } else {
          authMessage.textContent = data.message || 'Login failed.';
        }
      } catch (err) {
        authMessage.textContent = 'Error connecting to server.';
      }
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const verses = document.querySelectorAll(".gita-verse");
  verses.forEach((verse, index) => {
    setTimeout(() => {
      verse.classList.add("visible");
    }, index * 2500); // 2.5 seconds between each verse
  });
});
document



