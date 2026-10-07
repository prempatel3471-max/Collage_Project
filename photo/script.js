// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

// Target all hidden elements for scroll-in effect
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Form Submission Handlers
function handleReservation(e) {
    e.preventDefault();
    alert("Thank you! Your table reservation request has been received. Our team will contact you shortly to confirm availability.");
    e.target.reset();
}

function handleBanquet(e) {
    e.preventDefault();
    alert("Thank you for your interest! A banquet manager will review your venue requirements and reach out with a personalized quote.");
    e.target.reset();
}

// Cart Action Handler
function addToCart(itemName) {
    alert(`Excellent choice! ${itemName} has been added to your online order cart.`);
}

// Navbar scroll styling changes
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.padding = '0.8rem 5%';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        nav.style.padding = '1.5rem 5%';
        nav.style.boxShadow = 'none';
    }
});