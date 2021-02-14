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
      console.log('condition1:', condition1);
      console.log('condition2:', condition2);
      return condition1 || condition2;
    })
    console.log(result);
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
    console.log(itemsNeeded);
    return itemsNeeded;
  }

  //   {
  //     "ingredient": 7,
  //     "amount": 3
  //   },
  // {
  //     "ingredient": 8,
  //     "amount": 2
  //   },
  //   {
  //     "ingredient": 9,
  //     "amount": 4
  //   },
  //   {
  //     "ingredient": 10,
  //     "amount": 3
  //   }]);

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