var canvas, width, height;

var diameterBig = 25;
var diameterFinal = 15;
var waitStartN = 0;
var waitTimeN;
var waitStartL = 0;
var waitTimeL;
var waitStartNF = 0;
var waitTimeNF;

var nodes = [];
var links = [];
var labels = [];

var nodeLimit = 20
var linkLimit = 10

var nodeFocusX, nodeFocusY;
var maxDist = 100;
var tempx, tempy;

var otherX;
var otherY;
var newNodeDistance;

var names = ["Condorcet", "Diderot", "d'Holbach", "Damilaville", "Marmontel", "Condillac", "Voltaire"];
var namesShuffled;
var namesIndex = 0;
var drawName = true;

function setup() {
  setCanvasDimensions();
  canvas = createCanvas(width, height);
  canvas.parent('sketch-container');

  waitTimeN = 2000;
  waitTimeNF = 16000;
  waitTimeL = 6000;

  namesShuffled = shuffle(names);
  nodeFocusX = width/2;
	nodeFocusY = height/2;
}

function draw() {
  background(245);

  if (nodes.length < nodeLimit) {

    if (millis() > waitStartNF + waitTimeNF) {
      newNodeFocus();
      waitTimeNF = int(random(19, 24)) * 1000;
      waitStartNF = millis();
    }

    if (millis() > waitStartN + waitTimeN) {
      var notDone = true;

      while (notDone) {
        var greenLight = true;

        var angle = random(TWO_PI);
        var rad = random(50, maxDist + 50);
        tempx = nodeFocusX + sin(angle) * rad;
        tempy = nodeFocusY + cos(angle) * rad;

        for (var k = 0; k < nodes.length; k++) {
          otherX = nodes[k].x;
          otherY = nodes[k].y;
          newNodeDistance = dist(otherX, otherY, tempx, tempy);

          if (nodes.length > 1) {
            if (newNodeDistance < 80) {
              greenLight = false;
            }
          }
        }

        if (greenLight) {
          notDone = false;
        }
      }

      nodes.push(new Node(tempx, tempy, drawName));
      waitTimeN = int(random(2, 4)) * 1000;
      waitStartN = millis();
    }
  }

  if (links.length < linkLimit) {
    if (millis() > waitStartL + waitTimeL) {
      var index = int(random(nodes.length))
      var number = constrain(int(random(7, 10)), 1, nodes.length - 1);
      links.push(new Link(index, number));
      waitTimeL = int(random(8, 11)) * 1000;
      waitStartL = millis();
    }
  }

  for (var i = 0; i < links.length; i++) {
    links[i].display();
  }

  for (var i = 0; i < nodes.length; i++) {
    nodes[i].run();
  }

  for (var i = 0; i < labels.length; i++) {
		labels[i].buildIn();
    labels[i].display();
  }

}

function windowResized() {
  setCanvasDimensions();
  resizeCanvas();
}

function setCanvasDimensions() {
  width = document.getElementById('sketch-container').offsetWidth;
  height = document.getElementById('sketch-container').offsetHeight;
}

function Link(index, num) {
  this.col = 160;
  this.alpha = 0;
  this.otherIndex = 0;
  this.otherX = 0;
  this.otherY = 0;
  this.linkDistance = 0;
  this.smallestDist = 5000;
  this.otherIndices = [];
  this.stop = false;

  for (var k = 0; k < nodes.length; k++) {
    this.otherX = nodes[k].x;
    this.otherY = nodes[k].y;
    this.linkDistance = dist(this.otherX, this.otherY, nodes[index].x, nodes[index].y);

    if (this.linkDistance < this.smallestDist && k != index && this.linkDistance < maxDist + 100) {
      for (var l = 0; l < num; l++) {
        if (k == this.otherIndices[l]) {
          this.stop = true;
        }
      }

      if (this.stop == false) {
        this.otherIndices.unshift(k);
        this.smallestDist = this.linkDistance;
      }
    }
  }

  this.display = function() {
    if (this.alpha < 255) {
      this.alpha += 2;
    }

    stroke(this.col, this.alpha);
    for (var i = 0; i < this.otherIndices.length; i++) {
      line(nodes[index].x, nodes[index].y, nodes[this.otherIndices[i]].x, nodes[this.otherIndices[i]].y);
    }
  }
}

function Node(x, y, nameBoolean) {
  this.x = x;
  this.y = y;
  this.dia = 0;
  this.col = 200
  this.growing = true;
  this.shrinking = false;
  this.done = false;
  this.lerpSpd = 0.3;

	if (nameBoolean) {
		labels.push(new Label(this.x, this.y, namesShuffled[namesIndex]));
	  namesIndex++;
		drawName = false;
	}

  this.run = function() {
    this.display();
  }

  this.display = function() {
    if (!this.done) {
      if (this.growing == true && this.dia < diameterBig - 1) {
        this.dia = lerp(this.dia, diameterBig, this.lerpSpd);
      } else if (this.growing == true && this.dia > diameterBig - 1) {
        this.growing = false;
        this.shrinking = true;
      } else if (this.shrinking == true && this.dia > diameterFinal + 1) {
        this.dia = lerp(this.dia, diameterFinal, this.lerpSpd);
      } else if (this.shrinking == true && this.dia < diameterFinal + 1) {
        this.done = true;
      }
    }

    stroke(160);
    fill(this.col);
    //noStroke();
    ellipse(x, y, this.dia, this.dia);
  }
}

function Label(x, y, name) {
  this.pos = createVector(x, y + 4);
  this.txt = name;
	this.col = 245;
	this.xSpeed = 1.3;

	this.buildIn = function() {
		this.xSpeed -= 0.05;
		if (this.xSpeed < 0) this.xSpeed = 0;
		this.pos.x += this.xSpeed;
		this.col -= 4;
		if (this.col < 100) this.col = 100;

	}
  this.display = function() {
		noStroke();
		fill(this.col);
    text(this.txt, this.pos.x, this.pos.y);
  }

}

// function mousePressed() {
//   nodes.push(new Node(mouseX, mouseY));
//   console.log(nodes.length, links.length);
// }

function newNodeFocus() {
  nodeFocusX = random(100, width - 100);
  nodeFocusY = random(100, height - 100);
	drawName = true;
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
