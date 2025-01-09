document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const results = [
        { id: 1, title: "Квартира на ул. Пушкина", price: "50000 ₽/мес", location: "Москва", type: "apartment" },
    ];

    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = "";

    results.forEach(property => {
        const propertyElement = document.createElement("div");
        propertyElement.classList.add("card", "mb-3");
        propertyElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title"><a href="property.html?id=${property.id}">${property.title}</a></h5>
                <p class="card-text"><strong>Цена:</strong> ${property.price}</p>
                <p class="card-text"><strong>Расположение:</strong> ${property.location}</p>
            </div>
        `;
        searchResultsDiv.appendChild(propertyElement);
    });
});

var priceRangeSlider = document.getElementById('priceRangeSlider');
noUiSlider.create(priceRangeSlider, {
    start: [15000, 25000],
    connect: true,
    range: {
        'min': 0,
        'max': 100000
    }
});

priceRangeSlider.noUiSlider.on('update', function (values, handle) {
    document.getElementById('minPrice').value = Math.round(values[0]);
    document.getElementById('maxPrice').value = Math.round(values[1]);
});
