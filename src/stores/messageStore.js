import { writable } from 'svelte/store';
import { globalStore } from './globalStore';
import { api_get, api_post, api_delete } from '../tools/fetcher';

const createMessageStore = () => {
  const { subscribe, set, update } = writable([]);

  const loadStats = async () => {
    globalStore.setLoading(true);
    try {
      const { stats } = await api_get('/message/stats');
      return stats;
    } catch (error) {
      globalStore.setError('Cannot fetch stats. Internal server error occurs.');
    } finally {
      globalStore.setLoading(false);
    }
  };

  const loadMessages = async () => {
    globalStore.setLoading(true);
    try {
      const { messages } = await api_get('/message');
      set(messages);
    } catch (error) {
      globalStore.setError('Cannot fetch messages. Internal server error occurs.');
    } finally {
      globalStore.setLoading(false);
    }
  };

  const sendMessageById = async (id) => {
    globalStore.setLoading(true);
    try {
      await api_post(`/message/${id}/send`);
      await loadMessages();
    } catch (error) {
      console.log(error);
      globalStore.setError('Cannot send message now. Internal server error occurs.');
    } finally {
      globalStore.setLoading(false);
    }
  };

  const addMessage = async (message) => {
    globalStore.setLoading(true);
    try {
      const { message: newMessage } = await api_post('/message', message);
      update((messages) => [...messages, message]);
    } catch (error) {
      console.log(error);
      globalStore.setError('Cannot add new message. Internal server error occurs.');
    } finally {
      globalStore.setLoading(false);
    }
  };

  const deleteMessageById = async (id) => {
    globalStore.setLoading(true);
    try {
      await api_delete(`/message/${id}`);
      update((messages) => messages.filter((message) => message._id !== id));
    } catch (error) {
      console.log(error);
      globalStore.setError('Cannot delete message. Internal server error occurs.');
    } finally {
      globalStore.setLoading(false);
    }
  };

  return {
    subscribe,
    loadMessages,
    loadStats,
    addMessage,
    sendMessageById,
    deleteMessageById,
  };
};

export const messageStore = createMessageStore();
