// const IngredientRepo = require('./IngredientRepo')

class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addFavoriteRecipe(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    }
  }

  removeFavoriteRecipe(id) {
    const recipeToDelete = this.favoriteRecipes.findIndex(favorite => {
      return favorite.id === id
    })

    this.favoriteRecipes.splice(recipeToDelete, 1);
  }

  addToCookList(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    }
  }

  filterFavoritesByTag(tag) {
    const searchByTag = this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
    return searchByTag;
  }

  filterFavoritesByIngredients(ingredientData, ingredientName) {
    const ingredientId = ingredientData.returnIngredientId(ingredientName);
    const filteredRecipes = [];
    this.favoriteRecipes.filter(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === ingredientId && !filteredRecipes.includes(recipe)) {
          filteredRecipes.push(recipe);
        }
      });
    });
    return filteredRecipes;
  }

  filterFavoritesByName(recipeName) {
    const searchRecipeName = recipeName.toLowerCase();
    return this.favoriteRecipes.find(recipe => recipe.name.toLowerCase() === searchRecipeName);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}