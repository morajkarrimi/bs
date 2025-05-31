document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopBtn = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;
    const body = document.body;
    const videoEl = document.getElementById('bg-video');
    const servicesTeaserVideoEl = document.getElementById('services-teaser-video');
    const servicesVideoEl = document.getElementById('services-video');
    const aboutVideoEl = document.getElementById('about-video');
    
    // Menu functionality
    let isMenuOpen = false;

    // Function to toggle menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Update aria attributes
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
        navMenu.setAttribute('aria-hidden', !isMenuOpen);
    }

    // Menu toggle click handler
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });

        // Add keyboard support
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992 && isMenuOpen) {
                toggleMenu();
            }
        }, 250);
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        if (isMenuOpen) {
            toggleMenu();
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Close menu if open
                    if (isMenuOpen) {
                        toggleMenu();
                    }
                    
                    // Scroll to target
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if (backToTopBtn) backToTopBtn.style.display = 'flex';
        } else {
            navbar.classList.remove('scrolled');
            if (backToTopBtn) backToTopBtn.style.display = 'none';
        }
    });
    
    // Active menu item highlighting
    const currentLocation = window.location.pathname;
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        } else if (linkPath === '#home' && currentLocation === '/') {
            link.classList.add('active');
        }
    });

    // Add touch feedback for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.service-card, .nav-menu a, .btn').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.opacity = '0.7';
            });
            element.addEventListener('touchend', function() {
                this.style.opacity = '1';
            });
        });
    }
    
    // Fallback for hero video background
    if (videoEl) {
        videoEl.addEventListener('error', function() {
            videoEl.style.display = 'none';
            document.querySelector('.video-container').style.backgroundImage = 'url("https://placehold.co/1920x1080")';
            document.querySelector('.video-container').style.backgroundSize = 'cover';
            document.querySelector('.video-container').style.backgroundPosition = 'center';
        });
    }
    
    // Fallback for services teaser video background
    if (servicesTeaserVideoEl) {
        servicesTeaserVideoEl.addEventListener('error', function() {
            servicesTeaserVideoEl.style.display = 'none';
            document.querySelector('.services-teaser-video-container').style.backgroundImage = 'url("https://placehold.co/1920x1080")';
            document.querySelector('.services-teaser-video-container').style.backgroundSize = 'cover';
            document.querySelector('.services-teaser-video-container').style.backgroundPosition = 'center';
        });
    }
    
    // Fallback for services video
    if (servicesVideoEl) {
        servicesVideoEl.addEventListener('error', function() {
            servicesVideoEl.style.display = 'none';
            document.querySelector('.services-video-container').style.backgroundImage = 'url("https://placehold.co/1920x1080")';
            document.querySelector('.services-video-container').style.backgroundSize = 'cover';
            document.querySelector('.services-video-container').style.backgroundPosition = 'center';
        });
    }
    
    // Fallback for about video
    if (aboutVideoEl) {
        aboutVideoEl.addEventListener('error', function() {
            aboutVideoEl.style.display = 'none';
            document.querySelector('.about-video-container').style.backgroundImage = 'url("https://placehold.co/1920x1080")';
            document.querySelector('.about-video-container').style.backgroundSize = 'cover';
            document.querySelector('.about-video-container').style.backgroundPosition = 'center';
        });
    }
    
    // Video play/pause optimization - only play videos when they are in viewport
    const videos = document.querySelectorAll('video');
    
    function handleVideoVisibility() {
        videos.forEach(video => {
            const rect = video.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if video is in viewport
            const isVisible = (
                rect.top >= -video.offsetHeight && 
                rect.top <= windowHeight
            );
            
            // Play or pause based on visibility
            if (isVisible) {
                if (video.paused) video.play();
            } else {
                if (!video.paused) video.pause();
            }
        });
    }
    
    // Check video visibility on scroll
    window.addEventListener('scroll', handleVideoVisibility);
    
    // Initial check
    handleVideoVisibility();
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .about-image, .about-content, .services-video-container, .about-video-container, .service-teaser-card, .services-teaser .section-header, .services-teaser .text-center');
    
    // Add initial styles
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Function to check if element is in viewport
    function checkVisibility() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 100); // Staggered animation
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Initial check
    checkVisibility();

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                clearError(name);
            }

            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(email);
            }

            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else {
                clearError(message);
            }

            if (isValid) {
                // In a real scenario, you would send this data to your server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Helper functions
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('error');
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}); 