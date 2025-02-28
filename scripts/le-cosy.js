const bottomReview = document.getElementById("reviews");

let currentReviewIndex = 0;
let currentListingIndex = 0;

const reviewsPerPage = 4;
const intervalTime = 20000;

let isMobile = window.innerWidth <= 768;

const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prevArrow");
const nextButton = document.getElementById("nextArrow");
let currentIndex = 0;

const reviews = [
    { 
        name: "Cathy", 
        text: "Studio fonctionnel, très bien situé avec vue sur la plage, restaurants et sentiers des douaniers juste à côté.", 
        img: "https://a0.muscache.com/im/pictures/user/User-537114708/original/d1a4e46d-ae26-46f1-9ba7-6ad4d00b6c98.jpeg?im_w=240&im_format=avif", 
        rating: 5 
    },
    { 
        name: "Margaux", 
        text: "Vue magnifique commerce à proximité balade à couper le souffle le logement est propre et accueillant.", 
        img: "https://a0.muscache.com/im/pictures/user/03449366-4bd2-4e67-a010-b25c69f95bc1.jpg?im_w=240&im_format=avif", 
        rating: 5
    },
    { 
        name: "Fabrice", 
        text: "Studio impeccable , idéalement situé dans cette belle région, tout à porté de main.", 
        img: "https://a0.muscache.com/im/pictures/user/232c88c9-b877-4ecf-b8aa-86b0babbdcb9.jpg?im_w=240&im_format=avif", 
        rating: 5 
    },
    { 
        name: "Olivier", 
        text: "Appartement propre et très agréable, bien agencé, je recommande.", 
        img: "https://a0.muscache.com/im/pictures/user/22a6e666-d0fd-48bf-8fda-4d82f2286982.jpg?im_w=240&im_format=avif", 
        rating: 5
    },
    { 
        name: "Andreza", 
        text: "Nous avons passé une magnifique semaine de soleil avec l'imprenable vue sur la plage depuis le balcon.", 
        img: "https://a0.muscache.com/im/pictures/user/ffc42fd5-93ec-446e-ab6c-776b1670e90c.jpg?im_w=240&im_format=avif", 
        rating: 4
    }
];

function generateStars(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function displayReviews() {
    const reviewsContainer = document.createElement("div");
    reviewsContainer.innerHTML = "";
    reviewsContainer.classList.add("reviews-container");

    bottomReview.classList.add("bottom-review");
    bottomReview.innerHTML = "";

    const reviewTitle = document.createElement("div");
    reviewTitle.classList.add("review-title");
    const titleReviews = document.createElement("h4");
    titleReviews.textContent = "Avis";
    titleReviews.style.marginBottom = "20px";
    reviewTitle.appendChild(titleReviews);

    const link = document.createElement("a");
    link.classList.add("black");
    link.href = ""
    link.textContent = "5 ★ - Voir tous les avis";
    reviewTitle.appendChild(link);

    bottomReview.appendChild(reviewTitle);


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
    bottomReview.appendChild(reviewsContainer)



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
    button.textContent = textBlock.classList.contains('expanded') ? "Voir moins <" : "Lire la suite >";

    if (!textBlock.classList.contains('expanded')) {
        textBlock.scrollIntoView({ behavior: 'smooth' });
    }
}

// Get the image active and if it is hover show the arrow hide if not
function showArrow() {
    let image = document.querySelector('.carousel');
    let nextArrow = document.getElementById('nextArrow');
    let prevArrow = document.getElementById('prevArrow');
    image.addEventListener('mouseover', () => {
        nextArrow.style.display = 'flex';
        prevArrow.style.display = 'flex';
    });
    image.addEventListener('mouseout', () => {
        nextArrow.style.display = 'none';
        prevArrow.style.display = 'none';
    });
}

document.addEventListener("readystatechange", (event) => {
    if (document.readyState === "interactive" || document.readyState === "complete") {
        document.body.style.visibility = "visible";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    createLightbox();
    displayReviews();
    createCarousel();
    showArrow();
});



