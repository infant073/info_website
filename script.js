// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon animation/class if needed
            const toggleIcon = navToggle.querySelector('i');
            if (toggleIcon) {
                if (navMenu.classList.contains('active')) {
                    toggleIcon.className = 'bx bx-x';
                } else {
                    toggleIcon.className = 'bx bx-menu';
                }
            }
        });
    }

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            const toggleIcon = navToggle ? navToggle.querySelector('i') : null;
            if (toggleIcon) toggleIcon.className = 'bx bx-menu';
        });
    });

    // 2. Active Link Highlighting on Scroll (using IntersectionObserver)
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. Dynamic Footer Copyright Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
