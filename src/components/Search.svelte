<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let value;

  function handleFilter(value) {
    dispatch('filter', value);
  }

  $: handleFilter(value);
</script>

<input type="text" bind:value />

<style>
  input {
    border-radius: 1rem;
    padding: 1rem;
    border: 1px solid black;
  }
</style>
