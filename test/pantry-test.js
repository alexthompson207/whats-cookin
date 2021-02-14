const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
describe('Pantry', () => {
  let pantry1, pantry2, contents1, contents2, recipe1, recipe2, recipe3;
  beforeEach(() => {
    contents1 = [{
      "ingredient": 1,
      "amount": 2
    },
    {
      "ingredient": 2,
      "amount": 3
    },
    {
      "ingredient": 5,
      "amount": 4
    },
    {
      "ingredient": 6,
      "amount": 2
    }];
    contents2 = [
      {
        "ingredient": 7,
        "amount": 8
      },
      {
        "ingredient": 8,
        "amount": 5
      },
      {
        "ingredient": 9,
        "amount": 4
      },
      {
        "ingredient": 10,
        "amount": 3
      }];
    recipe1 = {
      id: 991136,
      image: 'https://spoonacular.com/recipeImages/991136-556x370.jpg',
      ingredients: [
        {
          id: 1,
          quantity: {
            amount: 0.25,
            unit: 'cup',
          },
        },
        {
          id: 2,
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
          id: 7,
          quantity: {
            amount: 5,
            unit: 'cup',
          },
        },
        {
          id: 8,
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
          id: 1,
          quantity: {
            amount: 0.25,
            unit: 'cup',
          },
        },
        {
          id: 2,
          quantity: {
            amount: 6,
            unit: 'unit',
          },
        },
        {
          id: 7,
          quantity: {
            amount: 4,
            unit: 'tbs',
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
    pantry1 = new Pantry(contents1);
    pantry2 = new Pantry(contents2);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', () => {
    expect(pantry1).to.be.an.instanceof(Pantry);
  });

  it('should be able to hold contents of ingredients and amounts', () => {
    expect(pantry1.pantry).to.deep.equal(contents1);
  });

  it('should hold an ingredient id in the contents', () => {
    expect(pantry1.pantry[2].ingredient).to.equal(5);
  });

  it('should hold an amount in the contents', () => {
    expect(pantry1.pantry[1].amount).to.equal(3);
  });

  it('should return a list of missing ingredients', () => {
    const result = pantry1.searchPantry(recipe1);

    expect(result).to.deep.equal([{ id: 2, quantity: { amount: 12, unit: 'unit' } }]);
  });

  it('should return an empty list if user has all recipe ingredients', () => {
    const result = pantry2.searchPantry(recipe2);

    expect(result).to.deep.equal([]);
  });

  it('should be able to evaluate an ingredient amount needed to cook a recipe', () => {
    const missingIngredients = pantry1.searchPantry(recipe1);
    const result = pantry1.calculateMissingIngredients(missingIngredients);

    expect(result).to.deep.equal([
      { id: 2, amount: 9, unit: 'unit' }
    ]);
  });

  it.only('should be able to evaluate multiple ingredient amounts needed to cook a recipe', () => {
    const missingIngredients = pantry1.searchPantry(recipe3);
    const result = pantry1.calculateMissingIngredients(missingIngredients);

    expect(result).to.deep.equal([
      { id: 2, amount: 3, unit: 'unit' },
      { id: 7, amount: 4, unit: 'tbs' }
    ]);
  });

});
