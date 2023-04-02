import { writable } from 'svelte/store';
import { api_get } from '@Tools/fetcher';

const emptyConfig = {
  mailConfig: {},
  globalConfig: {},
  appointmentTypes: {},
  partTypes: {},
};

const cfg = await fetchConfig();

async function fetchConfig() {
  try {
    const { config } = await api_get('/config');
    return config;
  } catch (e) {
    return emptyConfig;
  }
}

const createGlobalStore = () => {
  const { subscribe, set, update } = writable({
    loading: false,
    error: false,
    config: cfg,
  });

  const setError = (message) => {
    update((state) => ({ ...state, error: message }));
  };

  const clearError = () => {
    update((state) => ({ ...state, error: false }));
  };

  const setLoading = (isLoading) => {
    update((state) => ({ ...state, loading: isLoading }));
  };

  return {
    subscribe,
    setError,
    clearError,
    setLoading,
  };
};

const globalStore = createGlobalStore();
export { globalStore };
