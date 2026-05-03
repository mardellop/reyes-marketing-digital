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

// Optimized Scroll Reveal Animations using Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Navbar styling on scroll - Throttled for performance
let isScrolling = false;
const navbarElement = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                navbarElement.classList.add('scrolled');
            } else {
                navbarElement.classList.remove('scrolled');
            }
            isScrolling = false;
        });
        isScrolling = true;
    }
}, { passive: true });

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
             navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
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

// Función para el envío invisible (Cartero Invisible)
function handleInvisibleSubmit() {
    const successMsg = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');
    const form = document.getElementById('contact-form');

    if (successMsg && submitBtn) {
        submitBtn.innerText = 'Enviando...';
        submitBtn.disabled = true;

        // Mostramos el mensaje de éxito tras un breve momento
        setTimeout(() => {
            successMsg.style.display = 'block';
            submitBtn.innerText = '¡Mensaje Enviado!';
            form.reset();
            
            // Volver al estado normal después de unos segundos
            setTimeout(() => {
                successMsg.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.innerText = 'Enviar Mensaje';
            }, 5000);
        }, 1000);
    }
}
