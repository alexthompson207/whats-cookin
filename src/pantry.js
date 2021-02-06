/*
class Pantry = {
  constructor(pantry) {
    this.pantryItems = [{id: 2343, amount: 3}, ..etc] - array of objects including ingredient and amount
  }
  compareIngredients(recipe) {
    - use a conditional to compare recipe ingredient & amount VS pantry ingredient & amount
    - if ingredient doesn't pass conditional, store in an array
    - return array(will just hold ingredient name)
  }
  
  calculateMissingIngredient(ingredient) {
   - using array returned from compareIngredients, this method would take in an ingredient from that array and
   calculate the amount needed PER ingredient. 
   - compare recipe ingredient amount VS pantry ingredient amount
   - return object that lists missing incredient and amount needed {ingredient: flour, amountNeeded: 1}
  }
   
  remove(recipe) {
    - When a user cooks a recipe, we need to remove the amount used
    - compare the recipeToCook Ingredients & amount to User's pantry ingredients & amount
    - Perform a calculation to user's pantry ingredients amount to remove amount used
    - should be reassigning a new value to the user's pantry amounts
  }
}
*/
