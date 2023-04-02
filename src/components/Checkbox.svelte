<script>
  export let checked;
  export let disabled = false;
  export let required = false;
</script>

<div>
  <input type="checkbox" {disabled} {required} bind:checked />
  <slot />
</div>

<style>
  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  input[type='checkbox'] {
    width: 2rem;
    aspect-ratio: 1;
  }

  input[type='checkbox']:checked {
    accent-color: var(--primary-0);
  }
</style>
