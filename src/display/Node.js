function Node(type, mediator, options){
  View.call(this, mediator, options)
  // svg, canvas, text, image, audio, video.
  this.type = type || 'text';
}
var p = Node.prototype = Object.create(View.prototype);