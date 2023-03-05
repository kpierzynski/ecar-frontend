<script>
  import Message from './Message.svelte';
  import Search from './Search.svelte';

  async function getAllMessages() {
    const response = await fetch('http://localhost:3000/api/message');
    const body = await response.json();

    if (response.ok) return body;
    else throw new Error('Cannot fetch data from API.');
  }

  let promise = getAllMessages();

  async function handleDelete({ detail: id }) {
    try {
      const response = await fetch(`http://localhost:3000/api/message/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      promise = getAllMessages();
    } catch (e) {
      console.log(e);
    }
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
    <p style="color: red">{error.message}</p>
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
