<script>
  import Checkbox from '@Components/Checkbox.svelte';
</script>

<Checkbox checked={false} disabled>
  <div class="checkbox-placeholder" />
</Checkbox>

<style>
  .checkbox-placeholder {
    border-radius: 1rem;

    width: 8rem;
    height: 1rem;

    background: linear-gradient(
      -45deg,
      lightgray,
      lightgray,
      rgb(245, 245, 245),
      lightgray,
      lightgray
    );
    background-size: 400% 400%;
    animation: gradient-bg 3s linear infinite;
  }

  @keyframes gradient-bg {
    0% {
      background-position: 110% 50%;
    }
    50% {
      background-position: 50% 50%;
    }
    100% {
      background-position: -10% 50%;
    }
  }
</style>
