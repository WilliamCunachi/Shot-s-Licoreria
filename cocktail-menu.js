// Cocktail Menu Interactive System for Shot's Licorería

class CocktailMenu {
    constructor() {
        this.currentFilter = 'all';
        this.cocktails = [];
        this.init();
    }

    init() {
        this.collectCocktails();
        this.bindEvents();
        this.initScrollReveal();
        this.addHoverEffects();
    }

    collectCocktails() {
        this.cocktails = Array.from(document.querySelectorAll('.cocktail-card')).map(card => ({
            element: card,
            category: card.dataset.category,
            isFlipped: false
        }));
    }

    bindEvents() {
        // Category filter buttons
        const filterButtons = document.querySelectorAll('.category-filter');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // Cocktail card flip events
        this.cocktails.forEach(cocktail => {
            cocktail.element.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    this.flipCard(cocktail);
                }
            });
        });

        // Tutorial buttons
        const tutorialButtons = document.querySelectorAll('.cocktail-card-back button');
        tutorialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showTutorial(e.target);
            });
        });
    }

    handleFilterClick(button) {
        // Update active button
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Update current filter
        this.currentFilter = button.dataset.category;
        this.applyFilter();
    }

    applyFilter() {
        this.cocktails.forEach((cocktail, index) => {
            const shouldShow = this.currentFilter === 'all' || cocktail.category === this.currentFilter;
            
            if (shouldShow) {
                this.showCocktail(cocktail, index);
            } else {
                this.hideCocktail(cocktail);
            }
        });
    }

    showCocktail(cocktail, index) {
        cocktail.element.style.display = 'block';
        
        // Reset flip state
        if (cocktail.isFlipped) {
            cocktail.element.classList.remove('flipped');
            cocktail.isFlipped = false;
        }

        // Animate in with stagger
        anime({
            targets: cocktail.element,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.9, 1],
            duration: 500,
            delay: index * 100,
            easing: 'easeOutQuart'
        });
    }

    hideCocktail(cocktail) {
        anime({
            targets: cocktail.element,
            opacity: [1, 0],
            translateY: [0, -20],
            scale: [1, 0.9],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                cocktail.element.style.display = 'none';
            }
        });
    }

    flipCard(cocktail) {
        if (cocktail.isFlipped) {
            cocktail.element.classList.remove('flipped');
            cocktail.isFlipped = false;
            
            // Animate flip back
            anime({
                targets: cocktail.element.querySelector('.cocktail-card-inner'),
                rotateY: 0,
                duration: 600,
                easing: 'easeInOutQuart'
            });
        } else {
            cocktail.element.classList.add('flipped');
            cocktail.isFlipped = true;
            
            // Animate flip
            anime({
                targets: cocktail.element.querySelector('.cocktail-card-inner'),
                rotateY: 180,
                duration: 600,
                easing: 'easeInOutQuart'
            });

            // Animate content on back
            const backContent = cocktail.element.querySelector('.cocktail-card-back');
            const ingredients = backContent.querySelectorAll('.ingredient-tag');
            const button = backContent.querySelector('button');
            
            anime.timeline()
                .add({
                    targets: ingredients,
                    scale: [0, 1],
                    opacity: [0, 1],
                    duration: 300,
                    delay: anime.stagger(50, {start: 300}),
                    easing: 'easeOutBack'
                })
                .add({
                    targets: button,
                    translateY: [20, 0],
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeOutQuart'
                }, '-=200');
        }
    }

    showTutorial(button) {
        const cocktailName = button.closest('.cocktail-card-back').querySelector('h3').textContent;
        
        // Animate button
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuart'
        });

        // Change button text temporarily
        const originalText = button.textContent;
        button.textContent = '¡Próximamente!';
        button.style.background = '#6B7280';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);

        // Show notification
        this.showNotification(`Tutorial de ${cocktailName} estará disponible pronto`, 'info');
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

    addHoverEffects() {
        const filterButtons = document.querySelectorAll('.category-filter');
        
        filterButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    anime({
                        targets: this,
                        translateY: -2,
                        scale: 1.05,
                        duration: 200,
                        easing: 'easeOutQuart'
                    });
                }
            });

            button.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    anime({
                        targets: this,
                        translateY: 0,
                        scale: 1,
                        duration: 200,
                        easing: 'easeOutQuart'
                    });
                }
            });
        });

        // Add cocktail card hover effects
        this.cocktails.forEach(cocktail => {
            const card = cocktail.element;
            const img = card.querySelector('img');
            
            card.addEventListener('mouseenter', function() {
                if (!cocktail.isFlipped) {
                    anime({
                        targets: img,
                        scale: 1.1,
                        duration: 400,
                        easing: 'easeOutQuart'
                    });
                }
            });

            card.addEventListener('mouseleave', function() {
                if (!cocktail.isFlipped) {
                    anime({
                        targets: img,
                        scale: 1,
                        duration: 400,
                        easing: 'easeOutQuart'
                    });
                }
            });
        });
    }

    initScrollReveal() {
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
}

// Enhanced ingredient animations
function animateIngredients() {
    const ingredientTags = document.querySelectorAll('.ingredient-tag');
    
    ingredientTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.1,
                backgroundColor: '#D4AF37',
                color: '#FFFFFF',
                duration: 200,
                easing: 'easeOutQuart'
            });
        });

        tag.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                color: '#D4AF37',
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Difficulty badge animations
function animateDifficultyBadges() {
    const badges = document.querySelectorAll('.difficulty-badge');
    
    badges.forEach(badge => {
        // Pulse animation for difficulty badges
        anime({
            targets: badge,
            scale: [1, 1.05, 1],
            duration: 2000,
            loop: true,
            easing: 'easeInOutSine'
        });
    });
}

// Parallax effect for cocktail images
function addParallaxEffect() {
    const cocktailCards = document.querySelectorAll('.cocktail-card');
    
    cocktailCards.forEach(card => {
        const img = card.querySelector('img');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            if (!card.classList.contains('flipped')) {
                anime({
                    targets: img,
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('flipped')) {
                anime({
                    targets: img,
                    rotateX: 0,
                    rotateY: 0,
                    duration: 400,
                    easing: 'easeOutQuart'
                });
            }
        });
    });
}

// Keyboard navigation
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close all flipped cards
            document.querySelectorAll('.cocktail-card.flipped').forEach(card => {
                card.click();
            });
        }
        
        if (e.key === 'Enter' && e.target.closest('.cocktail-card')) {
            e.target.closest('.cocktail-card').click();
        }
    });
}

// Statistics tracking
function trackCocktailStats() {
    let stats = {
        totalViews: 0,
        categoryViews: {},
        flipInteractions: 0,
        tutorialRequests: 0
    };

    // Track card flips
    document.addEventListener('click', (e) => {
        if (e.target.closest('.cocktail-card') && !e.target.closest('button')) {
            stats.flipInteractions++;
            console.log('Cocktail Stats:', stats);
        }
    });

    // Track tutorial button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.cocktail-card-back button')) {
            stats.tutorialRequests++;
            console.log('Tutorial requested:', stats.tutorialRequests);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main cocktail menu
    const cocktailMenu = new CocktailMenu();
    
    // Enhancements
    animateIngredients();
    animateDifficultyBadges();
    addParallaxEffect();
    addKeyboardNavigation();
    trackCocktailStats();
    
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
    
    // Add touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!e.target.closest('.cocktail-card')) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = Math.abs(touchEndX - touchStartX);
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // If it's a tap (not a swipe), flip the card
        if (deltaX < 10 && deltaY < 10) {
            e.target.closest('.cocktail-card').click();
        }
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CocktailMenu;
}