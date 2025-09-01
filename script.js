// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formObject);
        
        // Show success message (in a real app, you'd want something more user-friendly)
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Modal functionality
const modalLayer = document.getElementById('modal-layer');
const modalClose = document.getElementById('modal-close');

if (modalLayer && modalClose) {
    // Close modal when clicking close button
    modalClose.addEventListener('click', function() {
        modalLayer.setAttribute('aria-hidden', 'true');
    });
    
    // Close modal when clicking outside content
    modalLayer.addEventListener('click', function(e) {
        if (e.target === modalLayer) {
            modalLayer.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalLayer.getAttribute('aria-hidden') === 'false') {
            modalLayer.setAttribute('aria-hidden', 'true');
        }
    });
}

// Portfolio item click handlers (if you add portfolio items later)
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        // You would typically load project-specific content here
        document.getElementById('modal-content').innerHTML = `
            <h3>Project Preview</h3>
            <p>Details for ${projectId} coming soon.</p>
        `;
        modalLayer.setAttribute('aria-hidden', 'false');
    });
});

// Animation on scroll (basic implementation)
function checkScroll() {
    const elements = document.querySelectorAll('.card, .service, .steps li');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If element is in viewport
        if (position.top < window.innerHeight - 100) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.querySelectorAll('.card, .service, .steps li').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Check scroll on load and scroll
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Back to top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Style the back to top button
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #6C63FF;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = 1;
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = 0;
        backToTopButton.style.visibility = 'hidden';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add basic error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.alt = 'Image not available';
        console.log('Image failed to load:', this.src);
    });
});