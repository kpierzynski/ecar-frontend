<script>
  import globalStore from './../stores/globalStore';

  import Message from './Message.svelte';
  import MessageCard from './MessageCard.svelte';
  import Search from './Search.svelte';

  import { api_delete, api_get } from '../tools/fetcher';

  async function getAllMessages(...args) {
    return await api_get('/message');
  }

  $: promise = getAllMessages($globalStore.view);
  let showMessage = false;

  async function handleDelete({ detail: { _id: id } }) {
    await api_delete(`/message/${id}`);
    promise = getAllMessages();
    showMessage = false;
  }

  function handleShowModal({ detail: data }) {
    showMessage = data;
  }

  let filter = '';
  function handleFilter({ detail: data }) {
    filter = data.toLowerCase();
  }
</script>

<div class="container">
  <Search on:filter={handleFilter} />
  {#await promise}
    <p>...loading...</p>
  {:then { messages }}
    {#if messages && messages.length}
      <Message
        data={showMessage}
        show={!!showMessage}
        on:sendnow={() =>
          alert(
            'NotImplementedYet. This require new endpoint on api to change values in database.'
          )}
        on:delete={handleDelete}
      />
      <div class="list-container list">
        {#each messages.filter((m) => m.registration.toLowerCase().includes(filter)) as message}
          <MessageCard data={message} on:click={handleShowModal} on:delete={handleDelete} />
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
