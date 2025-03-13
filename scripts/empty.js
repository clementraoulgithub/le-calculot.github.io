function showElementsOnHover(carouselContainer) {
    let nextArrow = carouselContainer.querySelector('.next');
    let prevArrow = carouselContainer.querySelector('.prev');

    function checkViewport() {
        return window.innerWidth <= 768; // Détecte si on est en mode mobile
    }

    function showElements() {
        nextArrow.style.opacity = '1';
        prevArrow.style.opacity = '1';
    }

    function hideElements() {
        if (!checkViewport()) { // Seulement sur desktop
            nextArrow.style.opacity = '0';
            prevArrow.style.opacity = '0';
        }
    }

    // Toujours visible sur mobile
    if (checkViewport()) {
        showElements();
    }

    carouselContainer.addEventListener('mouseover', showElements);
    carouselContainer.addEventListener('mouseout', hideElements);
}


function createCarousel(carouselContainer) {
    const slides = carouselContainer.querySelectorAll(".slide-index");
    const prevArrow = carouselContainer.querySelector(".prev");
    const nextArrow = carouselContainer.querySelector(".next");
    const dotsContainer = carouselContainer.querySelector(".pagination-dots-index");
    let currentIndex = 0;

    // Création des bulles dynamiquement
    dotsContainer.innerHTML = ""; // Nettoie avant d'ajouter
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot-index");
        if (index === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot-index");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });

        // Mise à jour des bulles
        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        // Mise à jour de la légende
        const activeSlide = slides[index];
        const caption = activeSlide.querySelector(".carousel-caption");
        const imgType = activeSlide.querySelector("img").getAttribute("data-type");

        if (caption && imgType) {
            caption.textContent = imgType;
        }
    }

    prevArrow.addEventListener("click", (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    nextArrow.addEventListener("click", (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    // Ajouter un événement pour cliquer sur les bulles
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            showSlide(currentIndex);
        });
    });

    showSlide(currentIndex); // Initialiser l'affichage
}

// **Appliquer la fonction à tous les carousels**
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".carousel-index").forEach(carousel => {
        createCarousel(carousel);
    });
});



document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        document.body.style.visibility = "visible";
    }
});


document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".carousel-index").forEach(carousel => {
        showElementsOnHover(carousel);
    });
});