import axios from 'axios';


async searchRecipes()
{
 this.isSearching = true;
 this.recipes = [];
 try {
   const apiKey = process.env.VUE_APP_SPOONACULAR_API_KEY;
   const baseUrl = "https://api.spoonacular.com/recipes/complexSearch";
   const params = {
     query: this.searchQuery,
     includeIngredients: this.ingredientQuery,
     type: this.dishType,
     number: 12,
     apiKey
   };


   const response = await axios.get(baseUrl, { params });
   this.recipes = response.data.results || [];
 } catch (error) {
   console.error("Error fetching recipes:", error);
   alert("Failed to fetch recipes. Please try again later.");
 } finally {
   this.isSearching = false;
 }
}
