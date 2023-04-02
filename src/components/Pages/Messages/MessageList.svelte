<script>
  import { push, location } from 'svelte-spa-router';

  import Search from '@Components/Search.svelte';
  import { messageStore } from '@Stores/messageStore';
  import MessageCard from './MessageCard.svelte';
  import MessageModal from './MessageModal.svelte';

  export let params;
  $: id = params.id;

  let filter = '';
  function handleFilter({ detail: data }) {
    filter = data;
  }

  let loaded = messageStore.loadMessages();
  $: filteredMessages = $messageStore.filter((m) => m.registration.includes(filter.toUpperCase()));

  function handlePick({ detail: { _id } }) {
    push(`/message/${_id}`);
  }
</script>

<div class="container">
  <Search on:filter={handleFilter} />
  {#await loaded then}
    <MessageModal {id} />
  {/await}
  <div class="content">
    {#if !$messageStore.length}
      <p>There is no messages to display!</p>
    {:else if !filteredMessages.length}
      <p>There is no such messages!</p>
    {:else}
      {#each filteredMessages as message}
        <MessageCard data={message} on:click={handlePick} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .container {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .content {
    padding: 1rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    width: calc(100% - 2rem);
  }

  @media screen and (max-width: 1200px) {
    .content {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 1024px) {
    .content {
      grid-template-columns: 1fr;
    }
  }
</style>
