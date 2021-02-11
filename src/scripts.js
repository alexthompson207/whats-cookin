const recipeListCard = document.querySelector('.recipe-list');
const recipesRepo = new RecipeRepo(recipeData);

function displayAllRecipeCards(recipesRepo) {
  recipeListCard.innerHTML = '';
  recipesRepo.recipes.forEach(recipe => {
    recipeListCard.innerHTML +=
      `<div class='recipe-img-container'>
    <img class='recipe-img' src="${recipe.image}"
      alt="${recipe.name}">
      <p class='recipe-name'>${recipe.name}</p>
  </div>`
  })
}

