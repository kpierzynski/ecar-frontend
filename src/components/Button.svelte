<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }
  export let color = 'primary';
</script>

<button
  style="--btn-color-0: var(--{color}-0); --btn-color-1: var(--{color}-1); --btn-color-2: var(--{color}-2);"
  on:click={handleClick}
>
  <slot />
</button>

<style>
  button {
    all: unset;
    padding: 1rem;

    text-transform: uppercase;
    cursor: pointer;

    text-align: center;

    border-radius: 1rem;
    border: none;

    font-size: 1.5rem;
    font-weight: bold;

    box-shadow: 0 10px 0 var(--btn-color-2);
    margin-bottom: 10px;
    transition: transform 0.05s ease-in-out, box-shadow 0.05s ease-in-out;

    background-color: var(--btn-color-0);
    color: #eeeeee;
  }

  button:hover {
    background-color: var(--btn-color-1);
  }

  button:active {
    box-shadow: 0 0 0 var(--btn-color-0);
    transform: translateY(10px);
  }
</style>
