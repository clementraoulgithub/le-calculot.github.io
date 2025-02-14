const reviewsContainer = document.getElementById("reviews");

let currentReviewIndex = 0;
let currentListingIndex = 0;
let currentIndex = 1;

const reviewsPerPage = 3;
const intervalTime = 10000; // 10 seconds

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

function toggleArrowsVisibility() {
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

    if (airbnbListings.length < 2) {
        prevArrow.style.display = 'none';
        nextArrow.style.display = 'none';
    } else {
        prevArrow.style.display = 'inline-block';
        nextArrow.style.display = 'inline-block';
    }
    setInterval(() => {
        displayReviews();
    }, 5000);
}


function displayReviews() {
    // Clear previous reviews
    reviewsContainer.innerHTML = "";

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


function loadAirbnbScript() {
    document.getElementById('airbnb_1').style.display = 'none';
    document.getElementById('airbnb_2').style.display = 'none';
    document.getElementById('airbnb_3').style.display = 'none';

    // Montrer l'élément suivant en fonction de l'index
    if (currentIndex === 1) {
        document.getElementById('airbnb_2').style.display = 'block';
    } else if (currentIndex === 2) {
        document.getElementById('airbnb_3').style.display = 'block';
    } else if (currentIndex === 3) {
        document.getElementById('airbnb_1').style.display = 'block';
    }

    displayReviews();
}

const loadScript = (src, name) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = resolve
        script.onerror = reject
            
        document.body.appendChild(script).setAttribute("id", name)
    })
};

function updateAirbnbListing() {
    const airbnbEmbeds = document.querySelectorAll('.airbnb-embed-frame');

    const numListings = airbnbListings.length;
    const numEmbeds = airbnbEmbeds.length;

    for (let i = 0; i < numEmbeds; i++) {
        const airbnbEmbed = airbnbEmbeds[i];
        const listing = airbnbListings[i % numListings];

        airbnbEmbed.setAttribute("data-id", listing.id);

        airbnbEmbed.innerHTML = `
            <a href="${listing.url}?guests=1&amp;adults=1&amp;s=66&amp;source=embed_widget">Voir sur Airbnb</a>
            <a href="${listing.url}?guests=1&amp;adults=1&amp;s=66&amp;source=embed_widget" rel="nofollow">
                ${listing.description}
            </a>
        `;
        loadScript("airbnb_script.js", "airbnb-script-" + i);
    }
}

// Run once on page load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('airbnb_2').style.display = 'none';
    document.getElementById('airbnb_3').style.display = 'none';
    updateAirbnbListing();
    toggleArrowsVisibility();
    displayReviews();
});

document.getElementById('prevArrow').addEventListener('click', () => {
    currentIndex = currentIndex > 1 ? currentIndex - 1 : currentIndex;
    loadAirbnbScript();
});

document.getElementById('nextArrow').addEventListener('click', () => {
    currentIndex = currentIndex < airbnbListings.length ? currentIndex + 1 : currentIndex;
    loadAirbnbScript();
});