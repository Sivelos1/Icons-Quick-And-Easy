
const { RenderableObject, RenderableText, Square, Circle, Triangle } = require('./shapes');

describe('RenderableText', () => {
  // A test is created to check that sum does in fact return the two numbers added together.
  describe('.render(), with the arguments \'IQE\' for text and \'white\' for color.', () => {
    it('Should output \'<text x=\"20\" y=\"60\" font-size=\"40\" fill = \"white\">IQE</text>\'', () => {
        var t = new RenderableText("IQE", "white");
        expect(t.render()).toEqual('<text x=\"20\" y=\"60\" font-size=\"40\" fill = \"white\">IQE</text>')
    });
  });
});
describe('Renderable Objects', () => {
    // A test is created to check that sum does in fact return the two numbers added together.
    describe('Triangle, with \'red\' for its color.', () => {
      it('Should output \'<polygon points = \"50,10 0,90 100,90\" fill=\"red\"/>\'', () => {
          var t = new Triangle("red");
          expect(t.render()).toEqual('<polygon points = \"50,10 0,90 100,90\" fill=\"red\"/>')
      });
    });
    describe('Circle, with \'blue\' for its color.', () => {
        it('Should output \'<circle cx = \"50\" cy = \"50\" r = \"40\" fill=\"blue\"/>\'', () => {
            var t = new Circle("blue");
            expect(t.render()).toEqual('<circle cx = \"50\" cy = \"50\" r = \"40\" fill=\"blue\"/>')
        });
      });
      describe('Square, with \'yellow\' for its color.', () => {
        it('Should output \'<rect width = \"80\" height = \"80\" x = \"10\" y = \"10\" fill=\"yellow\"/>\'', () => {
            var t = new Square("yellow");
            expect(t.render()).toEqual('<rect width = \"80\" height = \"80\" x = \"10\" y = \"10\" fill=\"yellow\"/>')
        });
      });
  });
