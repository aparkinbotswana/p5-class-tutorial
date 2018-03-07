document.addEventListener('DOMContentLoaded', function(){

  function changeAttr(el, attr, attrProperty){
    document.querySelector(el).setAttribute(attr, attrProperty);
  }//gets the element. changes attribute, Style in the case of css.
  // changeAttr('#draw', 'style', 'color:red;') EXAMPLE CODE USAGE
}, false);
