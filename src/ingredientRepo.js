class IngredientRepo {
  constructor(ingredientData = []) {
    this.ingredients = ingredientData;
  }
  returnIngredientId(ingredientName) {
    const ingredient = this.ingredients.find(ingredient => {
      return ingredient.name === ingredientName;
    });
    if (!ingredient) {
      return false;
    }
    return ingredient.id;
  }

  returnIngredientName(ingredientId) {
    const ingredient = this.ingredients.find(ingredient => ingredient.id === ingredientId);
    if (!ingredient) {
      return false;
    }
    return ingredient.name;
  }
}
if (typeof module !== 'undefined') {
  module.exports = IngredientRepo;
}
