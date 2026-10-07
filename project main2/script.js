// Intersection Observer for scroll animations (fade in / slide up)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

// Target all hidden elements for the scroll-in effect
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Contact & Booking Form Handler
function handleBooking(e) {
    e.preventDefault();
    alert("Thank you for reaching out to Status Dine Catering & Events. A member of our coordination team will be in touch shortly to finalize your details!");
    e.target.reset();
}

// Cart Action Handler for Menu Items
function addToCart(itemName) {
    alert(`Freshly prepared ${itemName} has been added to your catering order.`);
}

// Header styling changes on scroll (adds subtle shrink/shadow effect)
window.addEventListener('scroll', () => {
    const navContainer = document.querySelector('.nav-container');
    if (window.scrollY > 50) {
        navContainer.style.padding = '0.5rem 5%';
    } else {
        navContainer.style.padding = '1rem 5%';
    }
});