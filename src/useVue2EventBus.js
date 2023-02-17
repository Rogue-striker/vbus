export function useVue2EventBus(context) {
  const eventBus = context.root.$eventBus;
  return {
    eventBus,
  };
}
