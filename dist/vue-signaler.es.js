import { inject as l } from "vue";
function o() {
  let e = /* @__PURE__ */ new Map();
  return {
    all: e,
    on: function(t, n) {
      let s = e.get(t);
      s ? s.push(n) : e.set(t, [n]);
    },
    off: function(t) {
      e.get(t) && e.set(t, []);
    },
    emit: function(t, n) {
      let s = e.get(t);
      s && s.map(function(i) {
        i(n);
      });
    }
  };
}
const f = {
  install(e) {
    e.provide("eventBus", o());
  }
};
function v() {
  return {
    eventBus: l("eventBus")
  };
}
export {
  f as eventBus,
  v as useEventBus
};
