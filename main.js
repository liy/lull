var activity = {
  title: "Day after day",
  description: "This is a song from the ancient times",
  updated_at: "1992",
  created_at: "",
  totalScenes: 1,
  scenes:[
    {
      index: 0,
      type: 0,
      scenery: {
        nodes: []
      },
      nodes: [
        {
          type: "text",
          x: 100,
          y: 100,
          width: 200,
          height: 30,
          text: {
            value: "There is a place",
            fontSize: 16,
            color: "#000"
          }
        },
        {
          type: "image",
          x: 200,
          y: 300,
          width: 100,
          height: 60,
          attributes:{
            url: "https://www.google.co.uk/images/srpr/logo4w.png"
          }
        }
      ]
    }
  ],
  userInfo:{
    name: 'liy'
  }
}


// // var loader = new ActivityLoader();
// // loader.load('example/activity.json');

// if (!Object.prototype.watch) {
//   Object.defineProperty(Object.prototype, "watch", {
//     enumerable: false,
//     configurable: true,
//     writable: false,
//     value: function (prop, handler) {
//       var oldval = this[prop], newval = oldval,
//       getter = function () {
//         return newval;
//       },
//       setter = function (val) {
//         oldval = newval;
//         return newval = handler.call(this, prop, oldval, val);
//       };

//       if (delete this[prop]) { // can't watch constants
//         Object.defineProperty(this, prop, {
//           get: getter,
//           set: setter,
//           enumerable: true,
//           configurable: true
//         });
//       }
//     }
//   });
// }

// // object.unwatch
// if (!Object.prototype.unwatch) {
//   Object.defineProperty(Object.prototype, "unwatch", {
//     enumerable: false,
//     configurable: true,
//     writable: false,
//     value: function (prop) {
//       var val = this[prop];
//       delete this[prop]; // remove accessors
//       this[prop] = val;
//     }
//   });
// }


// var mediator = Object.create({});
// mediator.watch('title', function(prop, oldValue, value){
//   var test = 'testasfsaf ';
//   console.log(prop, oldValue, value);
//   console.log(this);
// });

// mediator.title = new Object();
// mediator.title.subTitle = 'test';

function Mediator(model, parent){
  EventDispatcher.call(this);
  this._model = model;

  this.parentMediator = parent;

  this.sync(model);
}
var p = Mediator.prototype = Object.create(EventDispatcher.prototype);

p.sync = function(){
  for(var key in this._model){
    // do not add duplicated getter and setter
    if(this.hasOwnProperty(key))
      continue;

    // close the value of the key, and also needs to pass the scope as well.
    (function(scope, key){

      if(scope._model[key] instanceof Object){
        var mediator = scope[key] = new Mediator(scope._model[key], scope);

        Object.defineProperty(scope, key, {
          get: function(){
            return mediator;
          },
          set: function(value){
            scope._model[key] = value;

            scope.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
          },
          enumerable: true,
          configurable: true
        });
      }
      else{
        Object.defineProperty(scope, key, {
          get: function(){
            return scope._model[key];
          },
          set: function(value){
            scope._model[key] = value;

            scope.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
          },
          enumerable: true,
          configurable: true
        });
      }

    })(this, key);
  }
}

p.propagateEvent = function(evt){
  if(this.parentMediator){
    this.dispatchEvent(evt);
    this.parentMediator.propagateEvent(evt);
  }
  else
    this.dispatchEvent(evt);
}









var activityMediator = new Mediator(activity);

activityMediator.addListener(ModelEvent.UPDATE, function(evt){
  console.log('updated');
});


console.log(activityMediator);
activityMediator._model.news = null;
activityMediator.sync();
activityMediator.news = 2;

// console.log(activityMediator.scenes);
// console.log(activityMediator.scenes);