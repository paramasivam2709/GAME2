// Simple localStorage-based auth for demo purposes

function showError(id, msg) {
    const el = document.getElementById(id);
    el.innerText = msg;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 3000);
}

// Register validation
const regForm = document.getElementById('registerForm');
if (regForm) {
    regForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirm = document.getElementById('regConfirm').value;

        if (username.length < 3) {
            showError('registerError', 'Username must be at least 3 characters.');
            return;
        }
        if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email)) {
            showError('registerError', 'Invalid email address.');
            return;
        }
        if (password.length < 6) {
            showError('registerError', 'Password must be at least 6 characters.');
            return;
        }
        if (password !== confirm) {
            showError('registerError', 'Passwords do not match.');
            return;
        }
        // Save user (for demo, only one user)
        localStorage.setItem('user', JSON.stringify({ username, email, password }));
        // Redirect to login
        window.location.href = 'login.html?registered=1';
    });
}

// Login validation
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.username || !user.password) {
            showError('loginError', 'No user registered. Please register first.');
            return;
        }
        if (username !== user.username || password !== user.password) {
            showError('loginError', 'Invalid username or password.');
            return;
        }
        // Save login state
        localStorage.setItem('loggedIn', '1');
        // Redirect to home page after 1s
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    });
}

// Show registration success message on login page
if (window.location.search.includes('registered=1')) {
    setTimeout(() => {
        showError('loginError', 'Registration successful! Please login.');
    }, 200);
}