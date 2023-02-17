import { inject } from "vue";
export function useVue3EventBus() {
  const eventBus = inject("eventBus");
  return {
    eventBus,
  };
}
