<script>
  import Button from './Button.svelte';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleViewAll() {
    dispatch('view');
  }
  function handleNew() {
    dispatch('new');
  }
</script>

<aside>
  <Button on:click={() => handleViewAll()} sideText="View all messages"
    >V</Button
  >
  <Button on:click={() => handleNew()} sideText="Add new message">+</Button>
</aside>

<style>
  aside {
    background-color: #222222;
    color: #eeeeee;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;

    width: 20%;
    min-width: 200px;
  }
</style>
