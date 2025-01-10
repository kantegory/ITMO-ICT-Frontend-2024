// document.getElementById("searchForm").addEventListener("submit", function(event) {
//     event.preventDefault();
//
//     const results = [
//         { id: 1, title: "Квартира на ул. Пушкина", price: "50000 ₽/мес", location: "Москва", type: "apartment" },
//     ];
//
//     const searchResultsDiv = document.getElementById("searchResults");
//     searchResultsDiv.innerHTML = "";
//
//     results.forEach(property => {
//         const propertyElement = document.createElement("div");
//         propertyElement.classList.add("card", "mb-3");
//         propertyElement.innerHTML = `
//             <div class="card-body">
//                 <h5 class="card-title"><a href="property.html?id=${property.id}">${property.title}</a></h5>
//                 <p class="card-text"><strong>Цена:</strong> ${property.price}</p>
//                 <p class="card-text"><strong>Расположение:</strong> ${property.location}</p>
//             </div>
//         `;
//         searchResultsDiv.appendChild(propertyElement);
//     });
// });
//
// var priceRangeSlider = document.getElementById('priceRangeSlider');
// noUiSlider.create(priceRangeSlider, {
//     start: [15000, 25000],
//     connect: true,
//     range: {
//         'min': 0,
//         'max': 100000
//     }
// });
//
// priceRangeSlider.noUiSlider.on('update', function (values, handle) {
//     document.getElementById('minPrice').value = Math.round(values[0]);
//     document.getElementById('maxPrice').value = Math.round(values[1]);
// });
// Initialize price range slider
// Initialize price range slider
const priceRangeSlider = document.getElementById('priceRangeSlider');
noUiSlider.create(priceRangeSlider, {
    start: [0, 100000],
    connect: true,
    range: {
        'min': 0,
        'max': 100000
    },
    format: {
        to: value => Math.round(value),
        from: value => Math.round(value)
    }
});

priceRangeSlider.noUiSlider.on('update', function (values, handle) {
    document.getElementById('minPrice').value = values[0];
    document.getElementById('maxPrice').value = values[1];
});

function renderPropertyCard(property) {
    const typeTranslation = {
        'apartment': 'Квартира',
        'house': 'Дом'
    };

    return `
        <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">
                    <a href="property.html?id=${property.id}">${property.title}</a>
                </h5>
                <p class="card-text"><strong>Цена:</strong> ${property.price.toLocaleString()} ₽/мес</p>
                <p class="card-text"><strong>Расположение:</strong> ${property.location}</p>
                <p class="card-text"><strong>Тип:</strong> ${typeTranslation[property.type] || property.type}</p>
                <p class="card-text"><strong>Комнат:</strong> ${property.rooms}</p>
                ${property.description ? `<p class="card-text">${property.description}</p>` : ''}
            </div>
        </div>
    `;
}
function getSelectedRooms() {
    const rooms = [];
    for (let i = 1; i <= 4; i++) {
        if (document.getElementById(`room${i}`).checked) {
            rooms.push(i);
        }
    }
    return rooms;
}
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
function buildSearchParams() {
    const [minPrice, maxPrice] = priceRangeSlider.noUiSlider.get().map(Number);
    const propertyType = document.getElementById('propertyType').value;
    const location = document.getElementById('location').value;
    const purchaseRent = document.getElementById('purchaseRent').value;
    const sortBy = document.getElementById('sortBy').value;
    const titleSearch = document.getElementById('titleSearch').value;
    const rooms = getSelectedRooms();

    const params = {};

    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (propertyType) params.type = propertyType;
    if (location.trim()) params.location = location.trim();
    if (titleSearch.trim()) params.title = titleSearch.trim();
    if (rooms.length > 0) params.rooms = rooms.join(',');
    if (purchaseRent) params.category = purchaseRent;
    if (sortBy) params.sortBy = sortBy;

    console.log('Search params:', params);
    return params;
}

async function updateResults() {
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = '<div class="text-center">Загрузка...</div>';

    try {
        const searchParams = buildSearchParams();
        console.log('Sending request with params:', searchParams); // Debug log

        const response = await fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchParams)
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();
        console.log('Received results:', results);

        if (results.length === 0) {
            searchResultsDiv.innerHTML = '<div class="alert alert-info">Ничего не найдено</div>';
            return;
        }

        searchResultsDiv.innerHTML = results
            .map(property => renderPropertyCard(property))
            .join('');

    } catch (error) {
        console.error('Error:', error);
        searchResultsDiv.innerHTML = `
            <div class="alert alert-danger">
                Произошла ошибка при поиске: ${error.message}
            </div>`;
    }
}

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    updateResults();
});

['propertyType', 'purchaseRent', 'sortBy', 'titleSearch'].forEach(id => {
    document.getElementById(id).addEventListener('input', debounce(updateResults, 500));
});

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateResults);
});

document.getElementById('location').addEventListener('input', debounce(updateResults, 500));

priceRangeSlider.noUiSlider.on('change', updateResults);

document.addEventListener('DOMContentLoaded', updateResults);