<script>
  import Input from '@Components/Input.svelte';
  export let value;
</script>

<Input className="registration" {...$$props} bind:value maxlength={16} />
