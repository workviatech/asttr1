// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('show');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('show');
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.querySelectorAll('.dropdown.open').forEach(dropdown => dropdown.classList.remove('open'));
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.querySelectorAll('.dropdown.open').forEach(dropdown => dropdown.classList.remove('open'));
    });
});

// Dropdown toggle on mobile (for Services menu)
const dropdownLinks = document.querySelectorAll('.dropdown > a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();
            const parentDropdown = link.parentElement;
            const isOpen = parentDropdown.classList.contains('open');

            document.querySelectorAll('.dropdown.open').forEach(dropdown => dropdown.classList.remove('open'));

            if (!isOpen) {
                parentDropdown.classList.add('open');
            }
        }
    });
});

// Scroll to Top Button
scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#services') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for Fade-in Animations
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

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .deity-card, .feature-box, .testimonial-card, .zodiac-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const consultationForm = document.getElementById('consultationForm');
if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            dob: document.getElementById('dob').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[0-9]{10,}$/;
        if (!phoneRegex.test(formData.phone.replace(/[\s-]/g, ''))) {
            alert('Please enter a valid phone number (at least 10 digits).');
            return;
        }

        // Create WhatsApp message
        const whatsappMessage = `
*New Consultation Request*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Date of Birth:* ${formData.dob || 'Not provided'}
*Service:* ${formData.service}
*Message:* ${formData.message}
        `.trim();

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/919014056713?text=${encodedMessage}`;

        // Show success message
        alert('Thank you for your consultation request! You will be redirected to WhatsApp to complete your booking.');
        
        // Redirect to WhatsApp
        window.open(whatsappURL, '_blank');

        // Reset form
        consultationForm.reset();
    });
}

// Zodiac Card Click Handler
const zodiacCards = document.querySelectorAll('.zodiac-card');
zodiacCards.forEach(card => {
    card.addEventListener('click', () => {
        const zodiacName = card.querySelector('h4').textContent;
        alert(`For detailed ${zodiacName} horoscope, please book a consultation by calling 09014056713 or visit our contact page.`);
    });
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-zodiac');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect sound (optional - requires sound files)
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Animate numbers (for stats if added)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Current year for footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// Add active state to current page in navigation
const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navMenuLinks = document.querySelectorAll('.nav-menu a');
navMenuLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentLocation) {
        link.classList.add('active');
    }
});

// Testimonial Slider (if multiple testimonials)
let testimonialIndex = 0;
function rotateTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length > 3) {
        testimonials.forEach((card, index) => {
            card.style.display = 'none';
            if (index >= testimonialIndex && index < testimonialIndex + 3) {
                card.style.display = 'block';
            }
        });
        testimonialIndex = (testimonialIndex + 1) % (testimonials.length - 2);
    }
}

// Auto-rotate testimonials every 5 seconds
if (document.querySelectorAll('.testimonial-card').length > 3) {
    setInterval(rotateTestimonials, 5000);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Print functionality for service pages
function printPage() {
    window.print();
}

// Share functionality
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        whatsapp: `https://wa.me/?text=${title}%20${url}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Add to calendar functionality
function addToCalendar() {
    alert('To book a consultation, please call 09014056713 or use the contact form.');
}

// Lazy loading for images (modern browsers)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset && img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    // Fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

console.log('Astrologer T R Shashtri Website - Loaded Successfully');
console.log('For consultations, call: 09014056713');
