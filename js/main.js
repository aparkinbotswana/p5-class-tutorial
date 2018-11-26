
var circles = [];
var velocityScale = 1

var setup = function () {

  createCanvas(windowWidth, windowHeight); // window.innerWidth
  background(0); // black background; could also use RGB: background(0, 0, 0);
  colorMode(HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each

  noStroke(); // Don't draw a border on shapes  
  textSize(24);  // If you want to use text()
  // blendMode(LIGHTEST);
}; // setup function sets up the initial properties of our canvas

var draw = function () {

  background(0) // resets background colour to black at each frame.

  // ellipse(windowWidth/2, windowHeight/2, 80, 80);
  // rect(mouseX, mouseY, 80, 80);
  // text('p5 is cool', 100, 200)

  // fill(250, 250, 150)



  // if (keyIsDown(SHIFT) || mouseIsPressed) {
  //   ellipse(mouseX, mouseY, 80, 80)
  //   // rect(mouseX, mouseY, 80, 80);

  //   fill(random(250), 150, 250)
  // } // First example showing how we can pass random values to get awesome effects


  // if (keyIsDown(SHIFT) || mouseIsPressed) {
  //   var hue = map(mouseX, 0, windowWidth, 0, 255)
  //   ellipse(mouseX, mouseY, 50, 50)
  //   stroke(hue, 255, 255)
  //   line(mouseX, mouseY, mouseX + 200, mouseY + 200)
  // } // Second Example showing how we can use positions in the viewport as values for effects

  // if (keyIsDown(SHIFT) || mouseIsPressed) {
  //   var height = random(50, 50)
  //   var width = random(50, 50)

  //   triangle(
  //     mouseX, mouseY,
  //     mouseX - width, mouseY + height,
  //     mouseX + width, mouseY + height
  //   )

  //   var size = random(50, 50)

  //   ellipse(random(windowWidth), random(windowHeight), size, size)
  // } // Third (shitty) Example showing random values


  if (keyIsDown(SHIFT) || mouseIsPressed) {
    var hue = map(mouseX, 0, windowWidth, 0, 255)


    var circle = {
      velocityX: random(-10, 10),
      velocityY: random(-10, 10),
      x: mouseX,
      y: mouseY,
      hue: hue,
      bright: 255
    };

    circles.push(circle)
  } // fourth (awesome) example bringing it all in for an awesome graphic. HAPPY DAYS

  for (let i = 0; i < circles.length; i++) {
    var c = circles[i]

    c.x += c.velocityX * velocityScale
    c.y += c.velocityY * velocityScale

    if (c.x >= windowWidth || c.x <= 0) {
      c.velocityX *= -1
    }
    if (c.y >= windowHeight || c.y <= 0) {
      c.velocityY *= -1
    }

    // c.bright--
    fill(c.hue, 155, c.bright)
    ellipse(c.x, c.y, random(80), random(80))
    // text('p5 is cool', c.x, c.y)

  } // Fourth Example
} //draw function called at every frame.