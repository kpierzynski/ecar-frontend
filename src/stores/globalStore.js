import { writable } from 'svelte/store';

const initValue = {
  view: 'all',
};

function createGlobalStore() {
  const { subscribe, set, update } = writable(initValue);

  return {
    subscribe,
    view: (newView) => {
      update((previousValue) => {
        return {
          ...previousValue,
          view: newView,
        };
      });
    },
  };
}

export default createGlobalStore();
