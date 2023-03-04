<script>
  import { onMount } from 'svelte';
  import Message from './Message.svelte';

  let data = null;
  let error = null;

  $: console.log(data);

  fetch('http://localhost:3000/api/message')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      data = json.messages;
    })
    .catch((err) => {
      error = err;
    });
</script>

{#if data && data.length}
  <ul>
    {#each data as item}
      <li><Message data={item} /></li>
    {/each}
  </ul>
{:else if error}
  <p>An error occurred: {error.message}</p>
{:else}
  <p>Loading data...</p>
{/if}

<style>
</style>
