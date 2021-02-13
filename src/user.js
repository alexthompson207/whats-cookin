const IngredientRepo = require('./IngredientRepo')

class User {
  constructor(name, id, pantry) {
    this.name = name; 
    this.id = id; 
    this.pantry = pantry; 
    this.favoriteRecipes = []; 
    this.recipesToCook = []; 
  }

  addFavoriteRecipe(recipe) {
    if(!this.favoriteRecipes.includes(recipe)){
    this.favoriteRecipes.push(recipe); 
    }
  }

  removeFavoriteRecipe(recipe) {
    const recipeToDelete = this.favoriteRecipes.findIndex(favorite => {
      return favorite.id === recipe.id
    })

    this.favoriteRecipes.splice(recipeToDelete, 1); 
  }

  addToCookList(recipe) {
    if(!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe); 
    }
  };

  filterFavoritesByTag(tag) {
    const searchByTag = this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(tag);
    });
    return searchByTag;
  }

  filterFavoritesByIngredients(ingredientData, ingredientName) {
    const ingredients = new IngredientRepo(ingredientData);
    const ingredientId = ingredients.returnIngredientId(ingredientName);
    const filteredRecipes = [];
    this.favoriteRecipes.filter(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === ingredientId && !filteredRecipes.includes(recipe)) {
          filteredRecipes.push(recipe);
        }
      });
    });
    return filteredRecipes; 
  };
};

module.exports = User; 