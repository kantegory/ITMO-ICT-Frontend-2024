function toggleDropdown() {
    const dropdown = document.getElementById('filterDropdown');
    dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
}

function filterRecipes(criteria) {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const recipes = document.querySelectorAll('.recipe');
    let hasResults = false;

    recipes.forEach(recipe => {
        const author = recipe.getAttribute('data-author').toLowerCase();
        const name = recipe.getAttribute('data-name').toLowerCase();
        const difficulty = recipe.getAttribute('data-difficulty').toLowerCase();

        let matches = false;
        switch (criteria) {
            case 'author':
                matches = author.includes(input);
                break;
            case 'name':
                matches = name.includes(input);
                break;
            case 'difficulty':
                matches = difficulty.includes(input);
                break;
            default:
                matches = false;
        }

        recipe.style.display = matches ? 'block' : 'none';
        if (matches) {
            hasResults = true;
        }
    });

    const popularSection = document.getElementById('popularSection');
    const suggestionSection = document.getElementById('suggestionSection');
    const divider = document.getElementById('divider');
    const divider1 = document.getElementById('divider1');
    if (hasResults) {
        popularSection.style.display = 'none';
        suggestionSection.style.display = 'none';
        divider.style.display = 'none';
        divider1.style.display = 'none';
    } else {
        popularSection.style.display = 'block';
        suggestionSection.style.display = 'block';
        divider.style.display = 'block';
        divider1.style.display = 'block';
    }

    toggleDropdown();
}

window.onclick = function(event) {
    if (!event.target.matches('#searchInput') && !event.target.matches('.filter-item')) {
        const dropdown = document.getElementById('filterDropdown');
        dropdown.style.display = 'none';
    }
}