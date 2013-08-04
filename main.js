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

  this.parent = parent;

  this.sync(model);
}
var p = Mediator.prototype = Object.create(EventDispatcher.prototype);

p.sync = function(){
  for(var key in this._model){
    // do not add duplicated getter and setter
    if(this.hasOwnProperty(key))
      continue;

    // close off the value of the key, and also needs to make sure the scope is pointed to the Mediator instance.
    (function(key){

      if(this._model[key] instanceof Object){
        var mediator = this[key] = new Mediator(this._model[key], this);

        Object.defineProperty(this, key, {
          get: function(){
            return mediator;
          },
          set: function(value){
            this._model[key] = value;

            this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
          },
          enumerable: true,
          configurable: true
        });
      }
      else{
        Object.defineProperty(this, key, {
          get: function(){
            return this._model[key];
          },
          set: function(value){
            this._model[key] = value;

            this.propagateEvent(new ModelEvent(ModelEvent.UPDATE));
          },
          enumerable: true,
          configurable: true
        });
      }

    }).call(this, key);
  }
}

p.propagateEvent = function(evt){
  if(this.parent){
    this.dispatchEvent(evt);
    this.parent.propagateEvent(evt);
  }
  else
    this.dispatchEvent(evt);
}









var activityMediator = new Mediator(activity);

activityMediator.addListener(ModelEvent.UPDATE, function(evt){
  console.log('updated');
});


console.log(activityMediator);
activityMediator.scenes = [];

// console.log(activityMediator.scenes);
// console.log(activityMediator.scenes);