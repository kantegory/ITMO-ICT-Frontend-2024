import { API_BASE_URL } from './config.js';

document.addEventListener("DOMContentLoaded", async function () {
    const propertyId = getPropertyIdFromURL();
    if (!propertyId) {
        console.error('No property ID provided in the URL.');
        return;
    }

    try {
        const property = await fetchPropertyDetails(propertyId);
        if (property) {
            appendPropertyDetails(property);
        } else {
            console.error('Property not found.');
        }
    } catch (error) {
        console.error('Error fetching property details:', error);
    }
});

function getPropertyIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

async function fetchPropertyDetails(propertyId) {
    try {
        const response = await fetch(`${API_BASE_URL}/properties?id=${propertyId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch property details');
        }
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error('Error fetching property data:', error);
        throw error;
    }
}

function appendPropertyDetails(property) {
    const descriptionContainer = document.querySelector('.property-description');
    const descriptionElement = document.createElement('p');
    descriptionElement.innerText = property.description;
    descriptionContainer.appendChild(descriptionElement);

    const slider = document.querySelector('.photo-slider .slider');
    property.photos.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo;
        img.alt = "Property Photo";
        img.classList.add('slide');
        slider.appendChild(img);
    });

    const featuresList = document.querySelector('.property-features ul');
    const features = [
        `<i class="fas fa-home"></i> <strong>Property Type:</strong> ${property.propertyType}`,
        `<i class="fas fa-handshake"></i> <strong>Transaction Type:</strong> ${property.transactionType}`,
        `<i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${property.location}`,
        `<i class="fas fa-bed"></i> <strong>Number of Rooms:</strong> ${property.rooms}`,
        `<i class="fas fa-ruler-combined"></i> <strong>Area:</strong> ${property.area} m²`,
        `<i class="fas fa-layer-group"></i> <strong>Floor:</strong> ${property.floor}`,
        `<i class="fas fa-cogs"></i> <strong>Amenities:</strong> ${property.amenities.join(', ')}`,
        `<i class="fas fa-dollar-sign"></i> <strong>Price:</strong> <span style="color: green;">$${property.price.toLocaleString()}</span>`
    ];
    
    featuresList.innerHTML = features.map(item => `<li>${item}</li>`).join('');    
 
    initializeSlider();
}

function initializeSlider() {
    const slides = document.querySelectorAll('.photo-slider .slider .slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function updateSlideVisibility() {
        slides.forEach((slide, index) => {
            slide.style.display = index === currentSlide ? 'block' : 'none';
        });
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlideVisibility();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideVisibility();
    });

    updateSlideVisibility();
}
