<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let prop;

  let counter = 0;

  $: console.log('Count changed to', counter);

  function callMe() {
    dispatch('message', {
      body: 2,
    });
  }

  function handleClick() {
    counter++;
  }
</script>

<main>
  {#if prop}
    <p>Empty project in Svelte! {prop}</p>
  {:else}
    <p>Empty project in Svelte!</p>
  {/if}
  <button on:click={handleClick}>Click</button>
  <p class="counter">Counter:{counter}</p>
</main>

<style>
  main {
    text-decoration: wavy;
    text-align: center;
    font-size: var(--test-var);
  }
</style>
