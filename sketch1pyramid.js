let pyramid, position, diameter, granularity;

class PyramidPainter {

  constructor(position, diameter, granularity) {
    this.position = position;
    this.diameter = diameter;
    this.granularity = granularity;

    this.direction = p5.Vector.random2D().normalize().mult(random(0.25, 1));
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

  }

  drawSquare(pos, size) {
    square(pos.x, pos.y, size);
  }

}






function setup() {
  createCanvas(300, 300);

  position = createVector(0, 0);
  diameter = 75;
  granularity = 8;

  pyramid = new PyramidPainter(position, diameter, granularity);
}

function draw() {
  background(220);

  //drawing a single pyramid
  pyramid.drawSquares();
}
