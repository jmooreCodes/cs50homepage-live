const currentYear = new Date().getFullYear();
const copyrightText = `© ${currentYear} My Portfolio. Created for CS50x problem Set 8.`;

document.getElementById('copyright').textContent = copyrightText;

/* Allows for smooth scrolling when clicking on navigation links*/
function initSmoothScroll() {
    // Get all navigation links with hash (#) in their href
    const links = document.querySelectorAll('a[href^="#"]');

    // Add click event to each link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();

            // Get the target element from the href attribute
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" (top of page)
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            // If target element exists, scroll to it
            if (targetElement) {
                // Close mobile menu if it's open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const menuToggle = document.querySelector('.menu-toggle i');
                    if (menuToggle) {
                        menuToggle.classList.remove('fa-times');
                        menuToggle.classList.add('fa-bars');
                    }
                }

                // Calculate position to scroll to (accounting for fixed header)
                const headerOffset = 60; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Smooth scroll to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function initScrollSpy() {
    // Get all sections that correspond to menu items
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        // Get current scroll position
        let current = '';
        const scrollPosition = window.scrollY;

        // Determine which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for header
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Remove active class from all navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current navigation link
        if (current) {
            const activeLink = document.querySelector(`.nav-menu a[href="#${current}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/*Contact Form Validation and Submission */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Get form input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (validateForm(name, email, subject, message)) {
                alert('Thank you for your mesaage. This ia s demo form for cs50x.');

                contactForm.reset();
            }
        });
    }
}

function validateForm(name, email, subject, message) {
    // Reset any existing error messages
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => element.remove());

    let isValid = true;

    // Validate name
    if (name === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    }

    // Validate email
    if (email === '') {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (subject === '') {
        showError('subject', 'Please enter a subject');
        isValid = false;
    }

    // Validate message
    if (message === '') {
        showError('message', 'Please enter your message');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';

    // Insert error message after the input field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);

    // Highlight the input field
    field.style.borderColor = 'red';

    // Remove error styling when field is focused
    field.addEventListener('focus', function() {
        this.style.borderColor = '';
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//Adds animations to elements as they come into view while scrolling

function initScrollAnimations() {
    // Get all elements that should be animated
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .social-icon, #profile-photo');

    // Set initial opacity to 0 for all animated elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        element.style.transform = 'translateY(30px)';
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll event
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    handleScroll();
}


//Creates a typing animation effect for the hero section

function initTypewriter() {
    const textElement = document.querySelector('.hero-content h1');

    if (!textElement) return;

    // Store original text
    const originalText = textElement.innerHTML;

    // Clear text initially
    textElement.innerHTML = '';

    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.innerHTML = '|';
    cursorSpan.style.animation = 'blink 0.7s infinite';

    // Create style for cursor blink animation
    const style = document.createElement('style');
    style.innerHTML = '@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }';
    document.head.appendChild(style);

    // Type text character by character
    let charIndex = 0;

    function typeText() {
        // If we haven't typed all characters yet
        if (charIndex < originalText.length) {
            // Add next character
            textElement.innerHTML = originalText.substring(0, charIndex + 1);
            charIndex++;

            // Append cursor
            textElement.appendChild(cursorSpan);

            // Random delay between 50-150ms for realistic typing effect
            setTimeout(typeText, Math.random() * 100 + 50);
        } else {
            // Remove cursor after typing completes
            setTimeout(() => {
                cursorSpan.remove();
            }, 2000);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeText, 500);
}

/*wait for the DOM to fully load before executing JavaScript*/
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initScrollSpy();
    initContactForm();
    initScrollAnimations();
    initTypewriter();
});
