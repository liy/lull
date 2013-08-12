// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/**
 * http://stackoverflow.com/questions/183214/javascript-callback-scope
 * bind function create a closure of a desired scope for the passed in function parameter.
 *
 */
function bind(scope, func) {
    return function () {
        func.apply(scope, arguments);
    };
}

/*
  http://blog.bripkens.de/2011/05/maintaining-and-testing-scope-in-javascript/
  Don't konw which way is better... probably, this is slower than former function approach.
*/
Function.prototype.bind = function(scope){
  var func = this;
  return function(){
    return func.apply(scope, arguments);
  };
};

/**
 * Inherit parent prototype methods and properties. If property or method already exist in the child class's prototype object, it will be ignored.
 * This function make multiple inheritances possible.
 * @param  {Object} child  The child class's prototype object that inherit from the parent prototype object
 * @param  {Object} parent The parent class's prototype object
 */
function inherit(child, parent){
  for(var key in parent){
    if(child.hasOwnProperty(key))
      continue;
    child[key] = parent[key];
  }
}

function getTickCount(){
  return (new Date()).getTime();
}