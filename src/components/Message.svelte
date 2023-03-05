<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleDelete() {
    dispatch('delete', _id);
  }

  export let data;
  const { _id, to, title, content, whenSend, registration, isSent } = data;
  $: whenSendString = new Date(whenSend).toLocaleString();
</script>

<div class="container">
  <div class={isSent ? 'tick sent' : 'tick not-sent'}>{isSent ? '✔' : '✗'}</div>

  <span>to: {to}</span>
  <span>registration: {registration}</span>
  <span>title: {title}</span>
  <span>date: {whenSendString}</span>
  {#if content.length > 100}
    <span>content: {content.substring(0, 255)}...</span>
  {:else}
    <span>content: {content}</span>
  {/if}
  <button class="delete" on:click={handleDelete}>delete</button>
</div>

<style>
  .container {
    position: relative;
    border-radius: 1rem;

    text-align: start;
    display: flex;
    flex-direction: column;

    border: 1px solid var(--primary-0);

    padding: 1rem;
    box-shadow: 1rem 1rem 24px -1rem rgba(0, 0, 0, 1);
  }

  .container:hover {
    opacity: 0.75;
  }

  button {
    all: unset;

    position: absolute;
    bottom: 0.5rem;
    right: 1rem;

    cursor: pointer;
  }

  button:hover {
    text-decoration: underline;
  }

  .tick {
    position: absolute;
    right: 1rem;
    top: 0.5rem;

    font-size: 2rem;
  }

  .not-sent {
    color: orange;
  }

  .sent {
    color: green;
  }
</style>
