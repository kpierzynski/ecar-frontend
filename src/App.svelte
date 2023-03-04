<script>
  import Sidebar from './components/Sidebar.svelte';
  import List from './components/List.svelte';
  import Form from './components/Form.svelte';

  let pageSwitch = 'view';

  function handleNew() {
    pageSwitch = 'new';
  }

  function handleView() {
    pageSwitch = 'view';
  }
</script>

<div class="container">
  <Sidebar on:new={handleNew} on:view={handleView} />
  {#if pageSwitch == 'view'}
    <List />
  {:else if pageSwitch == 'new'}
    <Form />
  {:else}
    <div>Error occur, please refresh page</div>
  {/if}
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;

    height: 100vh;
  }

  main {
    text-decoration: wavy;
    text-align: center;
    background-color: #eeeeee;
    width: 100%;
  }
</style>
