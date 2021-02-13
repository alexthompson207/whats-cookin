class User {
  constructor(name, id, pantry) {
    this.name = name; 
    this.id = id; 
    this.pantry = pantry; 
    this.favoriteRecipes = []; 
    this.recipesToCook = []; 
  }

  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe); 
  }

  removeFavoriteRecipe(recipe) {
    const recipeToDelete = this.favoriteRecipes.findIndex(favorite => {
      return favorite.id === recipe.id
    })

    this.favoriteRecipes.splice(recipeToDelete, 1); 
  }
}

module.exports = User; 