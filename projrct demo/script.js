document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Navbar Scroll Effect
    const header = document.getElementById("navbar");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. Menu Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // 3. Mobile Menu Toggle
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("nav-active");
    });

    // 4. Lightbox Gallery Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-grid img');

    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            lightboxImg.src = e.target.src; 
            lightbox.classList.add('active');
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightboxImg.src = "", 300); 
    };

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});