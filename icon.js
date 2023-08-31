const fs = require('fs');
const inquirer = require('inquirer');

const iconSize = {
    x: 300,
    y: 200
}

class RenderableObject {
    constructor(color){
        this.color = color
    }
}

RenderableObject.prototype.render = function(){
    console.log("rendering");
}

//=========================================================//

class RenderableText extends RenderableObject{
    constructor(text, color){
        super(color);
        this.text = text;
    }
}

RenderableText.prototype.render = function(){
    return "<text x = \"50\" y = \"50\">"+this.text+"</text>"
}

//=========================================================//

class RenderableShape extends RenderableObject{
    constructor(shape, color){
        super(color);
        this.shape = shape;
    }
}

RenderableShape.prototype.render = function(){
    return "<"+this.shape+" cx=\"50\" cy=\"50\" r=\"40\" fill=\""+this.color+"\"/>";
}

//=========================================================//

class Icon extends RenderableObject {
    constructor(text, shape){
        super();
        this.text = text;
        this.shape = shape;
    }

}

Icon.prototype.render = function(){
    var svg = '<svg width=\"'+iconSize.x+'\" height=\"'+iconSize.y+'\" viewBox=\"0 0 100 100\">';
    svg += this.shape.render();
    svg += this.text.render();
    svg += '</svg>'
    fs.writeFile("icon.svg", svg, function(){
        console.log("Finished writing to icon.svg!");
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
  .then(function(data){
    var shape = new RenderableShape(data.shape, data.shapeColor);
    var text = new RenderableText(data.text, data.textColor);
    var i = new Icon(text, shape);
    i.render();
  }
  );
