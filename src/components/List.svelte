<script>
  import Message from './Message.svelte';
  import Search from './Search.svelte';
  import Modal from './Modal.svelte';

  import { api_delete, api_get } from '../tools/fetcher';

  async function getAllMessages() {
    return await api_get('/message');
  }

  let promise = getAllMessages();

  async function handleDelete({ detail: id }) {
    await api_delete(`/message/${id}`);
    promise = getAllMessages();
  }
</script>

<div class="container">
  {#await promise}
    <p>...loading...</p>
  {:then { messages }}
    {#if messages && messages.length}
      <div class="list-container list">
        {#each messages as message}
          <Message data={message} on:delete={handleDelete} />
        {/each}
      </div>
    {:else}
      <p>No messages to show.</p>
    {/if}
  {:catch error}
    <p style="color: red">Cannot communicate with server!</p>
    <p>Details: {error.message}</p>
  {/await}
</div>

<style>
  .container {
    padding-top: 1rem;
    text-align: center;
    width: calc(100% - 2rem);
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  /* 2 columns on medium screens */
  @media screen and (max-width: 1200px) {
    .list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* 1 column on small screens */
  @media screen and (max-width: 992px) {
    .list {
      grid-template-columns: 1fr;
    }
  }

  .list-container {
    padding: 1rem;
    gap: 1rem;
  }

  p {
    font-size: 1.5rem;
  }
</style>
