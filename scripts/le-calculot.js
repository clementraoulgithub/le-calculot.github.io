const reviewsContainer = document.getElementById("reviews");

let currentReviewIndex = 0;
let currentListingIndex = 0;

const reviewsPerPage = 2;
const intervalTime = 7000;

let isMobile = window.innerWidth <= 768;

const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prevArrow");
const nextButton = document.getElementById("nextArrow");
let currentIndex = 0;

const reviews = [
    { 
        name: "Régis", 
        text: "Le logement est parfait pour un week-end. Il est très bien équipé et l’emplacement est top. La vue est magnifique. Je recommande ce logement :)", 
        img: "https://a0.muscache.com/im/pictures/user/User-138675833/original/02460210-74c3-4448-9ace-2f3f2072cf82.jpeg?im_w=240&im_format=avif", 
        rating: 5 
    },
    { 
        name: "Ilona", 
        text: "Appartement très bien placé avec une super vue, parfait pour un week-end.", 
        img: "https://a0.muscache.com/im/pictures/user/User-589090459/original/9c6854aa-854f-442a-b664-e306d97527af.jpeg?im_w=240&im_format=avif", 
        rating: 4 
    },
    { 
        name: "Louis", 
        text: "Studio parfait pour un week-end, bien exposé et commodités à proximité.", 
        img: "https://a0.muscache.com/im/pictures/user/41d3c09a-e263-42bc-be61-5fb7d74291a9.jpg?im_w=240&im_format=avif", 
        rating: 5 
    },
    { 
        name: "Mélanie", 
        text: "Petit studio avec une très jolie vue. La véranda est un vrai plus !", 
        img: "https://a0.muscache.com/im/pictures/user/6f00e21f-d192-4ad8-8fb5-8a7d65f96a34.jpg?im_w=240&im_format=avif", 
        rating: 4
    },
    { 
        name: "Lisa", 
        text: "Appartement fidèle à l'annonce , très beau point de vue . Bien situé sur la côte de granit rose pour tous les amateurs de cailloux", 
        img: "https://a0.muscache.com/im/pictures/user/68b26ee8-171a-4a13-a25a-531291393fcd.jpg?im_w=240&im_format=avif", 
        rating: 5
    }
];

const airbnbListings = [
    {
        id: "1160899826600585254",
        url: "https://www.airbnb.fr/rooms/1160899826600585254",
        description: "Appartement · Perros-Guirec · ★4,76 · Studio · 1 lit · 1 salle de bain"
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
    map.innerHTML = `<img src="image/le-calculot-image/map-image/map.jpg" alt="Carte Perros-Guirec"/>`;
    reviewsContainer.appendChild(map);


    const link_container = document.createElement("div");
    link_container.classList.add("link-container");
    reviewsContainer.appendChild(link_container);


    const link = document.createElement("a");
    link.classList.add("black");
    link.href = "https://www.airbnb.fr/rooms/1160899826600585254/reviews?search_mode=regular_search&adults=1&check_in=2025-03-03&check_out=2025-03-08&children=0&infants=0&pets=0&source_impression_id=p3_1739721997_P3hEuhNgaNwy5hKk&previous_page_section_name=1000&federated_search_id=a52c5b83-b47e-4f46-a3c3-2216590192b1"
    link.textContent = "4,74 ★ - Voir tous les avis";
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


document.addEventListener("DOMContentLoaded", () => {
    createLightbox();
    displayReviews();
    createCarousel();
    setInterval(() => {
        displayReviews();
    }, intervalTime);
});



