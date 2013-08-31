function Operation(url, method){
  this._xhr = new XMLHttpRequest();
  this._xhr.open(method, url, true);
  this._xhr.onload = bind(this, this.onComplete);
}
var p = Operation.prototype = Object.create(EventDisptacher.prototype);

p.send = function(data){
  this.requestData = data;
  this._xhr.send(this.requestData);
}

p.resend = function(){
  this._xhr.send(this.requestData);
}

p.onComplete = function(e){
  this.responseData = JSON.parse(e.target.responseText);

  this.dispatchEvent(new Event(Event.COMPLETE));
}