// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize mobile menu toggle
    initMobileMenu();
});

// Function to initialize animations
function initAnimations() {
    // Add animation classes to elements as they appear in viewport
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    
    // Create an observer for animation elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial state and observe each element
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// Function to initialize scroll effects
function initScrollEffects() {
    // Add sticky header effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Function to initialize mobile menu
function initMobileMenu() {
    // Create mobile menu button
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.style.display = 'none';
    
    // Add mobile menu button to nav
    nav.appendChild(mobileMenuBtn);
    
    // Add mobile menu functionality
    const navLinks = document.querySelector('.nav-links');
    
    // Show/hide mobile menu button based on screen size
    function toggleMobileMenuVisibility() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navLinks.classList.add('mobile-nav');
            navLinks.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            navLinks.classList.remove('mobile-nav');
            navLinks.style.display = 'flex';
        }
    }
    
    // Toggle mobile menu on button click
    mobileMenuBtn.addEventListener('click', function() {
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'flex';
            this.classList.add('active');
        } else {
            navLinks.style.display = 'none';
            this.classList.remove('active');
        }
    });
    
    // Initialize on load and resize
    toggleMobileMenuVisibility();
    window.addEventListener('resize', toggleMobileMenuVisibility);
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1000;
        }
        
        .mobile-menu-btn span {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px 0;
            background-color: var(--dark-text);
            transition: all 0.3s ease;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        .mobile-nav {
            position: absolute;
            top: 80px;
            right: 0;
            width: 100%;
            background-color: var(--white);
            flex-direction: column;
            padding: 20px;
            box-shadow: var(--shadow-md);
            border-radius: 0 0 var(--border-radius) var(--border-radius);
            z-index: 999;
        }
        
        .mobile-nav li {
            margin: 10px 0;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Add simple parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && scrollPosition < heroSection.offsetHeight) {
        heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
    }
});

// Add counter animation to pricing section
function animateCounters() {
    const prices = document.querySelectorAll('.price');
    
    prices.forEach(price => {
        const targetValue = parseInt(price.textContent.replace(/[^0-9]/g, ''));
        let currentValue = 0;
        const duration = 1500; // ms
        const interval = 20; // ms
        const steps = duration / interval;
        const increment = targetValue / steps;
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                price.textContent = '$' + targetValue;
                clearInterval(counter);
            } else {
                price.textContent = '$' + Math.floor(currentValue);
            }
        }, interval);
    });
}

// Initialize counter animation when pricing section is in view
const pricingSection = document.querySelector('.pricing');
if (pricingSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(pricingSection);
}

// Add color theme toggle functionality
function addColorThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    
    // Add styles for theme toggle
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: var(--white);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-md);
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: rotate(30deg);
        }
        
        .dark-theme {
            --primary-color: #8b5cf6;
            --secondary-color: #7c3aed;
            --dark-text: #f8fafc;
            --light-text: #cbd5e1;
            --white: #1e293b;
            --light-bg: #0f172a;
            --border-color: #334155;
            background-color: #0f172a;
        }
        
        .dark-theme .hero {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
        }
        
        .dark-theme .feature-card,
        .dark-theme .pricing-card,
        .dark-theme .testimonial-card,
        .dark-theme header {
            background-color: #1e293b;
        }
        
        .dark-theme .btn-secondary {
            background-color: #334155;
            color: var(--white);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(themeToggle);
    
    // Toggle dark theme
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
    });
}

// Initialize theme toggle
addColorThemeToggle();