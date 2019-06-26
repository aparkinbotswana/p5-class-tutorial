

let circles = [];
let blinks = [];
let trail = {
  coordinates: [],
  properties: []
};
let kaleidoscope = [];

// LAST LITTLE FEATURE TO LOOK INTO ADDING. HAVE A NICE TRANSPARENCY EFFECT THAT GRADUALLY BRINGS THE
// ENTIRE COLOUR INTO FOCUS, RATHER THAN A SUDDEN APPEARANCE OF THE SHAPE/GRAPHIC.

let currentGraphic = null;

var setup = function () {

  createCanvas(windowWidth, windowHeight); // window.innerWidth
  colorMode(HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each
  background(0); // black background; could also use RGB: background(0, 0, 0);
  noStroke(); // Don't draw a border on shapes  
  textSize(36); // If you want to use text()
  angleMode(DEGREES)

  
  fill(0, 0, 255);
  textAlign(CENTER);
  text('Tab to switch between graphics', windowWidth / 2, windowHeight / 2);
  text('Shift to clear the screen', windowWidth / 2, (windowHeight / 2) + (36 * 1));
  text('Mouse click to interact', windowWidth / 2, (windowHeight / 2) + (36 * 2));
  text('Enter to begin', windowWidth / 2, (windowHeight / 2) + (36 * 3));

  noLoop();  // stops the draw function from looping. Still calls it once, though.
}; // setup function sets up the initial properties of our canvas

var draw = function () {

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
        bright: 255
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
        bright: 255
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
        bright: 255
      };
      trail.properties.splice(0, 0, trailSegment);
    }
  } // creating an object for trail of circles
  else if (currentGraphic === 0) {
    
    background(0); // Huh???? I think this is obsolete. Check it later. Might have something to do with initial call of draw function and displaying text. May also have something to do with rendering the red lines. Check this out at the end once everything is peachy.
  
        stroke('rgb(100%,0%,10%)');
        line(0, 0, windowWidth, windowHeight)
        line((windowWidth / 2), 0, (windowWidth / 2), windowHeight)
        line(0, (windowHeight / 2), windowWidth, (windowHeight / 2))
        line(0, windowHeight, windowWidth, 0)
        // DELETE THIS CODE AFTERWARDS. LINE CODE TO SEE SEGEMENTS.

    if (mouseIsPressed) {
      let kaleidoscopeProperties = [];
      let hue = map(mouseX, 0, windowWidth, 0, 255);
      let bright = 255;
      let x = mouseX;
      let y = mouseY;
      let xPositionPercentage = (x / windowWidth) * 100;
      let yPositionPercentage = (y / windowHeight) * 100;
      let windowWidthRate = windowWidth / 100;
      let windowHeightRate = windowHeight / 100;
      let size = random(10, 41);
            //   velocityScale: 1,
            //   velocityX: random(-10, 10),
            //   velocityY: random(-10, 10),

      for (let i = 0; i < 8; i++) {
        let mirroredXCoordinate; 
        let mirroredYCoordinate;
        // this allows us to mirror the shape created in all other sections of the kaleidoscope.
        // the inclusion of the 'size' variable in the following if/else further offsets to get exact mirror effect.

        if (i === 0) {
          mirroredXCoordinate = x;
          mirroredYCoordinate = y;
        } else if (i === 1) {
          mirroredXCoordinate = windowWidthRate * yPositionPercentage;
          mirroredYCoordinate = windowHeightRate * xPositionPercentage;
        } else if (i === 2) {
          mirroredXCoordinate = (windowWidth - x) - size;
          mirroredYCoordinate = y;
        } else if (i === 3) {
          mirroredXCoordinate = (windowWidth - (windowWidthRate * yPositionPercentage)) - size;
          mirroredYCoordinate = windowHeightRate * xPositionPercentage;
        } else if (i === 4) {
          mirroredXCoordinate = (windowWidth - (windowWidthRate * yPositionPercentage)) - size;
          mirroredYCoordinate = (windowHeight - (windowHeightRate * xPositionPercentage)) - size;
        } else if (i === 5) {
          mirroredXCoordinate = (windowWidth - x) - size;
          mirroredYCoordinate = (windowHeight - y) - size;
        } else if (i === 6) {
          mirroredXCoordinate = x;
          mirroredYCoordinate = (windowHeight - y) - size;
        } else {
          mirroredXCoordinate = windowWidthRate * yPositionPercentage;
          mirroredYCoordinate = (windowHeight - (windowHeightRate * xPositionPercentage)) - size;
        } // mirrors coordinates into correct positions

        kaleidoscopeProperties['Quater' + i] = {
          hue: hue,
          bright: bright,
          x: mirroredXCoordinate,
          y: mirroredYCoordinate,
          size: size
        };
      }
      kaleidoscope.push(kaleidoscopeProperties);
    }
  }

  for (let i = 0; i < blinks.length; i++) {
    const b = blinks[i];

    b.x += b.velocityX * b.velocityScale;
    b.y += b.velocityY * b.velocityScale;

    if (b.x >= windowWidth || b.x <= 0) {
      b.velocityX *= -1;
    }
    if (b.y >= windowHeight || b.y <= 0) {
      b.velocityY *= -1;
    }

    fill(b.hue, 155, b.bright);
    ellipse(b.x, b.y, random(80), random(80));

  } // blinking circles bouncing around the screen having the position updated every frame

  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];

    if (c.x >= windowWidth || c.x <= 0) {
      c.velocityX *= -1;
    }
    if (c.y >= windowHeight || c.y <= 0) {
      c.velocityY *= -1;
    }

    c.x += c.velocityX * c.velocityScale;
    c.y += c.velocityY * c.velocityScale;
    fill((c.x / (windowWidth / 255)), 155, c.bright);
    ellipse(c.x, c.y, 80, 80);
  } // regular circles flying around the screen having their positions/colour updated every frame
  
  trail.coordinates.pop();
  trail.coordinates.splice(0, 0, [mouseX, mouseY]);
  for (let i = 0; i < trail.properties.length; i++) {
    const tp = trail.properties[i];
    const tc = trail.coordinates[i];

    fill(tp.hue, tp.bright, tp.bright);
    ellipse(tc[0], tc[1], 80, 80);
  }
  
  for (let i = 0; i < kaleidoscope.length; i++) {
    const k = kaleidoscope[i];
    for (const key in k) {
      const currentSegment = k[key];
      fill(currentSegment.hue, 255, currentSegment.bright);
      rect(currentSegment.x, currentSegment.y, currentSegment.size, currentSegment.size);
    }
  } // Get ready to lose your shit!!!!
} //draw function called at every frame.

var keyPressed = function() {
  if (keyCode === ENTER) {
    currentGraphic = 0;
    loop();
  }

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
} // keyPressed function closing. 

