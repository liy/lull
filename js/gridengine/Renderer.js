/**
 * Abstract class renderer
 */
function Renderer(){

}
var p = Renderer.prototype;

p.render = function(){
  // requestAnimFrame(bind(this, this.render));
  requestAnimFrame.call(window, this.render);
}

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