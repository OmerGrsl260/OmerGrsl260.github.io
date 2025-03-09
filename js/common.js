// Gestion du scroll de la navbar
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Gestion des erreurs d'images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/img/placeholder.png';
            this.alt = 'Image non disponible';
        });
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    handleNavbarScroll();
    handleImageErrors();

    // Initialisation de AOS si présent
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        });
    }
}); 