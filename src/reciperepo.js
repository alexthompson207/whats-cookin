// const Recipe = require('../src/Recipe');
// const IngredientRepo = require('../src/IngredientRepo');

class RecipeRepo {
  constructor(recipeData = []) {
    this.recipes = recipeData.map(recipe => new Recipe(
      recipe.id,
      recipe.image,
      recipe.ingredients,
      recipe.instructions,
      recipe.name,
      recipe.tags
    ))
  }

  filterRecipesByTag(tag) {
    const searchByTag = this.recipes.filter(recipe => {
      return recipe.tags.includes(tag);
    })
    return searchByTag;
  }

  filterRecipesByName(recipeName) {
    const searchRecipeName = recipeName.toLowerCase();
    return this.recipes.find(recipe => recipe.name.toLowerCase() === searchRecipeName);
  }

  filterRecipesByIngredients(ingredientData, ingredientName) {
    const ingredients = new IngredientRepo(ingredientData);
    const ingredientId = ingredients.returnIngredientId(ingredientName);
    console.log(ingredients);
    const filteredRecipes = [];
    this.recipes.filter(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === ingredientId) {
          filteredRecipes.push(recipe);
          console.log(ingredient.id);
          console.log(ingredientId);
        }
      });
    });
    console.log(filteredRecipes);
    return filteredRecipes;
  }
}

if (typeof module !== "undefined") {
  module.exports = RecipeRepo;
}