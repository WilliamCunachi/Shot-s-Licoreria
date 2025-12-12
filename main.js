// Shot's Licorería - Main JavaScript File

// Initialize all animations and interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initScrollReveal();
    initMobileMenu();
    initProductAnimations();
    initParticleSystem();
    initSmoothScrolling();
});

// Typewriter effect for hero section
function initTypewriter() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Licorería Premium',
            'Excelencia en Cada Botella',
            'Experiencias Únicas',
            'Calidad Incomparable'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Add stagger delay for multiple elements
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Product card animations
function initProductAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Stagger animation on load
        anime({
            targets: card,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            delay: index * 200,
            easing: 'easeOutQuart'
        });

        // Hover animations
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Enhanced particle system
function initParticleSystem() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 6 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 4 + 4;
        const delay = Math.random() * 2;
        
        particle.style.cssText = `
            left: ${startX}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }

    // Create particles periodically
    setInterval(createParticle, 800);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-golden, button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
});

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('input[type="email"]');
    if (newsletterForm) {
        newsletterForm.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNewsletterSubscription(this.value);
            }
        });
    }

    const subscribeButton = Array
        .from(document.querySelectorAll('button'))
        .find(b => b.textContent.trim().includes('Suscribirse'));

    if (subscribeButton) {
        subscribeButton.addEventListener('click', function() {
            const email = document.querySelector('input[type="email"]').value;
            handleNewsletterSubscription(email);
        });
    }
});


function handleNewsletterSubscription(email) {
    if (!email || !isValidEmail(email)) {
        showNotification('Por favor, ingresa un correo válido', 'error');
        return;
    }
    
    // Simulate subscription
    showNotification('¡Gracias por suscribirte! Te mantendremos informado.', 'success');
    document.querySelector('input[type="email"]').value = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            anime({
                targets: this,
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutQuart'
            });
        });
        
        // Set initial opacity
        img.style.opacity = '1';
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.text-3xl.font-bold');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 40);
    });
}

// Trigger counter animation when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

// Observe stats section when it exists
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.grid.grid-cols-2');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Enhanced text animations for headings
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('h1, h2');
    
    headings.forEach(heading => {
        const text = heading.textContent;
        heading.innerHTML = text.split('').map(char => 
            char === ' ' ? ' ' : `<span style="display: inline-block;">${char}</span>`
        ).join('');
        
        const letters = heading.querySelectorAll('span');
        
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: letters,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 600,
                        delay: anime.stagger(50),
                        easing: 'easeOutQuart'
                    });
                    headingObserver.unobserve(entry.target);
                }
            });
        });
        
        headingObserver.observe(heading);
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-golden, button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);