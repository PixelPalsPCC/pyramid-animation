//from https://medium.com/@ChrisBader/how-to-make-an-iterative-pattern-in-p5-js-765ae03732ec

//for drawing single pyramid
let pyramid, position, diameter, granularity;

//for drawing a wall
let pyramidwall;

function setup() {
  createCanvas(300, 300);
  position = createVector(0, 0);
  diameter = 75;
  granularity = 8;
  pyramid = new PyramidPainter(position, diameter, granularity);

  pyramidwall = new PyramidWall(7, 7);
}

function draw() {
  background(220);

  //drawing a single pyramid
  // pyramid.drawSquares();

  //drawing a wall full of pyramids
  pyramidwall.drawWallOfPyramids();
  pyramidwall.switchRotationModes();
}

//this class draws one pyramid
class PyramidPainter {
  constructor(position, diameter, granularity) {
    this.position = position;
    this.diameter = diameter;
    this.granularity = granularity;
    this.direction = p5.Vector.random2D().normalize().mult(random(0.25, 1));

    //adding motion to the pyramid
    this.rotationMode = true;
    this.rotationAngle = 4;
  }

  drawSquares() {
    //
    let mousePos = createVector(mouseX, mouseY);

    //change direction
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      this.direction = mousePos.sub(this.position).normalize();
    } else {
      this.direction.rotate(radians(this.rotationAngle));
    }

    let stepSize = this.diameter / (2 * this.granularity);
    let squareSize = this.diameter;
    for (let i = 0; i < this.granularity; i++) {
      squareSize = this.diameter - stepSize * 2 * i;
      let posOffset = p5.Vector.mult(this.direction, stepSize * i);
      let newPos = p5.Vector.add(this.position, posOffset);
      this.drawSquare(newPos, squareSize);
    }
  }

  switchRotationMode() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      //for mouse over effect
      this.rotationMode = !this.rotationMode;
    } else {
      // this.direction = p5.Vector.random2D().normalize().mult(random(0.25, 1));
    }
  }

  drawSquare(pos, size) {
    push();
    square(pos.x, pos.y, size);
    pop();
  }
}

class PyramidWall {
  // pyramidPainters: PyramidPainter[];
  constructor(columns, rows) {
    this.pyramidPainters = [];
    let baseWidth = width / columns;
    let baseHeight = height / rows;

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * baseWidth + baseWidth / 2;
        let y = j * baseHeight + baseHeight / 2;
        if(i==3||j==4||i==0){

          this.pyramidPainters.push(
            new PyramidPainter(createVector(x, y), baseWidth, 6)
          );
        }
      }
    }
  }

  drawWallOfPyramids() {
    this.pyramidPainters.forEach(function (painter) {
      painter.drawSquares();
    });
  }

  switchRotationModes() {
    this.pyramidPainters.forEach(function (painter) {
      painter.switchRotationMode();
    });
  }
}
