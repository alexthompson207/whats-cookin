class RecipeRepo {
  constructor(recipeData = []) {
    this.recipes = recipeData;
  }

  filterRecipesByTag(tag) {
    const searchByTag = this.recipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
    return searchByTag;
  }

  filterRecipesByName(recipeName) {
    const searchRecipeName = recipeName.toLowerCase();
    return this.recipes.find(recipe => recipe.name.toLowerCase() === searchRecipeName);
  }

  filterRecipesByIngredients(ingredientData, ingredientName) {
    const ingredientId = ingredientData.returnIngredientId(ingredientName);
    const filteredRecipes = [];
    this.recipes.filter(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === ingredientId && !filteredRecipes.includes(recipe)) {
          filteredRecipes.push(recipe);
        }
      });
    });
    return filteredRecipes;
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeRepo;
}