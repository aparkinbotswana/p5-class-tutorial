document.addEventListener('DOMContentLoaded', function(){
  function changeAttr(el, attr, attrProperty){
    document.querySelector(el).setAttribute(attr, attrProperty);
  }//gets the element. changes attribute, Style in the case of css.

  // changeAttr('#draw', 'style', 'color:red;') EXAMPLE CODE USAGE

  let request = new XMLHttpRequest();
    request.open('GET', 'url/url/yummy', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        let data = JSON.parse(request.responseText);
        console.log(data);
      } else {
        console.log('We reached our target server, but it returned an error');
      }
    };
    request.onerror = function() {
      console.log('There was a connection error of some sort');
    };
    request.send();
    
}, false);
