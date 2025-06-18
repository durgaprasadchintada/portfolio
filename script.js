// Initialize EmailJS with your User ID
emailjs.init("nRd1THbP4cvkFKqRe");

// Typing animation
const roles = [
    "Web Developer and Designer",
    "Machine Learning Engineer",
    "Python Developer",
    "UI/UX Designer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
    const currentRole = roles[roleIndex];
    const typingElement = document.getElementById('typing-text');

    if (isDeleting) {
        // Remove characters
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        // Add characters
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    // If word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        // Pause before starting new word
        typingDelay = 500;
    }

    setTimeout(typeEffect, typingDelay);
}

// Start the typing animation when the page loads
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission handling
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');

// Add loading animation styles
const style = document.createElement('style');
style.textContent = `
    .loading {
        position: relative;
        pointer-events: none;
    }
    .loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin: -10px 0 0 -10px;
        border: 3px solid #ffffff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: button-loading-spinner 1s linear infinite;
    }
    @keyframes button-loading-spinner {
        from {
            transform: rotate(0turn);
        }
        to {
            transform: rotate(1turn);
        }
    }
`;
document.head.appendChild(style);

// Form submission handler
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Sending...';

    try {
        // Get form data
        const formData = {
            name: form.querySelector('input[name="name"]').value,
            phone: form.querySelector('input[name="phone"]').value,
            email: form.querySelector('input[name="email"]').value,
            message: form.querySelector('textarea[name="message"]').value
        };

        // Send email using EmailJS
        const response = await emailjs.send(
            "service_gdar6hn", // Service ID
            "template_x2yn5aw", // Template ID
            formData
        );

        // Show success message
        submitBtn.classList.remove('loading');
        submitBtn.textContent = '✓ Sent!';
        submitBtn.style.backgroundColor = '#2ecc71';
        
        // Reset form after success
        setTimeout(() => {
            form.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);

    } catch (error) {
        console.error('Error sending email:', error);
        
        // Show error message
        submitBtn.classList.remove('loading');
        submitBtn.textContent = '✗ Error!';
        submitBtn.style.backgroundColor = '#e74c3c';
        
        // Reset button after error
        setTimeout(() => {
            submitBtn.textContent = 'Send Message';
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Reset button handler
resetBtn.addEventListener('click', function(e) {
    e.preventDefault();
    form.reset();
});