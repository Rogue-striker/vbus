import { inject } from "vue";

export default function useEventBus() {
  const eventBus = inject("eventBus");
  return {
    eventBus,
  };
}
