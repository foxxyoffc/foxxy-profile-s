// Smooth page load and loading animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingWrapper = document.getElementById('loadingWrapper');
    const contentWrapper = document.getElementById('contentWrapper');

    // Hide loading after 2 seconds
    setTimeout(() => {
        loadingWrapper.style.display = 'none';
    }, 2000);

    // Initialize
    initializeButtonAnimations();
    initializeScrollAnimations();
    initializeSmoothScroll();
});

// Button Animations and Interactions
function initializeButtonAnimations() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        // Hover effect
        button.addEventListener('mouseenter', function(e) {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
        });

        // Click animation
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });

        // Smooth transition on mouse move
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// Ripple effect on button click
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
    `;
    
    if (!document.querySelector('style[data-ripple]')) {
        style.setAttribute('data-ripple', 'true');
        document.head.appendChild(style);
    }

    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Smooth Scroll Animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all button wrappers
    document.querySelectorAll('.button-wrapper').forEach(wrapper => {
        observer.observe(wrapper);
    });
}

// Smooth Scroll Behavior
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// Dynamic video background responsiveness
function setupVideoBackground() {
    const video = document.querySelector('.background-video');
    const videoContainer = document.querySelector('.video-container');

    if (!video) return;

    function adjustVideo() {
        const containerWidth = videoContainer.offsetWidth;
        const containerHeight = videoContainer.offsetHeight;
        const videoAspectRatio = video.videoWidth / video.videoHeight;
        const containerAspectRatio = containerWidth / containerHeight;

        if (containerAspectRatio > videoAspectRatio) {
            video.style.width = '100%';
            video.style.height = 'auto';
        } else {
            video.style.width = 'auto';
            video.style.height = '100%';
        }
    }

    // Adjust on load and resize
    if (video.readyState >= 1) {
        adjustVideo();
    } else {
        video.addEventListener('loadedmetadata', adjustVideo);
    }

    window.addEventListener('resize', adjustVideo);
}

// Enhanced button hover effects
function enhanceButtonEffects() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        const light = button.querySelector('.button-light');
        
        button.addEventListener('mouseenter', function() {
            if (light) {
                light.style.animation = 'light-sweep 1.5s ease-in-out infinite';
            }
        });

        button.addEventListener('mouseleave', function() {
            if (light) {
                light.style.animation = 'light-sweep 3s ease-in-out infinite';
            }
        });
    });
}

// Parallax effect for profile section (subtle)
function initializeParallaxEffect() {
    const profileSection = document.querySelector('.profile-section');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (profileSection) {
            profileSection.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
}

// Performance: Lazy load buttons
function lazyLoadButtons() {
    const buttons = document.querySelectorAll('.button');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    });

    buttons.forEach(button => {
        button.style.opacity = '0';
        observer.observe(button);
    });
}

// Touch support for mobile
function setupMobileSupport() {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize all on load
window.addEventListener('load', function() {
    setupVideoBackground();
    enhanceButtonEffects();
    initializeParallaxEffect();
    lazyLoadButtons();
    setupMobileSupport();
});

// Handle visibility changes
document.addEventListener('visibilitychange', function() {
    const video = document.querySelector('.background-video');
    if (document.hidden) {
        if (video) video.pause();
    } else {
        if (video) video.play();
    }
});

// Prevent layout shift
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

// Smooth page transition on back/forward
window.addEventListener('pageshow', function() {
    const contentWrapper = document.getElementById('contentWrapper');
    if (contentWrapper) {
        contentWrapper.style.animation = 'fadeInContent 0.6s ease-out forwards';
    }
});

window.addEventListener('pagehide', function() {
    const contentWrapper = document.getElementById('contentWrapper');
    if (contentWrapper) {
        contentWrapper.style.animation = 'fadeOutContent 0.6s ease-out forwards';
    }
});

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutContent {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(style);
