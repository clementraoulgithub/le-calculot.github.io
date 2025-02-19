const reviewsContainer = document.getElementById("reviews");

let currentReviewIndex = 0;
let currentListingIndex = 0;

const reviewsPerPage = 2;
const intervalTime = 100000000000000;

let isMobile = window.innerWidth <= 768;

const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prevArrow");
const nextButton = document.getElementById("nextArrow");
let currentIndex = 0;

const reviews = [
    { 
        name: "Clément", 
        text: "Un vrai coin de paradis au Barcarès. Calme, propre et idéal pour se ressourcer.", 
        img: "image/av1-image/clement-raoul.webp", 
        rating: 5
    },
    { 
        name: "Quentin", 
        text: "Une marina magnifique avec une superbe vue sur les bateaux. Ambiance très apaisante", 
        img: "image/av2-image/quentin-raoul.webp", 
        rating: 5
    }
];




function generateStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function displayReviews() {
    // Clear previous reviews
    reviewsContainer.innerHTML = "";

    const map = document.createElement("div");
    map.classList.add("map");
    map.innerHTML = `<img src="image/la-marina-image/map-image/map.jpg" alt="Carte Barcares"/>`;
    reviewsContainer.appendChild(map);

    const button = document.createElement("button");
    button.textContent = "Réserver";
    button.classList.add("reservation-button");
    const linkButton = document.createElement("a");
    linkButton.href = "https://www.leboncoin.fr/ad/locations_saisonnieres/2231552985";
    linkButton.appendChild(button);
    reviewsContainer.appendChild(linkButton);


    const link_container = document.createElement("div");
    link_container.classList.add("link-container");
    reviewsContainer.appendChild(link_container);


    const link = document.createElement("a");
    link.classList.add("black");
    link.href = ""
    link.textContent = "5 ★ - Voir tous les avis";
    link_container.appendChild(link);

    // Select 3 reviews to display
    for (let i = 0; i < reviewsPerPage; i++) {
        const review = reviews[(currentReviewIndex + i) % reviews.length]; // Loop through reviews
        const card = document.createElement("div");
        card.classList.add("review-card");
        card.innerHTML = `
            <div class="review-header">
                <img src="${review.img}" alt="Avatar">
                <div class="review-name">${review.name}</div>
                <div class="stars">${generateStars(review.rating)}</div>
            </div>
            <p class="review-text">${review.text}</p>
        `;
        reviewsContainer.appendChild(card);

        // Add a fade-in effect with delay
        setTimeout(() => card.classList.add("visible"), i * 300);
    }

    // Update index for the next display
    currentReviewIndex = (currentReviewIndex + reviewsPerPage) % reviews.length;
}

function createLightbox() {
    if (isMobile) {
        return
    }
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const prevLightbox = document.getElementById("prevLightbox");
    const nextLightbox = document.getElementById("nextLightbox");
    const counter = document.getElementById("lightbox-counter");
    const caption = document.getElementById("lightbox-caption");
    const slides = document.querySelectorAll(".slide img");
    let currentIndex = 0;

    slides.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            showImageInLightbox(currentIndex);
        });
    });

    function showImageInLightbox(index) {
        if (index >= 0 && index < slides.length) {
            const imgElement = slides[index];
            lightboxImg.setAttribute("src", imgElement.getAttribute("src"));
            lightbox.classList.add("active");

            updateCounter(index);
            updateCaption(imgElement);
        }
    }

    function updateCounter(index) {
        counter.textContent = `${index + 1} / ${slides.length}`;
    }

    function updateCaption(imgElement) {
        const type = imgElement.getAttribute("data-type") || "Image";
        caption.textContent = type;
    }

    // Navigation avec les flèches
    prevLightbox.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showImageInLightbox(currentIndex);
    });

    nextLightbox.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showImageInLightbox(currentIndex);
    });

    // Fermer la lightbox en cliquant en dehors ou en appuyant sur Échap
    lightbox.addEventListener("click", (e) => {
        if (e.target !== lightboxImg && e.target !== prevLightbox && e.target !== nextLightbox) {
            lightbox.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.classList.remove("active");
        } else if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showImageInLightbox(currentIndex);
        } else if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % slides.length;
            showImageInLightbox(currentIndex);
        }
    });
}



function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.setAttribute("data-active", "");
        } else {
            slide.removeAttribute("data-active");
        }
    });
}

function createCarousel() {
    const slides = document.querySelectorAll(".slide");
    const prevArrow = document.getElementById("prevArrow");
    const nextArrow = document.getElementById("nextArrow");
    const dotsContainer = document.querySelector(".pagination-dots");
    let currentIndex = 0;

    // Création des bulles dynamiquement
    slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) {
          dot.classList.add("active");
        } // Active la première bulle
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateCarousel() {
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === currentIndex);
        });

        // Mise à jour des bulles
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });

        // Met à jour la légende sous l'image du carrousel
        const activeSlide = slides[currentIndex];
        const caption = activeSlide.querySelector(".carousel-caption");
        const imgType = activeSlide.querySelector("img").getAttribute("data-type");

        if (caption && imgType) {
            caption.textContent = imgType;
        }
    }

    if (isMobile) {
        slides.forEach((slide) => {
            slide.addEventListener("click", () => {
                currentIndex = (currentIndex + 1 + slides.length) % slides.length;
                showSlide(currentIndex);
                updateCarousel();
            });
        });
    }

    prevArrow.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        updateCarousel();
    });

    nextArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
        updateCarousel();
    });

    // Ajouter un événement pour cliquer sur les bulles
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    updateCarousel(); // Initialiser l'affichage
}

function toggleExpand() {
    let textBlock = document.querySelector('.text-block');
    let button = document.querySelector('.expand-button');
    textBlock.classList.toggle('expanded');
    button.textContent = textBlock.classList.contains('expanded') ? "Voir moins" : "Lire la suite";

    if (!textBlock.classList.contains('expanded')) {
        textBlock.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createLightbox();
    displayReviews();
    createCarousel();
    setInterval(() => {
        displayReviews();
    }, intervalTime);
});



