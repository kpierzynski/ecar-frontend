<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let prop = 1;

  function callMe() {
    dispatch('message', {
      body: 2,
    });
  }
</script>

{#if prop === 1}
  <main>!Empty project in Svelte! {prop}</main>
{:else}
  <main>Empty project in Svelte! {prop}</main>
{/if}

<style>
  main {
    text-decoration: wavy;
    text-align: center;
    font-size: var(--test-var);
  }
</style>
