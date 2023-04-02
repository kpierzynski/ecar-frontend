<script>
  import { push, pop, replace } from 'svelte-spa-router';
  import { messageStore } from '@Stores/messageStore';
  import Button from '@Components/Button.svelte';

  const buttons = [
    {
      title: 'Home',
      cb: () => push('/'),
    },
    {
      line: true,
    },
    {
      title: 'View all',
      cb: () => {
        push('/message');
        messageStore.loadMessages();
      },
    },
    {
      title: 'Add new',
      cb: () => push('/new'),
    },
  ];
</script>

<aside>
  {#each buttons as { title, cb, line }}
    {#if line}
      <hr />
    {:else}
      <Button squared on:click={cb}>{title}</Button>
    {/if}
  {/each}
</aside>

<style>
  aside {
    background-color: #222222;
    color: #eeeeee;

    height: calc(100vh - 2rem);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  hr {
    width: 100%;
  }
</style>
