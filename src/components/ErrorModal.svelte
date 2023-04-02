<script>
  import Button from '@Components/Button.svelte';
  import Modal from '@Components/Modal.svelte';
  import { globalStore } from '@Stores/globalStore';

  function handleClose() {
    globalStore.clearError();
  }
</script>

<Modal show={$globalStore.error}>
  <div class="container">
    <h1>Error occur</h1>
    {$globalStore.error}
    <Button on:click={handleClose}>Close</Button>
  </div>
</Modal>

<style>
  .container {
    width: 40vw;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgb(238, 238, 238);
    border-radius: 1rem;
    padding: 1rem;
  }

  h1 {
    margin: 0;
    color: rgb(179, 0, 0);
  }
</style>
