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
const paymentCloseModalBtns = paymentModal.querySelectorAll('.close-modal');
const planOptions = document.querySelectorAll('.plan-option');
const selectedPlanElement = document.getElementById('selectedPlan');
const selectedPriceElement = document.getElementById('selectedPrice');
const totalPriceElement = document.getElementById('totalPrice');
const submitPaymentBtn = document.getElementById('submitPayment');

// Open payment modal when clicking enroll buttons
document.querySelectorAll('.payment-button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        enrollmentModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Reset to first step
        setActiveStep(1);
    });
});

// Close payment modal
paymentCloseModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        paymentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
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

// Registration Modal Functionality
const registrationModal = document.getElementById('registrationModal');
const registrationCloseModalBtns = registrationModal.querySelectorAll('.close-modal');
const registrationForm = document.getElementById('registrationForm');
const courseTitleElement = document.getElementById('courseTitle');
const selectedCourseElement = document.getElementById('selectedCourse');
const registerButtons = document.querySelectorAll('.register-course');

// Open registration modal when clicking register buttons
registerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Only proceed if this is a register button, not enroll button
        if (!button.classList.contains('payment-button')) {
            const courseName = button.dataset.course;
            courseTitleElement.textContent = courseName;
            selectedCourseElement.value = courseName;
            registrationModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
}); 

// Close registration modal
registrationCloseModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        registrationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close when clicking on backdrop
registrationModal.addEventListener('click', (e) => {
    if (e.target === registrationModal || e.target === document.querySelector('.registration-modal-backdrop')) {
        registrationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission handling
if (registrationForm) {
    const submitButton = registrationForm.querySelector('button[type="submit"]');
    
    registrationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Basic email validation
        const email = registrationForm.querySelector('input[type="email"]').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const formData = new FormData(registrationForm);
        try {
            const response = await fetch(registrationForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('Thank you for your registration! We will contact you soon.');
                registrationForm.reset();
                registrationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else {
                alert('There was an error submitting the form. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Registration';
        }
    });
}
// Enrollment Flow Functionality
const enrollmentModal = document.getElementById('enrollmentModal');
const enrollmentCloseModalBtns = enrollmentModal.querySelectorAll('.close-modal');
const enrollButtons = document.querySelectorAll('.payment-button');
const enrollmentSteps = document.querySelectorAll('.enrollment-step');
const nextStepButtons = document.querySelectorAll('.next-step');
const prevStepButtons = document.querySelectorAll('.prev-step');
const proceedPaymentButton = document.querySelector('.proceed-payment');
const courseOptions = document.querySelectorAll('.course-option');
const billingOptions = document.querySelectorAll('.billing-option');
const summaryCourse = document.getElementById('summary-course');
const summaryPlan = document.getElementById('summary-plan');
const summaryTotal = document.getElementById('summary-total');

// Open enrollment modal when clicking enroll buttons
enrollButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        enrollmentModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Reset to first step
        setActiveStep(1);
    });
});

// Close enrollment modal
enrollmentCloseModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Only close the enrollment modal, don't open registration
        enrollmentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Prevent event bubbling that might trigger other modals
        e.stopPropagation();
    });
});

// Close when clicking on backdrop
enrollmentModal.addEventListener('click', (e) => {
    if (e.target === enrollmentModal || e.target === document.querySelector('.enrollment-modal-backdrop')) {
        enrollmentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Navigation between steps
nextStepButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = document.querySelector('.enrollment-step.active');
        const nextStep = parseInt(currentStep.dataset.step) + 1;
        setActiveStep(nextStep);
        
        // Update summary if going to final step
        if (nextStep === 3) {
            updateSummary();
        }
    });
});

prevStepButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = document.querySelector('.enrollment-step.active');
        const prevStep = parseInt(currentStep.dataset.step) - 1;
        setActiveStep(prevStep);
    });
});

// Proceed to payment
proceedPaymentButton.addEventListener('click', () => {
    enrollmentModal.style.display = 'none';
    paymentModal.style.display = 'flex';
    
    // Set the selected plan in payment modal based on enrollment selections
    const selectedBilling = document.querySelector('.billing-option input[type="radio"]:checked').parentElement.dataset.plan;
    let plan, price;
    
    switch(selectedBilling) {
        case 'monthly':
            plan = 'starter';
            price = '1999';
            break;
        case 'quarterly':
            plan = 'professional';
            price = '3999';
            break;
        case 'annual':
            plan = 'enterprise';
            price = '5999';
            break;
    }
    
    // Update payment modal with selected plan
    document.getElementById(`plan-${plan}`).checked = true;
    selectedPlanElement.textContent = plan.charAt(0).toUpperCase() + plan.slice(1);
    selectedPriceElement.textContent = `₹${parseInt(price).toLocaleString('en-IN')}/month`;
    totalPriceElement.textContent = `₹${parseInt(price).toLocaleString('en-IN')}`;
    submitPaymentBtn.textContent = `Pay ₹${parseInt(price).toLocaleString('en-IN')}`;
});

// Helper function to set active step
function setActiveStep(stepNumber) {
    enrollmentSteps.forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.step) === stepNumber) {
            step.classList.add('active');
        }
    });
}

// Update summary information
function updateSummary() {
    const selectedCourse = document.querySelector('.course-option input[type="radio"]:checked').parentElement.querySelector('.course-name').textContent;
    const selectedBilling = document.querySelector('.billing-option input[type="radio"]:checked').parentElement.querySelector('.plan-name').textContent;
    const selectedPrice = document.querySelector('.billing-option input[type="radio"]:checked').parentElement.querySelector('.plan-price').textContent;
    
    summaryCourse.textContent = selectedCourse;
    summaryPlan.textContent = selectedBilling;
    summaryTotal.textContent = selectedPrice;
}