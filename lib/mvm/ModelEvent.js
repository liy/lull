/**
 * ModelEvent
 * @param {String} type      The type of the Event
 * @param {String} key The key in the affected model property.
 */
function ModelEvent(type, key, target){
  Event.call(this, type);

  this.target = target;
  this.key = key;
}
ModelEvent.prototype = Object.create(Event.prototype);

ModelEvent.UPDATE = 'update';
ModelEvent.ADD = 'add';