
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
  noStroke(); // Don't draw a border on shapes
  textSize(24);  // If you want to use text()

  // Only draws once:
  // fill(255, 0, 0);
  // x and y position, width and height
  // blendMode(LIGHTEST);
};

var draw = function(){
  

  // // 1. piece of code to show !!!!!!!!!!!!!!!!!!!!
  // //////////////////////////////////////////////////////////////////////////////////
  // ellipse( windowWidth/2, windowHeight/2, 80, 80 );
  // fill(250, 250, 150)
  // rect( windowWidth/2, windowHeight/2, 80, 80 );
  // triangle(80,80,150,100,100,150)
  // text("p5 is pretty darn cool", 100, 200 );  // print some text
  // fill(0, 102, 153)

  // // //////////////////////////////////////////////////////////////////////////////////



  //// 2. piece of code to show !!!!!!!!!!!!!!!!!!!!
  ////////////////////////////////////////////////////////////////////////////////////
  // if( keyIsDown(SHIFT) || mouseIsPressed ){
  //   ellipse( mouseX, mouseY, 80, 80 );
  //   rect( mouseX, mouseY, 80, 80 );
  //   fill(250, 250, 150)
  //   fill( random(255), 255, 255 );  // using H,S,B values now

  // }
  ////////////////////////////////////////////////////////////////////////////////////


    //// 3. piece of code to show !!!!!!!!!!!!!!!!!!!!
  ////////////////////////////////////////////////////////////////////////////////////
  // if( keyIsDown(SHIFT) || mouseIsPressed ){
  //   let hue = map(mouseX, 0, windowWidth, 0, 255 ); // proportionally map the mouse X position to a range of 0-255
  //   ellipse( mouseX, mouseY,  50, 50 );
  //   stroke( hue, 255, 255 )
  //   line(mouseX, mouseY, mouseX + random(-200, 200), mouseY + random(-200, 200) );
  // } // keypress/mouse
  
  ////////////////////////////////////////////////////////////////////////////////////


      //// 4. piece of code to show !!!!!!!!!!!!!!!!!!!!
  ////////////////////////////////////////////////////////////////////////////////////
  // background(0);  // clear screen every frame draw /////////////// Alternate!!!!!

    // if( keyIsDown(SHIFT) || mouseIsPressed ){  
    //   var hue = map(mouseX, 0, windowWidth, 0, 255 ); // proportionally map the mouse X position to a range of 0-255
  
    //   var circle = {
    //     velocityX: random(-10, 10),
    //     velocityY: random(-10, 10),
    //     x: mouseX,
    //     y: mouseY,
    //     hue: hue,
    //     bright: 255
    //   };
    //   circles.push( circle );
  
    //   ////////////////////////////////// Alternate /////////////////////////////////////
    //   // ellipse( mouseX, mouseY,  50, 50 );
    //   // stroke( hue, 255, 255 )
    //   // line(mouseX, mouseY, mouseX + random(-200, 200), mouseY + random(-200, 200) );
    //   // point(mouseX, mouseY);
  
    // } // keypress/mouse
    
    // for (var i = 0; i < circles.length; i++) {
    //   var c = circles[i];
  
    //   // update position of circle based on velocity, and scale by mouse Y position (height)
    //   c.x += c.velocityX * velocityScale;
    //   c.y += c.velocityY * velocityScale;
  

    //   // Wrap around X edges
    //   ////////////////////////////////// Alternate /////////////////////////////////////
    //   // if( c.x >= windowWidth || c.x <= 0 ){
    //   //   c.velocityX *= -1;
    //   // }
    //   // if( c.y >= windowHeight || c.y <= 0 ){
    //   //   c.velocityY *= -1;
    //   // }
  
    //   //
    //   if( c.x >= windowWidth || c.x <= 0 ){
    //     c.x = 0;
    //   } else if( c.x < 0 ){
    //     c.x = windowWidth;
    //   }
  
    //   // Wrap around Y edges
    //   if( c.y > windowHeight){
    //     c.y = 0;
    //   } else if( c.y < 0 ){
    //     c.y = windowHeight;
    //   } // goes through screen and comes out on other end
  
    //   // c.bright--;
  
    //   fill( c.hue, 255, c.bright );
    //   ellipse(c.x, c.y, 50, 50);



      
    // }//for
  ////////////////////////////////////////////////////////////////////////////////////


    //// 5. piece of code to show !!!!!!!!!!!!!!!!!!!!
  ////////////////////////////////////////////////////////////////////////////////////
  // if( keyIsDown(SHIFT) || mouseIsPressed ){



  // var height = random(50, 50);
  // var width =  random(50, 50);
  // triangle(
  //   mouseX, mouseY,  // top
  //   mouseX - width, mouseY + height, // bottom left
  //   mouseX + width, mouseY + height  // bottom right
  // );

  // // triangle(
  // //   random(windowWidth), random(windowHeight),
  // //   random(windowWidth), random(windowHeight),
  // //   random(windowWidth), random(windowHeight),
  // // );
  // var size = random(50, 50)
  // ellipse(
  //   random(windowWidth), random(windowHeight),
  //   size, size
  // );
  // }
  ////////////////////////////////////////////////////////////////////////////////////

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

};
