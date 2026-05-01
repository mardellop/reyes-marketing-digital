// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for navbar
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

// Initial check
window.addEventListener('load', revealOnScroll);
// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// Navbar styling on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(248, 250, 252, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.background = 'rgba(248, 250, 252, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Simple mobile menu toggle functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        const isDisplayed = window.getComputedStyle(navLinks).display !== 'none';
        
        if (isDisplayed && navLinks.style.display !== '') {
             navLinks.style.display = 'none';
        } else {
             navLinks.style.display = 'flex';
             navLinks.style.flexDirection = 'column';
             navLinks.style.position = 'absolute';
             navLinks.style.top = '100%';
             navLinks.style.left = '0';
             navLinks.style.width = '100%';
             navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
             navLinks.style.padding = '2rem';
             navLinks.style.backdropFilter = 'blur(10px)';
             navLinks.style.borderBottom = '1px solid var(--glass-border)';
        }
    });
    
    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
    
    // Reset display on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.borderBottom = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });
}
