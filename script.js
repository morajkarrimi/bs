document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTopBtn = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const videoEl = document.getElementById('bg-video');
    const servicesTeaserVideoEl = document.getElementById('services-teaser-video');
    const servicesVideoEl = document.getElementById('services-video');
    const aboutVideoEl = document.getElementById('about-video');
    
    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling up
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
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
    
    // Back to top button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
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
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = menuToggle.querySelector('i');
    const body = document.body;
    
    function toggleMenu() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Toggle between bars and times icon
        if (menuIcon.classList.contains('fa-bars')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    }
    
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu when clicking a menu item
    const menuItems = document.querySelectorAll('.nav-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Prevent menu from closing when clicking inside
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        }, 250);
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
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
});

// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Active menu item highlighting
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        } else if (linkPath === '#home' && currentLocation === '/') {
            link.classList.add('active');
        }
    });
}); 