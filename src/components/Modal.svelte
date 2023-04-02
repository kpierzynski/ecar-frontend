<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let show = false;

  function close() {
    show = false;
  }

  function closeEsc(e) {
    if (e.key !== 'Escape') return;

    close();
  }

  onMount(() => {
    document.addEventListener('keydown', closeEsc);

    return () => document.removeEventListener('keydown', closeEsc);
  });
</script>

{#if show}
  <div
    class="overlay"
    on:click={close}
    on:keydown|preventDefault={close}
    transition:fade={{ duration: 150 }}
  />
  <div class="content" transition:fade={{ duration: 150 }}>
    <slot />
  </div>
{/if}

<style>
  .overlay {
    background-color: black;
    opacity: 0.5;

    width: 100vw;
    height: 100vh;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 1;
  }

  .content {
    opacity: 1;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -25%);

    z-index: 2;
  }
</style>
