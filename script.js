// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
        
        // Close other open FAQs when opening a new one
        if (item.classList.contains('active')) {
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update current year in footer
const currentYear = document.getElementById('current-year');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(5px)';
    } else {
        header.style.padding = '20px 0';
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('button[type="submit"]');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic email validation
        const email = contactForm.querySelector('input[type="email"]').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const formData = new FormData(contactForm);
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
            } else {
                alert('There was an error submitting the form. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Request Consultation';
        }
    });
}

// Animation on scroll
function checkScroll() {
    const elements = document.querySelectorAll('.course-card, .pricing-card, .testimonial-card, .bundle-card, .section-header');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements with opacity 0 for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.course-card, .pricing-card, .testimonial-card, .bundle-card, .section-header');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check scroll position on load in case elements are already visible
    checkScroll();
});

window.addEventListener('scroll', checkScroll);

// Create grid animation
function createGridAnimation() {
  const grid = document.createElement('div');
  grid.className = 'grid-animation';
  
  // Create horizontal lines
  for (let i = 0; i < 20; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line horizontal';
    line.style.top = `${i * 10}%`;
    line.style.animationDelay = `${i * 0.5}s`;
    grid.appendChild(line);
  }
  
  // Create vertical lines
  for (let i = 0; i < 20; i++) {
    const line = document.createElement('div');
    line.className = 'grid-line vertical';
    line.style.left = `${i * 5}%`;
    line.style.animationDelay = `${i * 0.3}s`;
    grid.appendChild(line);
  }
  
  document.querySelector('.hero').prepend(grid);
}

createGridAnimation();

// Payment Modal Functionality
const paymentModal = document.getElementById('paymentModal');
const closeModalBtn = document.querySelector('.close-modal');
const planOptions = document.querySelectorAll('.plan-option');
const selectedPlanElement = document.getElementById('selectedPlan');
const selectedPriceElement = document.getElementById('selectedPrice');
const totalPriceElement = document.getElementById('totalPrice');
const submitPaymentBtn = document.getElementById('submitPayment');

// Open payment modal when clicking enroll buttons
document.querySelectorAll('a[href="payment.html"], .pricing-card .cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        paymentModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close when clicking on backdrop
paymentModal.addEventListener('click', (e) => {
    if (e.target === paymentModal || e.target === document.querySelector('.payment-modal-backdrop')) {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Plan selection functionality
planOptions.forEach(option => {
    option.addEventListener('click', () => {
        const planName = option.dataset.plan;
        const planPrice = option.dataset.price;
        
        // Update selected plan display
        selectedPlanElement.textContent = planName.charAt(0).toUpperCase() + planName.slice(1);
        selectedPriceElement.textContent = `₹${parseInt(planPrice).toLocaleString('en-IN')}/month`;
        totalPriceElement.textContent = `₹${parseInt(planPrice).toLocaleString('en-IN')}`;
        
        // Update payment button
        submitPaymentBtn.textContent = `Pay ₹${parseInt(planPrice).toLocaleString('en-IN')}`;
    });
});

// Form validation and submission
submitPaymentBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Basic validation
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
        alert('Please fill in all payment details');
        return;
    }
    
    // Simple card number validation
    if (cardNumber.replace(/\s/g, '').length !== 16 || isNaN(cardNumber.replace(/\s/g, ''))) {
        alert('Please enter a valid 16-digit card number');
        return;
    }
    
    // Simple CVV validation
    if (cvv.length !== 3 || isNaN(cvv)) {
        alert('Please enter a valid 3-digit CVV');
        return;
    }
    
    // Process payment (in a real app, this would connect to a payment processor)
    submitPaymentBtn.disabled = true;
    submitPaymentBtn.textContent = 'Processing...';
    
    // Simulate payment processing
    setTimeout(() => {
        alert('Payment successful! Thank you for your enrollment.');
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        submitPaymentBtn.disabled = false;
        submitPaymentBtn.textContent = `Pay ₹${document.querySelector('.plan-option input[type="radio"]:checked').parentElement.dataset.price}`;
    }, 2000);
});

// Format card number input
document.getElementById('cardNumber').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '')
                           .replace(/(\d{4})(?=\d)/g, '$1 ');
});

// Format expiry date input
document.getElementById('expiryDate').addEventListener('input', function(e) {
    this.value = this.value.replace(/\D/g, '')
                           .replace(/(\d{2})(?=\d)/g, '$1/')
                           .substring(0, 5);
});
