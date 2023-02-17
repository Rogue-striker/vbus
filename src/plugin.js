import EventBus from "./eventBus";

export default {
  install(app) {
    if (app.version < 3) {
      app.prototype.$eventBus = EventBus();
    } else {
      app.provide("eventBus", EventBus());
    }
  },
};
