<script>
  import { push, pop, replace } from 'svelte-spa-router';
  import { messageStore } from '@Stores/messageStore';
  import { globalStore } from '@Stores/globalStore';
  import Button from '@Components/Button.svelte';
  import Modal from '@Components/Modal.svelte';

  export let id;
  let show = false;

  $: message = $messageStore.find((m) => m._id === id);

  $: if (id) {
    show = true;
    handleError();
  }

  $: if (!show) {
    handleClose();
  }

  function handleClose() {
    show = false;
    push('/message');
  }

  function handleError() {
    if (message) {
      show = true;
      return;
    }

    handleClose();
    globalStore.setError(`Cannot find message with ${id} id. Check link and try again.`);
  }

  function handleSend() {
    messageStore.sendMessageById(id);
    handleClose();
  }

  function handleDelete() {
    messageStore.deleteMessageById(id);
    handleClose();
  }
</script>

<Modal bind:show>
  <div class="container">
    <div class="mail">
      <div class="header">
        <div class="info">
          <span>to: {message?.to}</span>
          <span>date: {new Date(message?.whenSend).toLocaleString()}</span>
        </div>
        <span class="registration">{message?.registration}</span>
      </div>
      <div class="content">
        <span class="title">{message?.title}</span>
        <span class="preserve-nl">{message?.content}</span>
      </div>
    </div>

    <div class="buttons">
      <Button on:click={handleDelete} color="red">Delete</Button>
      <Button on:click={handleSend} color="orange">Send {message?.isSent ? 'again' : 'now'}</Button>
      <Button on:click={handleClose}>Close</Button>
    </div>
  </div>
</Modal>

<style>
  .info {
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--dark-white);
  }
  .title {
    font-weight: bold;
  }
  .content {
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    background-color: var(--dark-white);
    padding: 1rem;

    overflow-y: scroll;
    max-height: 50vh;
  }
  .registration {
    border: 1px solid black;
    border-left-width: 1rem;
    border-left-color: blue;
    border-radius: 0;

    background-color: white;

    padding: 0.5rem;
    padding-left: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
  }
  .container {
    background-color: white;

    border: 1px solid black;
    border-radius: 1rem;
    padding: 1rem;

    text-align: start;

    max-height: 90vh;
  }

  .mail {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .preserve-nl {
    white-space: pre-line;
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin-top: 1rem;
  }
</style>
