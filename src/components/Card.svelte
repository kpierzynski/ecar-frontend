<div class="card"><slot /></div>

<style>
  .card {
    position: relative;
    border-radius: 1rem;

    background-color: var(--dark-white);

    padding: 1rem;
    box-shadow: 1rem 1rem 24px -1rem rgba(0, 0, 0, 1);
  }

  .card:hover {
    opacity: 0.75;
  }
</style>
