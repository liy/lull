function UserProfile(){
  EventDispatcher.call(this);
}
var p = UserProfile.prototype = Object.create(EventDispatcher.prototype);

UserProfile.getInstance = function(){
  if(!UserProfile.currentProfile)
    UserProfile.currentProfile = new UserProfile();
  return UserProfile.currentProfile;
}

p.login = function(un, ps){
  this.username = un;
  this.password = ps;

  if(!this.sessionKey){
    var op = ServiceProvider.getInstance().login(this.username, this.password);
    op.addEventListener(Event.COMPLETE, bind(this, this.onComplete));
    op.send();
  }
  else{
    this.dispatchEvent(new Event(Event.COMPLETE));
  }
}

p.onComplete = function(e){
  this.sessionKey = JSON.parse(e.target.responseText).sessionKey;

  this.dispatchEvent(e);
}

Object.defineProperty(p, "sessionKey", {
  get: function(){
    return sessionStorage.sessionKey
  },
  set: function(v){
    sessionStorage.sessionKey = v;
  }
});