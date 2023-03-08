<script>
  import { createEventDispatcher } from 'svelte';
  import sentIcon from './../assets/icons/sent.svg';
  import notSentIcon from './../assets/icons/not-sent.svg';
  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch('click', data);
  }

  export let data;
  $: ({ _id, to, title, content, whenSend, registration, isSent } = data);
  $: whenSendString = new Date(whenSend).toLocaleString();
</script>

<div class="container" on:keypress={handleClick} on:click={handleClick}>
  <img src={isSent ? sentIcon : notSentIcon} class="tick" alt="email-status" />

  <span>to: {to}</span>
  <span>registration: {registration}</span>
  <span>title: {title}</span>
  <span>date: {whenSendString}</span>
  {#if content.length > 100}
    <span>content: {content.substring(0, 255)}...</span>
  {:else}
    <span>content: {content}</span>
  {/if}
</div>

<style>
  .container {
    position: relative;
    border-radius: 1rem;

    background-color: rgb(238, 238, 238);

    text-align: start;
    display: flex;
    flex-direction: column;

    padding: 1rem;
    box-shadow: 1rem 1rem 24px -1rem rgba(0, 0, 0, 1);
  }

  .container:hover {
    opacity: 0.75;
  }

  .tick {
    position: absolute;
    right: 1rem;
    top: 0.5rem;

    width: 3rem;
  }
</style>
