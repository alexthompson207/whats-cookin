class Pantry {
  constructor(pantry) {
    this.pantry = pantry;
  }

  searchPantry(recipe) {
    const result = recipe.ingredients.filter(recipeIngredient => {
      const condition1 = this.pantry.find(pantryIngredient => {
        return pantryIngredient.ingredient === recipeIngredient.id && pantryIngredient.amount < recipeIngredient.quantity.amount;
      })
      const condition2 = !this.pantry.find(pantryIngredient => {
        return pantryIngredient.ingredient === recipeIngredient.id;
      })

      return condition1 || condition2;
    })
    return result;
  }

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

    return itemsNeeded;
  }

  updatePantry(recipe) {
    this.pantry.forEach(item => {
      recipe.ingredients.forEach(ingredient => {
        if (item.ingredient === ingredient.id) {
          item.amount -= ingredient.quantity.amount
        }
      });
    });
    this.pantry = this.pantry.filter(item => item.amount > 0);
    return this.pantry;
  }
}
if (typeof module !== 'undefined') {
  module.exports = Pantry;
}