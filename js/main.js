
var circles = [];
var velocityScale = 1;

// Need to run 'python -m SimpleHTTPServer' in this folder and open the page via localhost:8000/
// in order for Javascript to have permission to load local files
//
// var img;
//
// function preload() {
//   // need a special function because async file load takes some time, so make sure we wait!
//   img = loadImage("doggo.jpg");
// }


var setup = function(){

  createCanvas( windowWidth, windowHeight ); // window.innerWidth
  background(0); // black background; could also use RGB: background(0, 0, 0);

  colorMode(HSB, 255); // Use Hue Saturation Brightness, with a range of 0-255 for each

  // noStroke(); // Don't draw a border on shapes

  // Only draws once:
  // fill(255, 0, 0);
  // x and y position, width and height
  // ellipse( windowWidth/2, windowHeight/2, 80, 80 );

  // textSize(24);  // If you want to use text()
  // blendMode(LIGHTEST);
};

var draw = function(){

  background(0);  // clear screen every frame draw

  // fill(255);
  // text("framerate: " + parseInt( frameRate() ), 10, 20 );  // print some text

  if( keyIsDown(SHIFT) || mouseIsPressed ){

    // ellipse( mouseX, mouseY, 80, 80 );
    // rect( mouseX, mouseY, 80, 80 );

    // fill( random(255), 255, 255 );  // using H,S,B values now
    // counter++;
    // if(counter > 255){
    //   counter = 0;
    // }

    var hue = map(mouseX, 0, windowWidth, 0, 255 ); // proportionally map the mouse X position to a range of 0-255

    var circle = {
      velocityX: random(-10, 10),
      velocityY: random(-10, 10),
      x: mouseX,
      y: mouseY,
      hue: hue,
      bright: 255
    };
    circles.push( circle );

    // ellipse( mouseX, mouseY,  50, 50 );
    // stroke( hue, 255, 255 )
    // line(mouseX, mouseY, mouseX + random(-200, 200), mouseY + random(-200, 200) );
    // point(mouseX, mouseY);

  } // keypress/mouse

  if( keyIsDown(CONTROL) ){
    velocityScale = map(mouseY, 0, windowHeight, -2, 2);
  }

  var sineRangeScale = map(mouseX, 0, windowWidth, 0, 50);

  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];

    // update position of circle based on velocity, and scale by mouse Y position (height)
    c.x += c.velocityX * velocityScale;
    c.y += c.velocityY * velocityScale;

    // Wrap around X edges
    if( c.x >= windowWidth || c.x <= 0 ){
      c.velocityX *= -1;
    }
    if( c.y >= windowHeight || c.y <= 0 ){
      c.velocityY *= -1;
    }

    //
    // if( c.x >= windowWidth || c.x <= 0 ){
    //   c.x = 0;
    // } else if( c.x < 0 ){
    //   c.x = windowWidth;
    // }

    // // Wrap around Y edges
    // if( c.y > windowHeight){
    //   c.y = 0;
    // } else if( c.y < 0 ){
    //   c.y = windowHeight;
    // }

    // c.bright--;

    fill( c.hue, 255, c.bright );
    ellipse(
      c.x,
      c.y,
      // c.x + Math.sin(frameCount/5) * sineRangeScale,  // add sine wigggle (scaled by mouseX)
      // c.y + Math.cos(frameCount/5) * sineRangeScale,  // add cos wiggle (scaled by mouseY)

      50, // * Math.sin(frameCount/10)* 2,
      50, // * Math.sin(frameCount/10)*2
    );
  }//for

  // draw img from file at mouse position
  // image(img, mouseX, mouseY); // add image dimensions: use img.width / N



  // var height = random(100, 500);
  // var width =  random(100, 500);
  // triangle(
  //   mouseX, mouseY,  // top
  //   mouseX - width, mouseY + height, // bottom left
  //   mouseX + width, mouseY + height  // bottom right
  // );

  // triangle(
  //   random(windowWidth), random(windowHeight),
  //   random(windowWidth), random(windowHeight),
  //   random(windowWidth), random(windowHeight),
  // );
  // var size = random(50, 150)
  // ellipse(
  //   random(windowWidth), random(windowHeight),
  //   size, size
  // );

};
