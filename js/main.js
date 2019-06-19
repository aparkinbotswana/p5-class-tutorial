let circles = [];
let blinks = [];
let trail = {
  coordinates: [],
  properties: []
};
let kaleidoscopeO = [];
let kaleidoscope = {
  coordinates: [],
  properties: []
};

// LAST LITTLE FEATURE TO LOOK INTO ADDING. HAVE A NICE TRANSPARENCY EFFECT THAT GRADUALLY BRINGS THE
// ENTIRE COLOUR INTO FOCUS, RATHER THAN A SUDDEN APPEARANCE OF THE SHAPE/GRAPHIC.

let currentGraphic = null;

var setup = function () {

  createCanvas(windowWidth, windowHeight); // window.innerWidth
  colorMode(HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each
  background(0); // black background; could also use RGB: background(0, 0, 0);
  noStroke(); // Don't draw a border on shapes  
  textSize(36); // If you want to use text()
  
  fill(0, 0, 255);
  textAlign(CENTER);
  text('Tab to switch between graphics', windowWidth / 2, windowHeight / 2);
  text('Shift to clear the screen', windowWidth / 2, (windowHeight / 2) + (36 * 1));
  text('Mouse click to interact', windowWidth / 2, (windowHeight / 2) + (36 * 2));
  text('Enter to begin', windowWidth / 2, (windowHeight / 2) + (36 * 3));

  noLoop();  // stops the draw function from looping. Still calls it once, though.
}; // setup function sets up the initial properties of our canvas

var draw = function () {

  // background(0); // resets background colour to black at each frame.
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
    background(0);
    if (mouseIsPressed) {
      kaleidoscope.coordinates.splice(0, 0, [mouseX, mouseY]);
      const kaleidoscopeSegment = {
        hue: map(mouseX, 0, windowWidth, 0, 255),
        bright: 255
      };
      kaleidoscope.properties.splice(0, 0, kaleidoscopeSegment);
      // const kaleidoscopeO = {
      //   velocityScale: 1,
      //   velocityX: random(-10, 10),
      //   velocityY: random(-10, 10),
      //   x: mouseX,
      //   y: mouseY,
      //   hue: map(mouseX, 0, windowWidth, 0, 255),
      //   bright: 255
      // };
      // kaleidoscopeO.push(kaleidoscope);
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

  // for (let i = 0; i < kaleidoscope.length; i++) {
  //   const k = kaleidoscope[i];

  //   fill((k.x / (windowWidth / 255)), 155, k.bright);
  //   rect(k.x, k.y, 100, 100);
  // } // regular circles flying around the screen having their positions/colour updated every frame
  
  
  for (let i = 0; i < kaleidoscope.properties.length; i++) {
    const kp = kaleidoscope.properties[i];
    const kc = kaleidoscope.coordinates[i];

    fill(kp.hue, kp.bright, kp.bright);
    rect(kc[0], kc[1], 80, 80);
  }
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
    kaleidoscope = {
      coordinates: [],
      properties: []
    };
  } // Clears screen of everything.

  if (keyCode === TAB) {
    if (currentGraphic != 3) {
      currentGraphic++;
    } else {
      currentGraphic = 0;
    } // Switches between available graphics.
  }

  // if (keyCode === ENTER) {
  //   console.log(trail.coordinates);
  // }
} 

