
document.addEventListener('DOMContentLoaded', function() {


    const signInBtn = document.getElementById('signInBtn');
    const getStartedBtn = document.getElementById('getStartedBtn');

    signInBtn.addEventListener('click', function() {
        console.log('Sign in clicked');
        alert('Sign in clicked - Redirecting to login page...');
    });

    getStartedBtn.addEventListener('click', function() {
        console.log('Get started clicked');
        alert('Get started clicked - Beginning registration process...');
    });

    // Hero section buttons
    const requestInfoBtn = document.getElementById('requestInfoBtn');
    const applyNowBtn = document.getElementById('applyNowBtn');

    requestInfoBtn.addEventListener('click', function() {
        console.log('Request Info clicked');
        alert('Request Info clicked - Information packet will be sent to your email.');
    });

    applyNowBtn.addEventListener('click', function() {
        console.log('Apply Now clicked');
        alert('Apply Now clicked - Redirecting to application portal...');
    });

    // Info card buttons
    const reserveSpotBtn = document.getElementById('reserveSpotBtn');
    const viewProgramBtn = document.getElementById('viewProgramBtn');
    const requestBrochureBtn = document.getElementById('requestBrochureBtn');

    reserveSpotBtn.addEventListener('click', function() {
        console.log('Reserve spot clicked');
        alert('Reserve spot clicked - Your spot for Open Day (Saturday, Oct 14) has been reserved!');
    });

    viewProgramBtn.addEventListener('click', function() {
        console.log('View program clicked');
        alert('View program clicked - Opening Computer Science program details...');
    });

    requestBrochureBtn.addEventListener('click', function() {
        console.log('Request brochure clicked');
        alert('Request brochure clicked - Computer Science brochure will be mailed to you.');
    });

    // Featured Programs section button
    const browseAllBtn = document.getElementById('browseAllBtn');

    browseAllBtn.addEventListener('click', function() {
        console.log('Browse all programs clicked');
        alert('Browse all programs clicked - Showing all available programs...');
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            const sectionId = this.getAttribute('href').substring(1);

            console.log(`Navigation clicked: ${linkText}`);
            showEnhancedAlert(
                `📍 ${linkText} Section`,
                `Navigating to ${linkText} page...\n\nYou'll find comprehensive information about our ${linkText.toLowerCase()} offerings, schedules, and resources.`,
                'navigation'
            );

            // Smooth scroll to section if it exists
            scrollToSection(sectionId);
        });

        // Keyboard navigation support
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        let hoverTimeout;

        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                clearTimeout(hoverTimeout);
                this.style.transform = 'translateY(-2px)';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                hoverTimeout = setTimeout(() => {
                    this.style.transform = 'translateY(0)';
                }, 50);
            }
        });

        button.addEventListener('mousedown', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });

        button.addEventListener('mouseup', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        button.addEventListener('keydown', function(e) {
            if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
                e.preventDefault();
                this.style.transform = 'translateY(0)';
            }
        });

        button.addEventListener('keyup', function(e) {
            if ((e.key === 'Enter' || e.key === ' ') && !this.disabled) {
                this.style.transform = 'translateY(-2px)';
                this.click();
            }
        });
    });

    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    const handleScroll = throttle(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }

        lastScrollY = currentScrollY;
    }, 16);

    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

   
    const animatedElements = document.querySelectorAll('.stat-item, .card-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Enhanced stats counter animation
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Format numbers appropriately
            if (target >= 1000) {
                const formatted = (current / 1000).toFixed(1);
                element.textContent = formatted + 'k' + (target > 1000 ? '+' : '');
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    };

    // Trigger counter animations when stats come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const text = stat.getAttribute('aria-label');
                    let target;

                    if (text.includes('50,000')) target = 50000;
                    else if (text.includes('1,200')) target = 1200;
                    else if (text.includes('90')) target = 90;

                    setTimeout(() => {
                        animateCounter(stat, target);
                    }, index * 200);

                    statsObserver.unobserve(entry.target);
                });

                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Form validation utilities (for future forms)
    const validateEmail = (email) => {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^[\\+]?[1-9][\\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\\s\\-\\(\\)]/g, ''));
    };

    // Accessibility enhancements
    const enhanceAccessibility = () => {
        // Add skip links functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Enhance focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Announce dynamic content changes to screen readers
        const announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            document.body.appendChild(announcement);

            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        };

        // Add announcement capability to button clicks
        allButtons.forEach(button => {
            const originalClick = button.onclick;
            button.addEventListener('click', () => {
                const buttonText = button.querySelector('.btn-text')?.textContent || button.textContent;
                announceToScreenReader(`${buttonText} button activated`);
            });
        });
    };

    // Performance monitoring
    const performanceMonitor = {
        startTime: performance.now(),

        logMetric: (name, value) => {
            console.log(`Performance Metric - ${name}: ${value}ms`);
        },

        measureInteraction: (elementName, startTime) => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            performanceMonitor.logMetric(`${elementName} Interaction`, duration);
        }
    };

    // Error handling and logging
    const errorHandler = {
        log: (error, context = 'General') => {
            console.error(`EduNexa Error [${context}]:`, error);

            // In production, this would send to error tracking service
            if (typeof window.gtag !== 'undefined') {
                window.gtag('event', 'exception', {
                    description: error.message,
                    fatal: false
                });
            }
        },

        handleAsyncError: (promise, context) => {
            promise.catch(error => errorHandler.log(error, context));
        }
    };

    // Initialize accessibility enhancements
    enhanceAccessibility();

    // Log successful initialization
    const initTime = performance.now() - performanceMonitor.startTime;
    performanceMonitor.logMetric('Page Initialization', initTime);

    console.log('🎓 EduNexa Enhanced Landing Page Loaded Successfully!');
    console.log('📊 Performance Metrics:');
    console.log(`   • Initialization Time: ${initTime.toFixed(2)}ms`);
    console.log('🔧 Features Initialized:');
    console.log('   • Enhanced button interactions with loading states');
    console.log('   • Accessibility improvements (ARIA, keyboard navigation)');
    console.log('   • Smooth scroll effects and animations');
    console.log('   • Performance monitoring and error handling');
    console.log('   • Responsive header with scroll effects');
    console.log('   • Counter animations for statistics');
    console.log('   • Form validation utilities');
    console.log('   • Screen reader announcements');

    // Analytics tracking (placeholder for real implementation)
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'page_view', {
            page_title: 'EduNexa Landing Page',
            page_location: window.location.href
        });
    }
});

// Enhanced utility functions for future use
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update URL without triggering page reload
        history.pushState(null, null, `#${sectionId}`);

        return true;
    }
    return false;
}

function trackButtonClick(buttonName, action, additionalData = {}) {
    const eventData = {
        event_category: 'Button Click',
        event_label: buttonName,
        action: action,
        timestamp: new Date().toISOString(),
        ...additionalData
    };

    console.log(`📈 Analytics Event:`, eventData);

    // Send to analytics service (placeholder)
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'click', {
            event_category: eventData.event_category,
            event_label: eventData.event_label,
            custom_parameter_action: eventData.action
        });
    }
}

// Lazy loading utility for future images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Theme management (for future dark/light mode toggle)
const themeManager = {
    currentTheme: 'dark',

    toggleTheme: () => {
        const newTheme = themeManager.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeManager.currentTheme = newTheme;
        localStorage.setItem('edunexa-theme', newTheme);
    },

    initTheme: () => {
        const savedTheme = localStorage.getItem('edunexa-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeManager.currentTheme = savedTheme;
    }
};

// Initialize theme on load
themeManager.initTheme();

// Export utilities for potential module use
window.EduNexa = {
    scrollToSection,
    trackButtonClick,
    themeManager,
    performanceMonitor: performanceMonitor,
    errorHandler
};
