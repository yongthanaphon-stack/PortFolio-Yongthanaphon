// ====================================
// Navigation & Mobile Menu
// ====================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ====================================
// Active Navigation Link on Scroll
// ====================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ====================================
// Scroll Animation - Fade in on scroll
// ====================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add scroll animations to skill cards and portfolio cards
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const aboutContent = document.querySelector('.about-content');

    skillCards.forEach(card => {
        card.classList.add('scroll-animation');
        observer.observe(card);
    });

    portfolioCards.forEach(card => {
        card.classList.add('scroll-animation');
        observer.observe(card);
    });

    if (aboutContent) {
        aboutContent.classList.add('scroll-animation');
        observer.observe(aboutContent);
    }
});

// ====================================
// Smooth Scroll for Buttons
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// Navbar Shadow on Scroll
// ====================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(44, 44, 44, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(44, 44, 44, 0.08)';
    }
});

// ====================================
// Contact Form Handling
// ====================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(this);
        
        // Simple validation
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate server response
        setTimeout(() => {
            showNotification('Message sent successfully! 🎉', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// ====================================
// Utility Functions
// ====================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#FFB6C1' : '#FF6B6B'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInDown 0.3s ease-out;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutUp 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ====================================
// Add Animation Styles Dynamically
// ====================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
`;
document.head.appendChild(style);

// ====================================
// View More Projects Handler
// ====================================
const viewMoreButton = document.querySelector('.btn-secondary');
if (viewMoreButton) {
    viewMoreButton.addEventListener('click', () => {
        const portfolioSection = document.getElementById('portfolio');
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ====================================
// Page Load Animation
// ====================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ====================================
// Parallax Effect on Hero Section (Optional)
// ====================================
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
        
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        }
    });
}

// ====================================
// Add touch-friendly interactions for mobile
// ====================================
if (window.matchMedia('(max-width: 768px)').matches) {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ====================================
// Performance: Lazy Loading Images
// ====================================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}