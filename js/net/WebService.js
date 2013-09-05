function WebService(endPoint){
  this.endPoint = endPoint;
  if(endPoint.charAt(endPoint.length-1) === "/")
    this.endPoint = endPoint.slice(0, -1);
}
var p = WebService.prototype;

p.getOperation = function(path, method){
  return new Operation(this.endPoint, path, method);
}