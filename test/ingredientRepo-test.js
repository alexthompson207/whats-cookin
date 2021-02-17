const chai = require('chai');
const expect = chai.expect;
const Ingredient = require('../src/Ingredient');
const IngredientRepo = require('../src/IngredientRepo');

describe('Ingredient Repo', () => {
  let ingredientList, defaultIngredientList, ingredientData;
  beforeEach(() => {
    ingredientData = [
      {
        id: 20081,
        name: 'wheat flour',
        estimatedCostInCents: 142,
      },
      {
        id: 18372,
        name: 'bicarbonate of soda',
        estimatedCostInCents: 582,
      },
      {
        id: 1123,
        name: 'eggs',
        estimatedCostInCents: 472,
      },
      {
        id: 1001,
        name: 'butter',
        estimatedCostInCents: 1,
      },
      {
        id: 2,
        name: 'chocolate',
        estimatedCostInCents: 200,
      },
    ];
    defaultIngredientList = new IngredientRepo();
    ingredientList = new IngredientRepo(ingredientData);
  });

  it('should be a function', () => {
    expect(IngredientRepo).to.be.a('function');
  });

  it('should create an instance of IngredientRepo', () => {
    expect(ingredientList).to.be.an.instanceof(IngredientRepo);
  });

  it('should have no Ingredients by default', () => {
    expect(defaultIngredientList.ingredients).to.deep.equal([]);
  });

  it('should hold a list of Ingredients', () => {
    expect(ingredientList.ingredients[0]).to.be.an.instanceof(Ingredient);
  });

  it('should return an ingredient id', () => {
    const ingredientId = ingredientList.returnIngredientId('butter');
    expect(ingredientId).to.equal(1001);
  });

  it('should return false if ingredient id is not found', () => {
    const ingredientId = ingredientList.returnIngredientId('water');
    expect(ingredientId).to.equal(false);
  });

  it('should return an ingredient name', () => {
    const ingredientName = ingredientList.returnIngredientName(1001);
    expect(ingredientName).to.equal('butter');
  });

  it('should return false if ingredient name is not found', () => {
    const ingredientName = ingredientList.returnIngredientName(111);
    expect(ingredientName).to.equal(false);
  });
});
