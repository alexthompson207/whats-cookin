class Recipe {
  constructor(id, image, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = image;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.name = name;
    this.tags = tags;
  }
  findIngredients(ingredientData) {
    const recipeIngredients = [];
    this.ingredients.forEach(recipeIngredient => {
      return recipeIngredients.push(
        ingredientData.find(ingredient => recipeIngredient.id === ingredient.id)
      );
    });
    return recipeIngredients;
  }

  returnIngredientNames(ingredientData) {
    const recipeIngredients = this.findIngredients(ingredientData);
    const ingredientNames = recipeIngredients.map(
      ingredient => ingredient.name
    );
    return [...new Set(ingredientNames)];
  }

  returnIngredientAmounts() {
    const recipeIngredients = this.ingredients;
    const amounts = [];
    recipeIngredients.forEach(ingredient => {
      const roundedAmount = Math.round(ingredient.quantity.amount * 100) / 100;
      const amountAndUnit = [roundedAmount, ingredient.quantity.unit];
      amounts.push(amountAndUnit.join(" "));
    })
    return amounts;
  }

  calculateRecipeCost(ingredientData) {
    const costPerUnit = [];
    this.ingredients.forEach(recipeIngredient => {
      return costPerUnit.push((recipeIngredient.quantity.amount) * (ingredientData.find(ingredient => recipeIngredient.id === ingredient.id).estimatedCostInCents));
    });
    const cost = costPerUnit.reduce((totalCost, ingredientCost) => totalCost + ingredientCost, 0);
    return Number(cost / 100).toFixed(2);
  }

  returnRecipeInstructions() {
    return this.instructions;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
