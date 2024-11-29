document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  fetchRecipesFromAPI();
});

async function fetchRecipesFromAPI() {
  const searchQuery = document.getElementById('searchQuery').value;
  const ingredientQuery = document.getElementById('ingredientQuery').value;
  const dishType = document.getElementById('dishType').value;

  const apiKey = "5dd1386749f244ef9a0086b4666adc28";
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

  let query = `${apiUrl}&query=${searchQuery}&includeIngredients=${ingredientQuery}&type=${dishType}`;

  try {
    console.log("Отправка запроса:", query);
    const response = await fetch(query);
    if (!response.ok) throw new Error(`Ошибка получения данных от API: ${response.status}`);

    const data = await response.json();
    console.log("Ответ API:", data);
    renderRecipes(data.results);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

function renderRecipes(recipes) {
  const container = document.getElementById('recipesContainer');
  container.innerHTML = '';

  if (!recipes || recipes.length === 0) {
    container.innerHTML = "<p class='text-center'>Рецепты не найдены</p>";
    return;
  }

  recipes.forEach(recipe => {
    const recipeLink = `recipe.html?recipeId=${recipe.id}`;

    const recipeCard = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <a href="${recipeLink}">
            <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${recipe.title}</h5>
            <a href="${recipeLink}" class="btn btn-primary">View Recipe</a>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', recipeCard);
  });
}
