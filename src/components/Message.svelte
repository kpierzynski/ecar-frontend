<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  import Modal from './Modal.svelte';
  import Button from './Button.svelte';
  export let data;
  export let show;

  $: ({ _id, to, title, content, whenSend, registration, isSent } = data);

  function handleClose() {
    show = false;
  }

  function handleSend() {
    dispatch('sendnow', data);
  }

  function handleDelete() {
    dispatch('delete', data);
  }
</script>

<Modal bind:show>
  <div class="container">
    <div class="mail">
      <div class="header">
        <div class="info">
          <span>to: {to}</span>
          <span>date: {new Date(whenSend).toLocaleString()}</span>
        </div>
        <span class="registration">{registration}</span>
      </div>
      <div class="content">
        <span class="title">{title}</span>
        <span class="preserve-nl">{content}</span>
      </div>
    </div>

    <div class="buttons">
      <Button on:click={handleDelete} color="red">Delete</Button>
      <Button on:click={handleSend} color="orange">Send now</Button>
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
    background-color: rgb(238, 238, 238);
  }
  .title {
    font-weight: bold;
  }
  .content {
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    background-color: rgb(238, 238, 238);
    padding: 1rem;
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
