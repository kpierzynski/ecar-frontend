<script>
  export let value;
  export let type = 'text';
  export let title = '';

  export let className = '';
</script>

<div>
  {#if title}
    <div>
      {title}{':'}
    </div>
  {/if}
  {#if type === 'email'}
    <input class={className} bind:value type="email" {...$$props} />
  {:else if type === 'text'}
    <input class={className} bind:value type="text" {...$$props} />
  {:else if type === 'datetime-local'}
    <input class={className} bind:value type="datetime-local" {...$$props} />
  {:else if type === 'number'}
    <input class={className} bind:value type="number" {...$$props} />
  {/if}
</div>

<style>
  div {
    display: flex;
    align-items: baseline;
  }
  input {
    border-radius: 1rem;
    border: 1px solid black;
    padding: 1rem;

    flex-grow: 1;
    background-color: white;
  }

  .registration {
    border-left-width: 2rem;
    border-left-color: blue;
    font-weight: bold;

    text-transform: uppercase;
  }
</style>
