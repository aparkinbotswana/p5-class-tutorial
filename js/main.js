const kaleidoscopeProperties = () => {
  const chooseShape = (x, y, w, h, r) => {
    let randomNum = Math.floor(Math.random() * Math.floor(2));
    if (randomNum === 0) {
      return function (x, y, w, h, r) {rect(x, y, w, h, r)};
    } else if (randomNum === 1) {
      return function (x, y, w, h) {ellipse(x, y, w, h)};
    }
  }; // this function randomises the shapes which are rendered in the draw function for the KS. Add more to it for further shapes.

  let makeKaleidoscope = {
    lifespan: 600,
    segments: []
  };
  let hue = map(mouseX, 0, windowWidth, 0, 255);
  let brightness = 255;
  let alpha = 5;
  let radius = 8;
  let degrees = 45;
  let x = mouseX;
  let y = mouseY;
  let xPositionPercentage = (x / windowWidth) * 100;
  let yPositionPercentage = (y / windowHeight) * 100;
  let windowWidthRate = windowWidth / 100;
  let windowHeightRate = windowHeight / 100;
  let size = random(10, 41);
  let rotation = random(1, 5);
  let velocityScale = 0.3;
  let velocityX = random(-10, 10);
  let velocityY = random(-10, 10);
  let shape = chooseShape(x, y, size, size, radius);

  for (let i = 0; i < 8; i++) {
    let mirroredXCoordinate; 
    let mirroredYCoordinate;
    let mirroredVelocityX;
    let mirroredVelocityY;
  // kaleidoscope sectioned into 8 segments on the screen
  // following if/else allows us to mirror the shape created in all other sections of the kaleidoscope.
    if (i === 0) {
      mirroredXCoordinate = x;
      mirroredYCoordinate = y;
      mirroredVelocityX = velocityX
      mirroredVelocityY = velocityY
    } else if (i === 1) {
      mirroredXCoordinate = windowWidthRate * yPositionPercentage;
      mirroredYCoordinate = windowHeightRate * xPositionPercentage;
      mirroredVelocityX = velocityX * -1
      mirroredVelocityY = velocityY * -1
    } else if (i === 2) {
      mirroredXCoordinate = (windowWidth - x);
      mirroredYCoordinate = y;
      mirroredVelocityX = velocityX * -1
      mirroredVelocityY = velocityY 
    } else if (i === 3) {
      mirroredXCoordinate = (windowWidth - (windowWidthRate * yPositionPercentage));
      mirroredYCoordinate = windowHeightRate * xPositionPercentage;
      mirroredVelocityX = velocityX 
      mirroredVelocityY = velocityY * -1
    } else if (i === 4) {
      mirroredXCoordinate = (windowWidth - (windowWidthRate * yPositionPercentage));
      mirroredYCoordinate = (windowHeight - (windowHeightRate * xPositionPercentage));
      mirroredVelocityX = velocityX
      mirroredVelocityY = velocityY
    } else if (i === 5) {
      mirroredXCoordinate = (windowWidth - x);
      mirroredYCoordinate = (windowHeight - y);
      mirroredVelocityX = velocityX * -1
      mirroredVelocityY = velocityY * -1
    } else if (i === 6) {
      mirroredXCoordinate = x;
      mirroredYCoordinate = (windowHeight - y);
      mirroredVelocityX = velocityX
      mirroredVelocityY = velocityY * -1
    } else {
      mirroredXCoordinate = windowWidthRate * yPositionPercentage;
      mirroredYCoordinate = (windowHeight - (windowHeightRate * xPositionPercentage));
      mirroredVelocityX = velocityX * -1
      mirroredVelocityY = velocityY
    } // mirrors coordinates/shapes into correct positions on screen and sets correct direction.
    makeKaleidoscope.segments["segment" + i] = {
      hue: hue,
      alpha: alpha,
      radius: radius,
      degrees: degrees,
      brightness: brightness,
      x: mirroredXCoordinate,
      y: mirroredYCoordinate,
      size: size,
      rotation: rotation,
      velocityScale: velocityScale,
      velocityX: mirroredVelocityX,
      velocityY: mirroredVelocityY,
      shape: shape
    }; // creates an object with above properties on the fly for each segment of the screen.
  };
  return makeKaleidoscope;
};

let circles = [];
let blinks = [];
let trail = {
  coordinates: [],
  properties: []
};
let kaleidoscope = [];

const wallCollideCheck = (graphic) => {
  if (graphic.x >= windowWidth || graphic.x <= 0) {
    graphic.velocityX *= -1;
  }
  if (graphic.y >= windowHeight || graphic.y <= 0) {
    graphic.velocityY *= -1;
  }
} // Checks to see if shapes collide with bounds and makes them 'bounce' off if they do.

let currentGraphic = 0;

var setup = function() {

  createCanvas(windowWidth, windowHeight); // window.innerWidth
  colorMode(HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each
  background(0); // black background; could also use RGB: background(0, 0, 0);
  noStroke(); // Don't draw a border on shapes  
  textSize(36); // If you want to use text()
  angleMode(DEGREES);
  rectMode(CENTER)
  fill(0, 0, 255);
  // textAlign(CENTER);
  // text('Tab to switch between graphics', windowWidth / 2, windowHeight / 2);
  // text('Shift to clear the screen', windowWidth / 2, (windowHeight / 2) + (36 * 1));
  // text('Mouse click to interact', windowWidth / 2, (windowHeight / 2) + (36 * 2));
  // text('Enter to begin', windowWidth / 2, (windowHeight / 2) + (36 * 3));
  // noLoop();  // stops the draw function from looping. Still calls it once, though
}; // setup function sets up the initial properties of our canvas

var draw = function() {
    // x += 0.04;
    // translate(width / 2, height / 2);
    // rotate(x);
    // rect(0, 0, 100, 100);

  //following if statement switches between different graphics
  if (currentGraphic === 2) {
    background(0);
    if (mouseIsPressed) {
      const blink = {
        velocityScale: 1,
        velocityX: random(-10, 10),
        velocityY: random(-10, 10),
        x: mouseX,
        y: mouseY,
        hue: (mouseX / (windowWidth / 255)),
        brightness: 255
      };
      blinks.push(blink);
    }
  } // creating an object for blinking circles bouncing around the screen
  else if (currentGraphic === 1) {
    background(0);
    if (mouseIsPressed) {
      const circle = {
        velocityScale: 1,
        velocityX: random(-10, 10),
        velocityY: random(-10, 10),
        x: mouseX,
        y: mouseY,
        hue: map(mouseX, 0, windowWidth, 0, 255),
        brightness: 255
      };
      circles.push(circle);
    }
  } // creating an object for circles flying around and off the screen
  else if (currentGraphic === 3) {
    background(0);
    if (mouseIsPressed) {
      trail.coordinates.splice(0, 0, [mouseX, mouseY]);
      const trailSegment = {
        hue: map(mouseX, 0, windowWidth, 0, 255),
        brightness: 255
      };
      trail.properties.splice(0, 0, trailSegment);
    }
  } // creating an object for trail of circles
  else if (currentGraphic === 0) {
    background(0);
        // translate(width / 2, height / 2);
        //rect(50, 50, 50, 50)
        // rotate(frameCount*4);

                    // stroke('rgb(100%,0%,10%)');
                    // line(0, 0, windowWidth, windowHeight)
                    // line((windowWidth / 2), 0, (windowWidth / 2), windowHeight)
                    // line(0, (windowHeight / 2), windowWidth, (windowHeight / 2))
                    // line(0, windowHeight, windowWidth, 0)
    if (mouseIsPressed) {
      kaleidoscope.push(kaleidoscopeProperties());
    }
  }

  for (let i = 0; i < blinks.length; i++) {
    const b = blinks[i];

    b.x += b.velocityX * b.velocityScale;
    b.y += b.velocityY * b.velocityScale;
    wallCollideCheck(b);

    fill(b.hue, 155, b.brightness);
    ellipse(b.x, b.y, random(80), random(80));
  } // blinking circles bouncing around the screen having the position updated every frame

  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];

    c.x += c.velocityX * c.velocityScale;
    c.y += c.velocityY * c.velocityScale;
    wallCollideCheck(c);

    fill((c.x / (windowWidth / 255)), 155, c.brightness);
    ellipse(c.x, c.y, 80, 80);
  } // regular circles flying around the screen having their positions/colour updated every frame
  
  trail.coordinates.pop();
  trail.coordinates.splice(0, 0, [mouseX, mouseY]);
  for (let i = 0; i < trail.properties.length; i++) {
    const tp = trail.properties[i];
    const tc = trail.coordinates[i];

    fill(tp.hue, tp.brightness, tp.brightness);
    ellipse(tc[0], tc[1], 10, 10);
  }
  
  for (let i = 0; i < kaleidoscope.length; i++) {
    const k = kaleidoscope[i].segments;


          let translateOffsetX;
          let translateOffsetY;


    for (const key in k) {
      const currentSegment = k[key];
      fill(currentSegment.hue, 255, currentSegment.brightness, currentSegment.alpha);
      // rotate(45);
      wallCollideCheck(currentSegment);
      if (kaleidoscope[i].lifespan <= 150) {
        currentSegment.alpha -= 1;
      } else if (currentSegment.alpha != 150) {
        currentSegment.alpha += 1;
      }
            if (key != 'segment0') {
              translateOffsetX = currentSegment.x;
              translateOffsetY = currentSegment.y;
            } else {
              translateOffsetX = 0;
              translateOffsetY = 0;
            }

      currentSegment.rotation += 0.003;
      currentSegment.x += currentSegment.velocityX * currentSegment.velocityScale;
      currentSegment.y += currentSegment.velocityY * currentSegment.velocityScale;
      // currentSegment.shape(10, 10, currentSegment.size, currentSegment.size, currentSegment.radius);
      currentSegment.shape(currentSegment.x, currentSegment.y, currentSegment.size, currentSegment.size, currentSegment.radius);
      // ellipse(currentSegment.x, currentSegment.y, currentSegment.size, currentSegment.size);
      // rect(currentSegment.x, currentSegment.y, currentSegment.size, currentSegment.size);
            // console.log(translateOffsetX);
            // console.log(k[key]);
      // translate(currentSegment.x - translateOffsetX, currentSegment.y - translateOffsetY);
      // rotate(currentSegment.rotation);
    }
    // noLoop()
    kaleidoscope[i].lifespan -= 1
    if (kaleidoscope[i].lifespan === 0) {
      kaleidoscope.shift();
    } // deletes first element from array once it has reached the end of its lifespan
  } // Get ready to lose your shit!!!!
} //draw function called at every frame.

var keyPressed = function() {
  if (keyCode === SHIFT) {
    circles = [];
    blinks = [];
    trail = {
      coordinates: [],
      properties: []
    };
    kaleidoscope = [];
  } // Clears screen of everything.
  if (keyCode === TAB) {
    if (currentGraphic != 3) {
      currentGraphic++;
    } else {
      currentGraphic = 0;
    } // Switches between available graphics.
  }
  if (keyCode === 90) {
    noLoop();
  }
} // keyPressed function closing. 