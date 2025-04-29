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
                // Only close if the mobile menu is active
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

        // Check if logo element exists before setting src
        if(logo) {
            logo.src = isDark ? darkLogoSrc : lightLogoSrc;
        }

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

    // --- Intersection Observer for Scroll Animations ---
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible (adjust as needed)
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                // Check if the element is intersecting
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe elements with the 'animate-on-scroll' class
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        scrollElements.forEach(el => observer.observe(el));

        // Observe elements with the 'stagger-children' class (the parent)
        const staggerParents = document.querySelectorAll('.stagger-children');
        staggerParents.forEach(el => observer.observe(el));

    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Make all elements visible immediately
        console.warn("IntersectionObserver not supported. Animations disabled.");
        const scrollElements = document.querySelectorAll('.animate-on-scroll, .stagger-children > *');
        scrollElements.forEach(el => el.classList.add('is-visible'));
    }


    // --- Hero Load Animation ---
    // Use requestAnimationFrame for smoother start
    requestAnimationFrame(() => {
        setTimeout(() => {
            const loadElements = document.querySelectorAll('.animate-load');
            loadElements.forEach(el => {
                el.classList.add('is-visible');
            });
        }, 50); // Very small delay to allow initial render
    });


}); // End of DOMContentLoaded
