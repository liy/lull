function WebService(endPoint){
  this.endPoint = endPoint.charAt(endPoint.length-1) === '/' ? endPoint : endPoint + '/';
}
var p = WebService.prototype;

p.getOperation = function(path, method){
  var p = path.charAt(0) === '/' ? path.substring(1) : path;
  return new Operation(this.endPoint + p, method);
}