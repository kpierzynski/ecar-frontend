<script>
  import Button from './Button.svelte';
  import Modal from './Modal.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleViewAll() {
    dispatch('view');
  }
  function handleNew() {
    dispatch('new');
  }
  let show = true;
</script>

<aside>
  <Button on:click={() => handleViewAll()}>View all</Button>
  <Button on:click={() => handleNew()}>Add new</Button>
  <Button
    on:click={() => {
      show = !show;
    }}>Toggle modal {show ? '1' : '0'}</Button
  >
  <Modal bind:show><div style="width: 300px; height: 300px; background-color: blue">xd</div></Modal>
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
