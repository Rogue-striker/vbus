import EventBus from "./eventBus";
export default {
  install(app) {
    app.provide("eventBus", EventBus());
  },
};
