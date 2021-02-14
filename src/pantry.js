class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }

  searchPantry(recipe) {
    const result = recipe.ingredients.filter(recipeIngredient => {
      return this.pantry.find(pantryIngredient => {
        if (pantryIngredient.ingredient === recipeIngredient.id && pantryIngredient.amount < recipeIngredient.quantity.amount) {
          return recipeIngredient;
        } else if (pantryIngredient.ingredient === recipeIngredient.id && pantryIngredient.amount >= recipeIngredient.quantity.amount) {
          return;
        } else {
          return recipeIngredient;
        }
      })
    })
    console.log(result);
    return result;
  }
  // [{ id: 2, quantity: { amount: 12, unit: 'unit' } }, { id: 7}]
  calculateMissingIngredients(missingIngredients) {
    let num;
    const itemsNeeded = missingIngredients.map(ingredient => {
      let result = this.pantry.find(item => item.ingredient === ingredient.id)

      if (result) {
        num = ingredient.quantity.amount - result.amount;
      } else {
        num = ingredient.quantity.amount;
      }

      return { id: ingredient.id, amount: num, unit: ingredient.quantity.unit };
    })
    console.log(itemsNeeded);
    return itemsNeeded;
  }


}
if (typeof module !== 'undefined') {
  module.exports = Pantry;
}