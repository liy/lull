/**
 * ModelEvent
 * @param {String} type      The type of the Event
 * @param {Array} keys The Array of keys in the affected model property.
 */
function ModelEvent(type, keys){
  Event.call(this, type);

  this.keys = keys;
}
ModelEvent.prototype = Object.create(Event.prototype);

ModelEvent.UPDATE = 'update';
ModelEvent.ADD = 'add';