<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let sideText;

  function handleClick() {
    dispatch('click');
  }
</script>

<div>
  <button on:click={handleClick}><slot /></button>
  <span>{sideText}</span>
</div>

<style>
  button {
    unset: all;

    border-radius: 1rem;
    border: none;

    width: 4rem;
    aspect-ratio: 1;

    font-size: x-large;

    background-color: var(--primary-0);
    color: #eeeeee;
  }

  button:hover {
    background-color: var(--primary-1);
  }

  button:active {
    background-color: var(--primary-2);
  }
</style>
