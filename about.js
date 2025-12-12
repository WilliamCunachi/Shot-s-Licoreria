// Shot's Licorería - About Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initScrollReveal();
    initImageAnimations();
});

/* -----------------------------
    MOBILE MENU
-------------------------------- */
function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");

    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");

        anime({
            targets: "#mobile-menu",
            opacity: [0, 1],
            duration: 300,
            easing: "easeOutQuad"
        });
    });
}

/* -----------------------------
   SCROLL REVEAL
-------------------------------- */
function initScrollReveal() {
    const elements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                }
            });
        },
        { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
}

/* -----------------------------
    IMAGE FADE-IN (anime.js)
-------------------------------- */
function initImageAnimations() {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
        img.style.opacity = 1;

        img.addEventListener("load", () => {
            anime({
                targets: img,
                opacity: [0, 1],
                duration: 800,
                easing: "easeOutQuad"
            });
        });
    });
}
