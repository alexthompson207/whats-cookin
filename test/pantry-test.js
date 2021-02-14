const chai = require('chai');
const expect = chai.expect;
const Pantry = require('../src/Pantry');
describe.only('Pantry', () => {
  let pantry1, pantry2, contents1, contents2;
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
        "amount": 3
      },
      {
        "ingredient": 8,
        "amount": 1
      },
      {
        "ingredient": 9,
        "amount": 4
      },
      {
        "ingredient": 10,
        "amount": 3
      }];
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
})