document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const menuIcon = mobileMenuToggle.querySelector('i'); // Get the icon element

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Toggle icon between bars and times (X)
             const isExpanded = navLinks.classList.contains('active');
            if (isExpanded) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                 mobileMenuToggle.setAttribute('aria-expanded', 'true');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                 mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Optional: Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
});
