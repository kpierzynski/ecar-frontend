<script>
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import sentIcon from '@Assets/icons/sent.svg';
  import notSentIcon from '@Assets/icons/not-sent.svg';
  const dispatch = createEventDispatcher();

  export let data;
  function handleClick() {
    dispatch('click', data);
  }

  $: ({
    _id,
    to,
    title,
    content,
    whenSend,
    registration,
    isSent,
    cyclic,
    originalDate,
    originalCounter,
  } = data);
  $: whenSendString = new Date(whenSend).toLocaleString();
  $: originalDateString = new Date(originalDate).toLocaleString();
</script>

<div class="container" on:keypress={handleClick} on:click={handleClick}>
  <img src={isSent == 0 ? sentIcon : notSentIcon} class="tick" alt="email-status" />

  <span>TO: {to}</span>
  <span>REGISTRATION: {registration}</span>
  <span>NEXT DELIVERY DATE: {whenSendString}</span>
  <span>CYCLIC DELIVERY: {cyclic / 24 / 3600 / 1000} days</span>
  <span>ORIGINAL DATE: {originalDateString}</span>
  <span>ORIGINAL COUNTER: {originalCounter}</span>
  <span>STATUS: {isSent == 0 ? 'Done sending' : `Pending ${isSent} times.`}</span>
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
