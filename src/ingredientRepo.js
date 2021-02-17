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
  //make a test for this method
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
