// Product Filter System for Shot's Licorería

class ProductFilter {
    constructor() {
        this.products = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.collectProducts();
        this.bindEvents();
        this.initScrollReveal();
    }

    collectProducts() {
        // Collect all product cards from the DOM
        this.products = Array.from(document.querySelectorAll('.product-card')).map(card => ({
            element: card,
            category: card.dataset.category,
            name: card.dataset.name.toLowerCase(),
            isVisible: true
        }));
    }

    bindEvents() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('.product-card button');
        addToCartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleAddToCart(e.target);
            });
        });
    }

    handleFilterClick(button) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Update current filter
        this.currentFilter = button.dataset.filter;
        this.applyFilters();
    }

    handleSearch(searchTerm) {
        this.searchTerm = searchTerm.toLowerCase();
        this.applyFilters();
    }

    applyFilters() {
        let visibleCount = 0;

        this.products.forEach(product => {
            const matchesCategory = this.currentFilter === 'all' || product.category === this.currentFilter;
            const matchesSearch = this.searchTerm === '' || product.name.includes(this.searchTerm);
            
            const shouldShow = matchesCategory && matchesSearch;
            
            if (shouldShow) {
                this.showProduct(product.element);
                visibleCount++;
            } else {
                this.hideProduct(product.element);
            }
        });

        // Show/hide no results message
        this.toggleNoResults(visibleCount === 0);
    }

    showProduct(element) {
        if (!element.classList.contains('visible')) {
            element.classList.add('visible');
            element.style.display = 'block';
            
            // Animate in
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.9, 1],
                duration: 400,
                easing: 'easeOutQuart'
            });
        }
    }

    hideProduct(element) {
        if (element.classList.contains('visible')) {
            // Animate out
            anime({
                targets: element,
                opacity: [1, 0],
                translateY: [0, -20],
                scale: [1, 0.9],
                duration: 300,
                easing: 'easeInQuart',
                complete: () => {
                    element.style.display = 'none';
                    element.classList.remove('visible');
                }
            });
        } else {
            element.style.display = 'none';
        }
    }

    toggleNoResults(show) {
        const noResults = document.getElementById('no-results');
        if (noResults) {
            if (show) {
                noResults.classList.remove('hidden');
                anime({
                    targets: noResults,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 400,
                    easing: 'easeOutQuart'
                });
            } else {
                anime({
                    targets: noResults,
                    opacity: [1, 0],
                    translateY: [0, -20],
                    duration: 300,
                    easing: 'easeInQuart',
                    complete: () => {
                        noResults.classList.add('hidden');
                    }
                });
            }
        }
    }

    handleAddToCart(button) {
        // Get product info
        const card = button.closest('.product-card');
        const productName = card.querySelector('h3').textContent;
        const productPrice = card.querySelector('.text-3xl').textContent;
        
        // Animate button
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuart'
        });

        // Change button text temporarily
        const originalText = button.textContent;
        button.textContent = '¡Agregado!';
        button.style.background = '#10B981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);

        // Show notification
        this.showNotification(`${productName} (${productPrice}) agregado al carrito`, 'success');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
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

// Enhanced filter button animations
function enhanceFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
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
}

// Search input enhancements
function enhanceSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let searchTimeout;
    
    searchInput.addEventListener('focus', function() {
        anime({
            targets: this,
            scale: 1.02,
            duration: 200,
            easing: 'easeOutQuart'
        });
    });

    searchInput.addEventListener('blur', function() {
        anime({
            targets: this,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuart'
        });
    });

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        // Add loading indicator
        this.style.background = 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%)';
        this.style.backgroundSize = '200% 100%';
        this.style.animation = 'loading 1s infinite';
        
        searchTimeout = setTimeout(() => {
            this.style.background = '';
            this.style.animation = '';
        }, 300);
    });
}

// Add loading animation CSS
function addLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
}

// Product hover effects
function addProductHoverEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const img = card.querySelector('img');
        const button = card.querySelector('button');
        
        card.addEventListener('mouseenter', function() {
            // Image zoom effect
            anime({
                targets: img,
                scale: 1.1,
                duration: 400,
                easing: 'easeOutQuart'
            });
            
            // Button highlight
            anime({
                targets: button,
                backgroundColor: '#D4AF37',
                duration: 300,
                easing: 'easeOutQuart'
            });
        });

        card.addEventListener('mouseleave', function() {
            // Reset image
            anime({
                targets: img,
                scale: 1,
                duration: 400,
                easing: 'easeOutQuart'
            });
            
            // Reset button
            anime({
                targets: button,
                backgroundColor: '#1F2937',
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
}

// Statistics tracking
function trackProductStats() {
    let stats = {
        totalProducts: 0,
        visibleProducts: 0,
        filterUsage: {},
        searchQueries: []
    };

    // Update stats when filters change
    const originalApplyFilters = ProductFilter.prototype.applyFilters;
    ProductFilter.prototype.applyFilters = function() {
        originalApplyFilters.call(this);
        
        stats.totalProducts = this.products.length;
        stats.visibleProducts = this.products.filter(p => p.isVisible).length;
        stats.filterUsage[this.currentFilter] = (stats.filterUsage[this.currentFilter] || 0) + 1;
        
        if (this.searchTerm) {
            stats.searchQueries.push(this.searchTerm);
        }
        
        // Log stats (in real app, send to analytics)
        console.log('Product Stats:', stats);
    };
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main filter system
    const productFilter = new ProductFilter();
    
    // Enhancements
    enhanceFilterButtons();
    enhanceSearchInput();
    addLoadingAnimation();
    addProductHoverEffects();
    trackProductStats();
    
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
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductFilter;
}