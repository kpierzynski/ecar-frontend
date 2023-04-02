<script>
  import { createEventDispatcher } from 'svelte';
  import InputRegistration from '@Components/InputRegistration.svelte';
  const dispatch = createEventDispatcher();
  let value = '';

  function handleFilter(value) {
    dispatch('filter', value.toUpperCase());
  }

  $: handleFilter(value);
</script>

<InputRegistration placeholder="Search by registration..." bind:value />
