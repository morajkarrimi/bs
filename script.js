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
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.style.display = 'flex';
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Update active class
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Back to top button click
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