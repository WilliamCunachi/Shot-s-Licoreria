// Contact Form Handler for Shot's Licorería

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successMessage = document.getElementById('success-message');
        this.init();
    }

    init() {
        this.bindEvents();
        this.addInputAnimations();
    }

    bindEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }

        // Real-time validation
        const inputs = this.form?.querySelectorAll('input, select, textarea');
        inputs?.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    handleSubmit() {
        if (this.validateForm()) {
            this.submitForm();
        } else {
            this.showNotification('Por favor, completa todos los campos requeridos', 'error');
        }
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Este campo es obligatorio';
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Por favor, ingresa un email válido';
                isValid = false;
            }
        }

        // Phone validation (optional but if provided, should be valid)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                errorMessage = 'Por favor, ingresa un número de teléfono válido';
                isValid = false;
            }
        }

        // Name validation (no numbers or special characters)
        if (field.id === 'first-name' || field.id === 'last-name') {
            if (value && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                errorMessage = 'El nombre solo debe contener letras';
                isValid = false;
            }
        }

        // Message length validation
        if (field.id === 'message' && value.length < 10) {
            errorMessage = 'El mensaje debe tener al menos 10 caracteres';
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        // Remove existing error
        this.clearFieldError(field);

        // Add error styling
        field.classList.add('border-red-500', 'bg-red-50');
        field.classList.remove('border-gray-300');

        // Create error message element
        const errorElement = document.createElement('div');
        errorElement.className = 'text-red-500 text-sm mt-1 error-message';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);

        // Animate error
        anime({
            targets: errorElement,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 300,
            easing: 'easeOutQuart'
        });
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500', 'bg-red-50');
        field.classList.add('border-gray-300');

        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            anime({
                targets: errorElement,
                opacity: [1, 0],
                translateY: [0, -10],
                duration: 200,
                easing: 'easeInQuart',
                complete: () => {
                    errorElement.remove();
                }
            });
        }
    }

    submitForm() {
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Animate button loading state
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        submitButton.style.background = '#6B7280';

        anime({
            targets: submitButton,
            scale: [1, 0.98, 1],
            duration: 200,
            easing: 'easeInOutQuart'
        });

        // Simulate form submission
        setTimeout(() => {
            this.showSuccess();
            this.resetForm();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 2000);
    }

    showSuccess() {
        // Show success message
        this.successMessage.classList.add('show');

        // Animate form fields
        const inputs = this.form.querySelectorAll('input, select, textarea');
        anime({
            targets: inputs,
            backgroundColor: ['#ffffff', '#f0fdf4', '#ffffff'],
            duration: 1000,
            easing: 'easeInOutQuart'
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            this.successMessage.classList.remove('show');
        }, 5000);

        // Show notification
        this.showNotification('Mensaje enviado correctamente', 'success');
    }

    resetForm() {
        this.form.reset();
        
        // Clear all error states
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            this.clearFieldError(input);
        });
    }

    addInputAnimations() {
        const inputs = this.form?.querySelectorAll('input, select, textarea');
        
        inputs?.forEach(input => {
            // Focus animations
            input.addEventListener('focus', () => {
                anime({
                    targets: input,
                    scale: [1, 1.02],
                    duration: 200,
                    easing: 'easeOutQuart'
                });

                // Highlight label
                const label = input.parentNode.querySelector('label');
                if (label) {
                    anime({
                        targets: label,
                        color: ['#374151', '#D4AF37'],
                        duration: 200,
                        easing: 'easeOutQuart'
                    });
                }
            });

            // Blur animations
            input.addEventListener('blur', () => {
                anime({
                    targets: input,
                    scale: [1.02, 1],
                    duration: 200,
                    easing: 'easeOutQuart'
                });

                // Reset label color
                const label = input.parentNode.querySelector('label');
                if (label) {
                    anime({
                        targets: label,
                        color: ['#D4AF37', '#374151'],
                        duration: 200,
                        easing: 'easeOutQuart'
                    });
                }
            });

            // Input validation on the fly
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.classList.add('border-green-300', 'bg-green-50');
                    input.classList.remove('border-gray-300');
                } else {
                    input.classList.remove('border-green-300', 'bg-green-50');
                    input.classList.add('border-gray-300');
                }
            });
        });
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        const bgColor = {
            'success': 'bg-green-500',
            'error': 'bg-red-500',
            'info': 'bg-blue-500'
        }[type] || 'bg-blue-500';
        
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${bgColor} transition-all duration-300`;
        notification.textContent = message;
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Enhanced form styling and interactions
function enhanceContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Add floating labels effect
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        const label = input.parentNode.querySelector('label');
        if (label) {
            // Initial position
            if (!input.value) {
                label.style.transform = 'translateY(2.5rem) scale(1)';
                label.style.color = '#9CA3AF';
            }

            input.addEventListener('focus', () => {
                anime({
                    targets: label,
                    translateY: '0rem',
                    scale: 0.8,
                    color: '#D4AF37',
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    anime({
                        targets: label,
                        translateY: '2.5rem',
                        scale: 1,
                        color: '#9CA3AF',
                        duration: 200,
                        easing: 'easeOutQuart'
                    });
                }
            });

            // Check initial value
            if (input.value) {
                label.style.transform = 'translateY(0) scale(0.8)';
                label.style.color = '#D4AF37';
            }
        }
    });
}

// Social media hover effects
function addSocialMediaEffects() {
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.1,
                rotate: '5deg',
                duration: 200,
                easing: 'easeOutQuart'
            });
        });

        icon.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotate: '0deg',
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Contact card animations
function animateContactCards() {
    const cards = document.querySelectorAll('.contact-card');
    
    cards.forEach((card, index) => {
        // Stagger animation on load
        anime({
            targets: card,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 600,
            delay: index * 200,
            easing: 'easeOutQuart'
        });

        // Hover effects
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Map loading animation
function animateMap() {
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        anime({
            targets: mapContainer,
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 800,
            delay: 500,
            easing: 'easeOutQuart'
        });
    }
}

// Auto-resize textarea
function autoResizeTextarea() {
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    const contactForm = new ContactForm();
    
    // Enhancements
    enhanceContactForm();
    addSocialMediaEffects();
    animateContactCards();
    animateMap();
    autoResizeTextarea();
    
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
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
    
    // Scroll reveal for all elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactForm;
}