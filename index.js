const fs = require('fs');
const inquirer = require('inquirer');

const iconSize = {
    x: 300,
    y: 200
}

class RenderableObject { //Parent object, contains a Render function that does nothing on its own but is meant to be overriden by its children. Contains base values for child objects
    constructor(color){
        this.color = color
    }
}

RenderableObject.prototype.render = function(){
    console.log("rendering");
}

//=========================================================//

class RenderableText extends RenderableObject{ //Renders text
    constructor(text, color){
        super(color);
        this.text = text;
    }
}

RenderableText.prototype.render = function(){
    return "<text x=\"20\" y=\"60\" font-size=\"40\" fill = \""+this.color+"\">"+this.text+"</text>"
}

//=========================================================//

class RenderableShape extends RenderableObject{ //Renders shapes
    constructor(shape, color){
        super(color);
        this.shape = shape;
    }
}

RenderableShape.prototype.render = function(){
    var extra = "";
    switch(this.shape){
        case "triangle":
            extra = "polygon points = \"50,10 0,90 100,90\"";
            break;
        case "rectangle":
            extra = "rect width = \"80\" height = \"80\" x = \"10\" y = \"10\"";
            break;
        case "circle":
        default:
            extra = "circle cx = \"50\" cy = \"50\" r = \"40\""
            break;
        
    }
    return "<"+extra+" fill=\""+this.color+"\"/>";
}

//=========================================================//

class Icon extends RenderableObject { //Parent object that contains other Renderable Objects
    constructor(text, shape){
        super();
        this.text = text;
        this.shape = shape;
    }

}

Icon.prototype.render = function(){
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
      choices: ["rectangle", "triangle", "circle"]
    },
    {
      type: 'input',
      message: 'Please enter either the keycode or hex code for your shape\'s color.',
      name: 'shapeColor',
    },
  ])
  .then(function(data){ //take data, make new renderable objects with it, then pass them into an icon object and use that one's render function
    var shape = new RenderableShape(data.shape, data.shapeColor);
    var text = new RenderableText(data.text, data.textColor);
    var i = new Icon(text, shape);
    i.render();
  }
  );
