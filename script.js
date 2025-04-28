document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = mobileMenuToggle?.querySelector('i'); // Use optional chaining

    if (mobileMenuToggle && navLinks && menuIcon) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuIcon.className = isExpanded ? 'fas fa-times' : 'fas fa-bars'; // Simpler icon toggle
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded.toString());
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuIcon.className = 'fas fa-bars';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    } else {
        console.warn("Mobile menu elements not found.");
    }

    // --- Theme Toggle ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.getElementById('company-logo');
    const themeIcon = themeToggleButton?.querySelector('i'); // Use optional chaining

    const lightLogoSrc = 'images/logo_light.png'; // Path to your light logo
    const darkLogoSrc = 'images/logo_dark.png';   // Path to your dark logo

    // Function to set the theme
    const setTheme = (isDark) => {
        if (!logo || !themeIcon || !themeToggleButton) {
             console.warn("Theme toggle elements missing.");
             return;
        }

        body.classList.toggle('dark-mode', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        logo.src = isDark ? darkLogoSrc : lightLogoSrc;
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon'; // Sun for light mode, Moon for dark
        themeToggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    // Check local storage or system preference on load
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    let isDarkMode = currentTheme === 'dark' || (currentTheme === null && preferDark.matches);

    // Apply the initial theme
    setTheme(isDarkMode);

    // Add event listener for the button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            isDarkMode = !body.classList.contains('dark-mode'); // Toggle based on current state
            setTheme(isDarkMode);
        });
    }

     // Optional: Listen for system preference changes
    preferDark.addEventListener('change', (e) => {
        // Only update if no theme is explicitly set in localStorage
        if (localStorage.getItem('theme') === null) {
            isDarkMode = e.matches;
            setTheme(isDarkMode);
        }
    });


    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
