// const Ingredient = require('../src/Ingredient');
// in all the classes don't require in, use data to pass in
//tests ok to require in classes, then create instances on the scipt.js file

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
}
if (typeof module !== 'undefined') {
  module.exports = IngredientRepo;
}
