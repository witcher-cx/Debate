// ===== CUSTOM CURSOR =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let isMoving = false;
    
    // Hide the cursor until the user actually moves the mouse
    cursorDot.style.opacity = '0';
    cursorOutline.style.opacity = '0';
    cursorDot.style.transition = 'opacity 0.3s ease';
    cursorOutline.style.transition = 'opacity 0.3s ease, width 0.2s ease, height 0.2s ease';
    
    document.addEventListener('mousemove', (e) => {
        if (!isMoving) {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            isMoving = true;
        }
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.target === '500' ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counters when in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.dataset.animated = 'true';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ===== AOS (ANIMATE ON SCROLL) =====
const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('[data-aos]').forEach(element => {
    aosObserver.observe(element);
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
});

// ===== SMOOTH SCROLL =====
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

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert("Thanks for subscribing! We'll keep you updated.");
        newsletterForm.reset();
    });
}

// ===== HOVER EFFECTS FOR BUTTONS =====
document.querySelectorAll('.btn, .event-card, .feature-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== CURSOR INTERACTIONS =====
const interactiveElements = document.querySelectorAll('a, button, .event-card, .feature-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        if (cursorOutline) {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        if (cursorOutline) {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
        }
    });
});

// ===== GRADIENT ORB MOUSE FOLLOW =====
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 30;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== PERFORMANCE OPTIMIZATIONS =====
if (window.innerWidth < 768) {
    document.querySelectorAll('.gradient-orb').forEach(orb => {
        orb.style.animation = 'none';
    });
}

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===== SIMPLE PRELOADER & PAGE TRANSITION LOGIC =====
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('simple-preloader');
    
    if (preloader) {
        // Check if the user has already loaded the site in this session
        if (!sessionStorage.getItem('siteLoaded')) {
            // FIRST TIME: Show the cool spinning logo, then fade out
            setTimeout(() => {
                preloader.classList.add('hidden');
                sessionStorage.setItem('siteLoaded', 'true');
            }, 1000); // Wait 1 second before hiding
        } else {
            // ALREADY LOADED: Hide the loader instantly, skip straight to the page transition
            preloader.style.display = 'none';
        }
    }
});

// Intercept link clicks to trigger the quick smooth exit transition
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = this.getAttribute('href');
        
        // Only trigger transition for internal links, not empty hash links or new tabs
        if (target && !target.startsWith('#') && !target.startsWith('http') && this.getAttribute('target') !== '_blank') {
            e.preventDefault();
            
            // Add quick exit animation to the body
            document.body.classList.add('page-exit');
            
            // Navigate quickly after the short transition (250ms matches the CSS)
            setTimeout(() => {
                window.location.href = target;
            }, 250); 
        }
    });
});

console.log('🚀 MGBSDC Website Loaded Successfully!');