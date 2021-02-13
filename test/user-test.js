const chai = require('chai');
const expect = chai.expect;
const User = require('../src/User');
const Recipe = require('../src/Recipe'); 
const user = require('../src/User');

describe.only('User', () => {
  let userData; 
  let recipe1; 
  let recipe2; 
  let recipe3; 
  let buffaloChicken; 
  let beefNoodle; 
  let spaghetti; 
  let saige; 
  beforeEach(() => {
    userData = [
      {
        'name': 'Saige O\'Kon',
        'id': 1,
        'pantry': [
          {
            'ingredient': 11477,
            'amount': 4
          },
          {
            'ingredient': 11297,
            'amount': 4
          },
          {
            'ingredient': 1082047,
            'amount': 10
          },
          {
            'ingredient': 20081,
            'amount': 5
          },
          {
            'ingredient': 11215,
            'amount': 5
          }
        ]
      }
     ]
     recipe1 = {
      id: 991136,
      image: 'https://spoonacular.com/recipeImages/991136-556x370.jpg',
      ingredients: [
        {
          id: 1001,
          quantity: {
            amount: 0.25,
            unit: 'cup',
          },
        },
        {
          id: 98871,
          quantity: {
            amount: 12,
            unit: 'unit',
          },
        },
      ],
      instructions: [
        { instruction: 'step 1', number: 1 },
        { instruction: 'step 2', number: 2 },
        { instruction: 'step 3', number: 3 },
      ],
      name: 'Buffalo Chicken Example',
      tags: ['lunch', 'main course', 'main dish', 'dinner'],
    };
    recipe2 = {
      id: 2,
      image: 'https://spoonacular.com/recipeImages/595736-556x370.jpg',
      ingredients: [
        {
          id: 302,
          quantity: {
            amount: 10,
            unit: 'cup',
          },
        },
        {
          id: 410,
          quantity: {
            amount: 3,
            unit: 'tbs',
          },
        },
      ],
      instructions: [
        { instruction: 'step 1', number: 1 },
        { instruction: 'step 2', number: 2 },
        { instruction: 'step 3', number: 3 },
      ],
      name: 'Beef Noodle',
      tags: ['noodles', 'main dish', 'hot dish'],
    };
    recipe3 = {
      id: 1234,
      image: 'https://spoonacular.com/recipeImages/991136-556x370.jpg',
      ingredients: [
        {
          id: 1001,
          quantity: {
            amount: 0.25,
            unit: 'cup',
          },
        },
        {
          id: 91,
          quantity: {
            amount: 12,
            unit: 'unit',
          },
        },
        {
          id: 1001,
          quantity: {
            amount: 4,
            unit: 'unit',
          },
        },
      ],
      instructions: [
        { instruction: 'step 1', number: 1 },
        { instruction: 'step 2', number: 2 },
        { instruction: 'step 3', number: 3 },
      ],
      name: 'Spaghetti',
      tags: ['lunch', 'main course', 'main dish', 'dinner'],
    };
    saige = new User(userData[0].name, userData[0].id, userData[0].pantry);

    buffaloChicken = new Recipe(recipe1.id, recipe1.image, recipe1.ingredients, recipe1.instructions, recipe1.name, recipe1.tags); 

    beefNoodle = new Recipe(recipe2.id, recipe2.image, recipe2.ingredients, recipe2.instructions, recipe2.name, recipe2.tags); 

    spaghetti = new Recipe(recipe3.id, recipe3.image, recipe3.ingredients, recipe3.instructions, recipe3.name, recipe3.tags); 
    
  })

  it('should be a function', () => { 
      expect(User).to.be.a('function'); 
  });

  it('should be an instance of user', () => {
    const user = new User();
    expect(user).to.be.an.instanceof(User); 
  })

  it('should have a name, id, pantry, favorite recipes, and recipes to cook', () => {
  
    expect(saige.name).to.equal('Saige O\'Kon');
    expect(saige.id).to.equal(1); 
    expect(saige.pantry).to.deep.equal([
      {
        'ingredient': 11477,
        'amount': 4
      },
      {
        'ingredient': 11297,
        'amount': 4
      },
      {
        'ingredient': 1082047,
        'amount': 10
      },
      {
        'ingredient': 20081,
        'amount': 5
      },
      {
        'ingredient': 11215,
        'amount': 5
      }
    ]); 
    expect(saige.favoriteRecipes).to.deep.equal([]); 
    expect(saige.recipesToCook).to.deep.equal([]);
  })

  it('should add recipes to user\'s favorites', () => {
  
    saige.addFavoriteRecipe(buffaloChicken);
    saige.addFavoriteRecipe(beefNoodle); 

    expect(saige.favoriteRecipes).to.have.lengthOf(2); 
    expect(saige.favoriteRecipes[0]).to.be.an.instanceOf(Recipe); 
  });


  it('should remove a recipe from user\'s favorites', () => {
   
    saige.addFavoriteRecipe(buffaloChicken);
    saige.addFavoriteRecipe(spaghetti);
    saige.addFavoriteRecipe(beefNoodle);  

    saige.removeFavoriteRecipe(spaghetti);

    expect(saige.favoriteRecipes).to.have.lengthOf(2); 
    expect(saige.favoriteRecipes[1].name).to.equal('Beef Noodle');

  });

  it('should add recipes to user\'s cook list', () => {

    saige.addToCookList(buffaloChicken); 
    saige.addToCookList(spaghetti); 

    expect(saige.recipesToCook).to.have.lengthOf(2); 
    expect(saige.recipesToCook[0]).to.be.an.instanceOf(Recipe); 
  })
});
