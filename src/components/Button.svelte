<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click');
  }
</script>

<button on:click={handleClick}><slot /></button>

<style>
  button {
    all: unset;
    padding: 1rem;

    text-transform: uppercase;
    cursor: pointer;

    text-align: center;

    border-radius: 1rem;
    border: none;

    font-size: x-large;

    box-shadow: 0 10px 0 var(--primary-2);
    margin-bottom: 10px;
    transition: transform 0.05s ease-in-out, box-shadow 0.05s ease-in-out;

    background-color: var(--primary-0);
    color: #eeeeee;
  }

  button:hover {
    background-color: var(--primary-1);
  }

  button:active {
    box-shadow: 0 0 0 var(--primary-0);
    transform: translateY(10px);
  }
</style>
