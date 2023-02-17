export default function EventBus() {
  let allEvents = new Map();
  return {
    all: allEvents,
    on: function eventListener(eventName, eventHandler) {
      let handlers = allEvents.get(eventName);
      if (handlers) {
        handlers.push(eventHandler);
      } else {
        allEvents.set(eventName, [eventHandler]);
      }
    },
    off: function eventRemover(eventName) {
      let handlers = allEvents.get(eventName);
      if (handlers) {
        allEvents.set(eventName, []);
      }
    },
    emit: function eventEmitter(eventName, eventData) {
      let handlers = allEvents.get(eventName);
      if (handlers) {
        handlers.map(function (handler) {
          handler(eventData);
        });
      }
    },
  };
}
