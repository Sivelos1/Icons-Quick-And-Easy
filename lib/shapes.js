
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

class Triangle extends RenderableObject{ //Renders a triangle
    constructor(color){
        super(color);
    }
}
Triangle.prototype.render = function(){ 
    return "<polygon points = \"50,10 0,90 100,90\" fill=\""+this.color+"\"/>"
};

class Circle extends RenderableObject{ //Renders a circle
    constructor(color){
        super(color);
    }
}
Circle.prototype.render = function() {
    return "<circle cx = \"50\" cy = \"50\" r = \"40\" fill=\""+this.color+"\"/>"
};

class Square extends RenderableObject { //Renders a square
    constructor(color){
        super(color);
    }
}
Square.prototype.render = function() {
    return "<rect width = \"80\" height = \"80\" x = \"10\" y = \"10\" fill=\""+this.color+"\"/>"
};

module.exports = {RenderableObject, RenderableText, Triangle, Square, Circle}