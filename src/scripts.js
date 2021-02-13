

const ingredientInstances = ingredientsData.map(ingredient => {
  return new Ingredient(
    ingredient.id,
    ingredient.name,
    ingredient.estimatedCostInCents
  );
});
const ingredientRepo = new IngredientRepo(ingredientInstances);
const recipeListCard = document.querySelector('.recipe-list');
const recipesRepo = new RecipeRepo(recipeData);
const searchBtn = document.querySelector('#searchRecipes');
const searchInput = document.querySelector('.search-bar');
const filterTagSection = document.querySelector('.recipe-tags');
const allRecipesView = document.querySelector('.all-recipes');
const singleRecipeView = document.querySelector('.single-recipe');
const singleRecipeImage = document.getElementById('singleRecipeImage');
const pageTitleText = document.querySelector('.navigation-title');



window.addEventListener('load', displayPageLoad);
searchBtn.addEventListener('click', handleSearchDropDown);
filterTagSection.addEventListener('click', filterRecipesByTags);
recipeListCard.addEventListener('click', handleRecipeClick);

function displayAllRecipeCards(allRecipeData) {
  recipeListCard.innerHTML = '';
  allRecipeData.recipes.forEach(recipe => {
    recipeListCard.innerHTML +=
      `<div class='recipe-img-container'>
    <img class='recipe-img' id="${recipe.id}" src="${recipe.image}"
      alt="${recipe.name}">
      <p class='recipe-name'>${recipe.name}</p>
  </div>`
  })
}

function searchByIngrients() {
  const searchResultRecipes = recipesRepo.filterRecipesByIngredients(ingredientsData, searchInput.value);
  displayAllRecipeCards({ recipes: searchResultRecipes });
}

function searchByRecipeName() {
  const searchResultName = recipesRepo.filterRecipesByName(searchInput.value);
  displayAllRecipeCards({ recipes: [searchResultName] });
}

function handleSearchDropDown(event) {
  event.preventDefault();
  let searchBy = document.getElementById('search-recipe-select').value;
  if (searchBy === 'recipe') {
    searchByRecipeName(event);
  } else if (searchBy === 'ingredient') {
    searchByIngrients(event);
  }
  searchInput.value = '';
}

function displayPageLoad() {
  displayAllRecipeCards(recipesRepo);
}

function filterRecipesByTags(event) {
  const filteredRecipes = recipesRepo.filterRecipesByTag(event.target.value);
  console.log(event.target.value);
  if (event.target.value === 'all recipes') {
    displayAllRecipeCards(recipesRepo);
  } else if (event.target.value) {
    displayAllRecipeCards({ recipes: filteredRecipes });
  }
}

function handleRecipeClick(event) {
  console.log(event.target.closest('.recipe-img-container').children[0].id);
  displaySingleRecipe(event);
  displayCostOfRecipe(event);
}
function displaySingleRecipe(event) {
  if (event.target.parentNode.className.includes('recipe-img-container')) {
    hideAllRecipes(event);
    const recipeImage = event.target.closest('.recipe-img-container').children[0].src
    const altText = event.target.closest('.recipe-img-container').children[0].alt
    singleRecipeImage.src = recipeImage;
    singleRecipeImage.alt = altText;
    pageTitleText.innerText = altText;
  }
}

function hideAllRecipes() {
  allRecipesView.classList.add('hidden');
  singleRecipeView.classList.remove('hidden');
}

function displayCostOfRecipe(event) {
  const recipeId = Number(event.target.closest('.recipe-img-container').children[0].id);
  const clickedRecipe = recipesRepo.recipes.find(recipe => {
    return recipe.id === recipeId;
  })
  let cost = clickedRecipe.calculateRecipeCost(ingredientInstances);
  console.log(cost);
}

function findRecipeById(recipeId) {
  const foundRecipe = recipeData.find(recipe => {
    return recipe.id === recipeID
  })
}

function displayRecipeIngredients(event) {
  const recipeId = Number(event.target.closest('.recipe-img-container').children[0].id);
  const clickedRecipe = recipesRepo.recipes.find(recipe => {
    return recipe.id === recipeId;
  })
  console.log(clickedRecipe);
  const ingredients = clickedRecipe.returnIngredientNames(ingredientInstances)
  console.log(ingredients);
}