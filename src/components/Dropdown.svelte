<script>
  export let selected;
  export let title;
  // options item shoud has a value key for <option> value
  export let options;
</script>

<select bind:value={selected} required>
  <option disabled selected value=""> {'<-'}{title}{'->'}</option>
  {#each options as option}
    <option value={option.name}>{option.name}</option>
  {/each}
</select>

<style>
  select {
    border-radius: 1rem;
    border: 1px solid black;

    padding: 1rem;
    background-color: white;
  }
</style>
