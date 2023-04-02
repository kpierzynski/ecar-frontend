<script>
  import { onMount } from 'svelte';
  import { fade, slide } from 'svelte/transition';
  import Router from 'svelte-spa-router';

  import Sidebar from '@Components/Sidebar.svelte';
  import ErrorModal from '@Components/ErrorModal.svelte';
  import LoadingModal from '@Components/LoadingModal.svelte';

  import MessageList from '@Pages/Messages/MessageList.svelte';
  import NotFound from '@Pages/NotFound.svelte';
  import MessageForm from '@Pages/Messages/MessageForm.svelte';
  import Home from '@Pages/Home/Home.svelte';

  import hamburgerIcon from '@Assets/icons/hamburger.svg';

  import { globalStore } from '@Stores/globalStore';

  let showSidebar = window.screen.width > 480;

  onMount(() => {
    const handleResize = (e) => {
      if (window.screen.width > 480) showSidebar = true;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  $: title = $globalStore.config.globalConfig.pageTitle;
  $: document.title = title;

  function handleSidebarToggle() {
    if (window.screen.width > 480) return;

    showSidebar = !showSidebar;
  }

  // Make this dynamic load in future
  const routes = {
    '/message/:id?': MessageList,
    '/new': MessageForm,
    '/': Home,
    '*': NotFound,
  };
</script>

<div class="container">
  {#if showSidebar}
    <div
      on:click={handleSidebarToggle}
      on:keypress={() => {}}
      transition:fade={{ duration: 150 }}
      class={showSidebar ? 'show sidebar' : 'hide sidebar'}
    >
      <Sidebar />
    </div>
  {/if}
  <div class="navbar">
    <div class="navbar-component">
      <h3>{title}</h3>
      <button on:click={handleSidebarToggle} class="hamburger">
        <img class="icon" src={hamburgerIcon} alt="hamburger" />
      </button>
    </div>
  </div>
  <ErrorModal />
  <LoadingModal />
  <div class="content">
    <Router {routes} />
  </div>
</div>

<style>
  .navbar-component {
    background-color: var(--primary-0);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  h3 {
    margin: 1rem;
  }

  .icon {
    height: 3rem;
    aspect-ratio: 1;
  }

  .content {
    display: flex;
    width: 100vw;
    height: 100vh;

    overflow-y: scroll;
  }

  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar {
    height: 100vh;
  }

  .navbar {
    display: none;
  }

  .hamburger {
    all: unset;
  }

  @media screen and (max-width: 480px) {
    .hide {
      display: none;
    }

    .show {
      display: flex;
    }

    .sidebar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;

      z-index: 4;

      background-color: rgb(0, 0, 0, 0.5);

      width: 100%;
    }

    .navbar {
      display: block;
    }

    .container {
      flex-direction: column;
    }
  }
</style>
