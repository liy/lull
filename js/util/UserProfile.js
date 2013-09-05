function UserProfile(){
  EventDispatcher.call(this);

  this.sessionKey = null;
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

  var op = ServiceProvider.getInstance().login(this.username, this.password);
  op.addEventListener(Event.COMPLETE, bind(this, this.onComplete));
  op.send();
}

p.onComplete = function(e){
  this.sessionKey = JSON.parse(e.target.responseData).sessionKey;

  console.log(e.target.responseData);

  this.dispatchEvent(e);
}