document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login');
    const signupButton = document.querySelector('.signup');
    const viewKitsButton = document.querySelector('.prep-card button');
    const exploreSkillsButton = document.querySelector('.skill-card button');
    const menuToggleButton = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const typedText = document.getElementById('typed-text');
    const text = `"It’s not a bug; it’s an undocumented feature."`;
    let index = 0;

    // Clear any initial content in the typing area
    if (typedText) {
        typedText.textContent = ''; 

        const typeText = () => {
            if (index < text.length) {
                typedText.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50); // Adjust typing speed here
            }
        };

        setTimeout(typeText, 500); // Start typing effect after a short delay
    }

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    if (signupButton) {
        signupButton.addEventListener('click', () => {
            window.location.href = 'signup.html'; // Redirect to signup page
        });
    }

    if (viewKitsButton) {
        viewKitsButton.addEventListener('click', () => {
            alert('View all kits functionality not implemented.');
        });
    }

    if (exploreSkillsButton) {
        exploreSkillsButton.addEventListener('click', () => {
            alert('Explore Skills functionality not implemented.');
        });
    }

    if (menuToggleButton && navLinks) {
        menuToggleButton.addEventListener('click', (event) => {
            navLinks.classList.toggle('show');
            event.stopPropagation(); // Stop the event from propagating to document
        });

        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !menuToggleButton.contains(event.target)) {
                navLinks.classList.remove('show');
            }
        });

        navLinks.addEventListener('click', (event) => {
            event.stopPropagation(); // Stop the event from propagating to document
        });
    }

    // Handle signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                alert(result.message);
                if (response.ok) {
                    window.location.href = 'login.html'; // Redirect to login page after successful registration
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Registration failed');
            }
        });
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                alert(result.message);
                if (response.ok) {
                    window.location.href = 'index.html'; // Redirect to home page after successful login
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Login failed');
            }
        });
    }
});
