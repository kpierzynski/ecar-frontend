<script>
  import { fade } from 'svelte/transition';
  import { globalStore } from '@Stores/globalStore';
</script>

{#if $globalStore.loading}
  <div transition:fade={{ duration: 150 }} class="container">
    <div class="spinner" />
  </div>
{/if}

<style>
  .container {
    background-color: black;
    opacity: 0.5;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    display: flex;

    height: 100vh;

    z-index: 10;
  }
  .spinner {
    border: 4px solid white;
    border-top: 4px solid var(--primary-0);
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
