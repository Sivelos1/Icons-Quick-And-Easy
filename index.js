const fs = require('fs');
const inquirer = require('inquirer');
const { RenderableObject, RenderableText, Square, Circle, Triangle } = require('./lib/shapes');

const iconSize = {
    x: 300,
    y: 200
}

//=========================================================//

class Icon extends RenderableObject { //Parent object that contains other Renderable Objects
    constructor(text, shape){
        super();
        this.text = text;
        this.shape = shape;
    }

}

Icon.prototype.render = function(){ //Renders out the complete icon. Easier to just have it all in an object than in the main function
    var svg = '<svg width=\"'+iconSize.x+'\" height=\"'+iconSize.y+'\" viewBox=\"0 0 100 100\">';
    svg += "\n"+this.shape.render();
    svg += "\n"+this.text.render();
    svg += '\n</svg>'
    fs.writeFile("icon.svg", svg, function(err){
        if(err){
            console.error(err);
        }
        else{
            console.log("Successfully wrote to icon.svg!")
        }
    });
}

//=======================================================//

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Please enter up to three letters for your icon.',
      name: 'text',
    },
    {
      type: 'input',
      message: 'Please enter either the keycode or hex code for your text\'s color.',
      name: 'textColor',
    },
    {
      type: 'list',
      message: 'Choose one of the following shapes for your icon.',
      name: 'shape',
      choices: ["square", "triangle", "circle"]
    },
    {
      type: 'input',
      message: 'Please enter either the keycode or hex code for your shape\'s color.',
      name: 'shapeColor',
    },
  ])
  .then(function(data){ //take data, make new renderable objects with it, then pass them into an icon object and use that one's render function
    var shape = null;
    switch(data.shape){
        case "square":
            shape = new Square(data.shapeColor);
            break;
        case "triangle":
            shape = new Triangle(data.shapeColor);
            break;
        case "circle":
          shape = new Circle(data.shapeColor);
          break;
        default:
            shape = new Circle("gray");
            break;

    }
    console.log(shape.color);
    var text = new RenderableText(data.text, data.textColor);
    var i = new Icon(text, shape);
    i.render();
  }
  );
