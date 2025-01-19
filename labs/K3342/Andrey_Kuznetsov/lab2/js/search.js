import { API_BASE_URL } from './config.js';

const searchForm = document.getElementById('searchForm');
const searchResultsContainer = document.getElementById('searchResults');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const propertyType = document.getElementById('propertyType').value;
    const transactionType = document.getElementById('purchaseRent').value;
    const location = document.getElementById('location').value;
    const rooms = getCheckedValues('room');
    const amenities = getCheckedValues('amenity');
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minArea = document.getElementById('minArea').value;
    const maxArea = document.getElementById('maxArea').value;
    const sortBy = document.getElementById('sortBy').value;

    if (isFormEmpty({ propertyType, transactionType, location, rooms, amenities, minPrice, maxPrice, minArea, maxArea })) {
        fetchAllProperties();
    } else {
        fetchProperties({
            propertyType,
            transactionType,
            location,
            rooms,
            amenities,
            minPrice,
            maxPrice,
            minArea,
            maxArea,
            sortBy
        });
        console.log('Form is NOT empty, fetching all properties');
    }
});

function isFormEmpty(filters) {
    return !Object.keys(filters).some(key => {
        let value = filters[key];

        if (value === '' || value === 'default' || value === 'all' || value === '0' || value === 'rent') {
            return false;
        }

        if (Array.isArray(value)) {
            return value.length > 0;
        }

        return true;
    });
}

function getCheckedValues(prefix) {
    const values = [];
    const checkboxes = document.querySelectorAll(`input[id^="${prefix}"]:checked`);
    checkboxes.forEach(checkbox => values.push(checkbox.value));
    return values;
}

async function fetchAllProperties() {
    try {
        const response = await fetch(`${API_BASE_URL}/properties`);
        const properties = await response.json();
        displayProperties(properties);
    } catch (error) {
        console.error('Error fetching all properties:', error);
    }
}

async function fetchProperties(filters) {
    const queryParams = new URLSearchParams(filters);

    try {
        const response = await fetch(`${API_BASE_URL}/properties?${queryParams}`);
        const properties = await response.json();
        displayProperties(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
    }
}

function displayProperties(properties) {
    searchResultsContainer.innerHTML = '';

    if (properties.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    properties.forEach(property => {
        const propertyElement = createPropertyElement(property);
        searchResultsContainer.appendChild(propertyElement);
    });
}

function createPropertyElement(property) {
    const propertyElement = document.createElement('div');
    propertyElement.classList.add('property-item');
    propertyElement.innerHTML = `
        <div class="property-image">
            <img src="${property.photos[0]}" alt="Property image">
        </div>
        <div class="property-details">
            <h3>${property.propertyType} - ${property.transactionType}</h3>
            <p>Location: ${property.location}</p>
            <p>Rooms: ${property.rooms} | Area: ${property.area} m²</p>
            <p>Price: $${property.price.toLocaleString()}</p>
            <button class="view-details" onclick="viewPropertyDetails(${property.id})">View Details</button>
        </div>
    `;
    return propertyElement;
}

function viewPropertyDetails(propertyId) {
    window.location.href = `property.html?id=${propertyId}`;
}

window.viewPropertyDetails = viewPropertyDetails;
