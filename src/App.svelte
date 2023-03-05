<script>
  import globalStore from './stores/globalStore';

  import Sidebar from './components/Sidebar.svelte';
  import List from './components/List.svelte';
  import Form from './components/Form.svelte';

  $: pageSwitch = $globalStore.view;

  $: console.log($globalStore.view);

  function handleNew() {
    globalStore.view('new');
  }

  function handleView() {
    globalStore.view('all');
  }
</script>

<div class="container">
  <Sidebar on:new={handleNew} on:view={handleView} />
  {#if pageSwitch == 'all'}
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
</style>
