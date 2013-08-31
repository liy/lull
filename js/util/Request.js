function Request(url, method){
  Operation.call(this, url, method);
}
var p = Request.prototype = Object.create(Operation.prototype);

p.onComplete = function(e){
  // TODO: Log whatever you want!

  Operation.onComplete.call(this, e);
}