/**
 * DOM element node.
 */
function Element(el){
  Node.call(this);
  this.el = el || document.createElement('div');
}
var p = Element.prototype = Object.create(Node);