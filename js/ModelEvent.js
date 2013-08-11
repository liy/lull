/**
 * ModelEvent
 * @param {String} type      The name of the Event.
 * @param {Object} target    The element that triggered the event.
 * @param {Object} data      Any customized data you want to include.
 */
function ModelEvent(type, target, data){
  Event.call(this, type);

  this.target = target;
  // other data you need
  this.data = data;
}
ModelEvent.prototype = Object.create(Event.prototype);

ModelEvent.UPDATE = 'update';
ModelEvent.ADD = 'add';
ModelEvent.REMOVE = 'remove';