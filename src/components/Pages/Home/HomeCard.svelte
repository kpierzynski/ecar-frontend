<script>
  import Card from '@Components/Card.svelte';
  import Pie from '@Components/Pie.svelte';

  export let value;
  export let label;
  export let title;
</script>

<Card>
  <div class="card-content">
    <div>{title}</div>
    <Pie {value} {label} />
  </div>
</Card>

<style>
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
