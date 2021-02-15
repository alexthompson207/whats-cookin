const ingredientInstances = ingredientsData.map(ingredient => {
  return new Ingredient(
    ingredient.id,
    ingredient.name,
    ingredient.estimatedCostInCents
  );
});

const ingredientRepo = new IngredientRepo(ingredientInstances);
const recipesRepo = new RecipeRepo(recipeData);
let currentRecipe;
let currentUser;
const recipeListCard = document.querySelector('.recipe-list');
const searchBtn = document.querySelector('#searchRecipes');
const searchInput = document.querySelector('.search-bar');
const filterTagSection = document.querySelector('.recipe-tags');
const allRecipesView = document.querySelector('.all-recipes');
const singleRecipeView = document.querySelector('.single-recipe');
const singleRecipeImage = document.getElementById('singleRecipeImage');
const singleRecipeList = document.getElementById('singleRecipeList');
const pageTitleText = document.querySelector('.navigation-title');
const singleRecipeBtns = document.querySelector('.single-recipe-buttons');
const topBarNavBtns = document.querySelector('.navigation-buttons');

window.addEventListener('load', displayPageLoad);
searchBtn.addEventListener('click', handleSearchDropDown);
filterTagSection.addEventListener('click', filterRecipesByTags);
recipeListCard.addEventListener('click', handleRecipeClick);
singleRecipeBtns.addEventListener('click', handleSingleRecipeButtons);
topBarNavBtns.addEventListener('click', handleNavButtons);

function displayAllRecipeCards(recipesRepo) {
  recipeListCard.innerHTML = '';
  recipesRepo.recipes.forEach(recipe => {
    recipeListCard.innerHTML +=
      `<div class='recipe-img-container'>
    <img class='recipe-img' id="${recipe.id}" src="${recipe.image}"
      alt="${recipe.name}">
      <p class='recipe-name'>${recipe.name}</p>
  </div>`
  })
}

//function that will display recipe cards with an x icon on it
function displayFavoriteRecipeCards(favoriteRecipes) {
  recipeListCard.innerHTML = '';
  favoriteRecipes.recipes.forEach(recipe => {
    recipeListCard.innerHTML +=
      `<div class='recipe-img-container'>
      <svg class="remove-icon" id="removeIcon" xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'><title>Close Circle</title><path d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z' fill='none' stroke='currentColor' stroke-miterlimit='10' stroke-width='32'/><path fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M320 320L192 192M192 320l128-128'/></svg>
    <img class='favorite-recipe-img' id="${recipe.id}" src="${recipe.image}"
      alt="${recipe.name}">
      <p class='recipe-name'>${recipe.name}</p>
  </div>`
  })
}

function createNewUser() {
  const randomUser = getRandomIndex(usersData);
  currentUser = new User(randomUser.name, randomUser.id, randomUser.pantry);
  // const newPantry = new Pantry(currentUser.pantry);
}

function getRandomIndex(dataSet) {
  return dataSet[Math.floor(Math.random() * dataSet.length)]
}

function searchByIngrients() {
  const searchResultRecipes = recipesRepo.filterRecipesByIngredients(ingredientsData, searchInput.value);
  displayAllRecipeCards({ recipes: searchResultRecipes });
}

function searchByRecipeName() {
  const searchResultName = recipesRepo.filterRecipesByName(searchInput.value);
  displayAllRecipeCards({ recipes: [searchResultName] });
}

function searchFavoriteRecipesByName() {
  const searchResultName = currentUser.filterFavoritesByName(searchInput.value);
  displayAllRecipeCards({ recipes: [searchResultName] });
}

function searchFavoriteRecipesByIngredient() {
  const searchResultRecipes = currentUser.filterFavoritesByIngredients(ingredientsData, searchInput.value);
  console.log(searchResultRecipes);
  displayAllRecipeCards({ recipes: searchResultRecipes });
}

function handleSearchDropDown(event) {
  event.preventDefault();
  let searchBy = document.getElementById('search-recipe-select').value;
  if (searchBy === 'recipe' && pageTitleText.innerText === 'Whats Cookin') {
    searchByRecipeName();
  } else if (searchBy === 'ingredient' && pageTitleText.innerText === 'Whats Cookin') {
    searchByIngrients();
  } else if (searchBy === 'recipe' && pageTitleText.innerText === 'Favorite Recipes') {
    searchFavoriteRecipesByName();
  } else if (searchBy === 'ingredient' && pageTitleText.innerText === 'Favorite Recipes') {
    searchFavoriteRecipesByIngredient();
  }
  searchInput.value = '';
}

function displayPageLoad() {
  displayAllRecipeCards(recipesRepo);
  createNewUser();
}

function filterRecipesByTags(event) {
  const filteredRecipes = recipesRepo.filterRecipesByTag(event.target.value);
  const filteredFavoriteRecipes = currentUser.filterFavoritesByTag(event.target.value);
  if (event.target.value === 'all recipes' && pageTitleText.innerText === 'Whats Cookin') {
    displayAllRecipeCards(recipesRepo);
  } else if (pageTitleText.innerText === 'Whats Cookin') {
    displayAllRecipeCards({ recipes: filteredRecipes });
  } else if (event.target.value === 'all recipes' && pageTitleText.innerText === 'Favorite Recipes') {
    displayAllRecipeCards({ recipes: currentUser.favoriteRecipes });
  } else if (pageTitleText.innerText === 'Favorite Recipes') {
    displayAllRecipeCards({ recipes: filteredFavoriteRecipes });
  }
}

function handleRecipeClick(event) {
  const recipeId = Number(event.target.closest('.recipe-img-container').children[0].id);
  if (event.target.matches('img.recipe-img')) {
    currentRecipe = recipesRepo.recipes.find(recipe => recipe.id === recipeId);
    displaySingleRecipe(currentRecipe);
    displayCostOfRecipe(currentRecipe);
  } else if (event.target.matches('svg.remove-icon')) {
    removeFavoriteRecipe(recipeId);
    event.target.parentNode.parentNode.removeChild(event.target.parentNode)
  }
}

function displaySingleRecipe(recipe) {
  hideAllRecipes();
  singleRecipeImage.src = recipe.image;
  singleRecipeImage.alt = recipe.name;
  pageTitleText.innerText = recipe.name;
  displayRecipeIngredients(recipe);
}

function hideAllRecipes() {
  allRecipesView.classList.add('hidden');
  singleRecipeView.classList.remove('hidden');
}

function displayCostOfRecipe(recipe) {
  const totalCost = recipe.calculateRecipeCost(ingredientInstances);
  const costHTML = document.querySelector('.single-recipe-info-title');
  costHTML.children[1].innerText = `Recipe Cost: $${totalCost}`;
}

//Builds an object of recipe names and their ingredient amounts
// turn two arrays of strings into an array of objects with two keys holding the elements of each array
// build one object that holds a key of "chicken"; " 1 tbs"
function findIngredientInfo(recipe) {
  const amounts = recipe.returnIngredientAmounts()
  const ingredients = recipe.returnIngredientNames(ingredientInstances)
  const recipeInfo = {}
  ingredients.forEach((ingredient, i) => {
    recipeInfo[ingredient] = amounts[i];
  })
  return recipeInfo
}

// This is an object that holds key value pairs of {ingredientName: amount}
// Use destructuring to use [key, value] to then dynamically add values to the HTML
function displayRecipeIngredients(recipe) {
  singleRecipeList.innerHTML = '';
  const ingredientInfo = findIngredientInfo(recipe);
  for (let [ingredient, amount] of Object.entries(ingredientInfo)) {
    singleRecipeList.innerHTML +=
      `<li class="single-recipe-info">
    <p class="single-recipe-number">${amount}</p>
    <p class="single-recipe-ingredient">${ingredient}</p>
     </li>`
  }
  singleRecipeBtns.children[0].innerText = 'View Instructions';
}

function displayRecipeInstructions(recipe) {
  const recipeInstructions = recipe.returnRecipeInstructions();
  singleRecipeList.innerHTML = '';
  recipeInstructions.forEach(instruction => {
    singleRecipeList.innerHTML +=
      `<li class="single-recipe-info">
    <p class="single-recipe-number">${instruction.number}</p>
    <p class="single-recipe-ingredient">${instruction.instruction}</p>
     </li>`
  })
  singleRecipeBtns.children[0].innerText = 'View Ingredients';
}

function handleSingleRecipeButtons(event) {
  if (event.target.innerText === 'View Instructions') {
    displayRecipeInstructions(currentRecipe);
  } else if (event.target.innerText === 'View Ingredients') {
    displayRecipeIngredients(currentRecipe);
  } else if (event.target.innerText === 'Add To Favorites') {
    addRecipeToFavorites(currentRecipe);
  } else if (event.target.innerText === 'Add To Cook') {
    currentUser.addToCookList(currentRecipe);
  }
}

//IDEA for how to dynamically add radio buttons that represent 
//the recipe the user chooses to cook
//
//cook button = document.getElementById('click'), function() {
//   var cookItem = document.createElement('input');
//   cookItem.type = 'radio';
//   cookItem.id = 'cook${recipeid}'; //need to have an id that doesn't start with a number...so put cook behind each unique id??
//   cookItem.value = '${recipe.name';
 
//   var label = document.createElement('label')
//   label.htmlFor = 'cook${recipe.id';
 
//   var description = document.createTextNode('Email');
//   label.appendChild(description);
 
//   var newline = document.createElement('br');
 
//   var container = document.getElementById('container');
//   container.appendChild(radiobox);
//   container.appendChild(label);
//   container.appendChild(newline);
// }

function addRecipeToFavorites(newRecipe) {
  currentUser.addFavoriteRecipe(newRecipe);
}

function removeFavoriteRecipe(id) {
  currentUser.removeFavoriteRecipe(id);
}

function unhideHomeView() {
  allRecipesView.classList.remove('hidden');
  singleRecipeView.classList.add('hidden');
  displayAllRecipeCards(recipesRepo);
  searchInput.placeholder = 'Search Recipes Here';
}

function handleNavButtons(event) {
  if (event.target.innerText === 'Return to Recipes') {
    unhideHomeView();
    pageTitleText.innerText = 'Whats Cookin';
  } else if (event.target.innerText === 'My Favorites') {
    displayFavoriteRecipesView();
  }
}

function displayFavoriteRecipesView() {
  allRecipesView.classList.remove('hidden');
  singleRecipeView.classList.add('hidden');
  displayFavoriteRecipeCards({ recipes: currentUser.favoriteRecipes });
  pageTitleText.innerText = 'Favorite Recipes';
  searchInput.placeholder = 'Search Favorite Recipes';
}