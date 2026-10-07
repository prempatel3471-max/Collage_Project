document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Header Scroll Effect
    const header = document.getElementById("header");
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. Scroll Animations (Fade In Up)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 3. Form Handling (Simulated)
    window.handleReservation = function(e) {
        e.preventDefault();
        
        // Change button text to show processing
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = "PROCESSING...";
        btn.style.backgroundColor = "#222";
        
        setTimeout(() => {
            alert("Thank you! Your table request at Status Dine has been received. We will send a confirmation message shortly.");
            e.target.reset();
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
        }, 1200);
    };

});