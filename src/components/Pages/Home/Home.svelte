<script>
  import Card from '@Components/Card.svelte';
  import HomeCard from './HomeCard.svelte';

  import { messageStore } from '@Stores/messageStore';

  $: stats = messageStore.loadStats();
</script>

{#await stats then { all, pending }}
  <div class="container">
    <Card>
      <div class="greeting">Dashboard</div>
    </Card>

    <div class="content">
      <HomeCard title="Mails" value={all ? 100 : 0} label={all} />

      <HomeCard title="Sent" value={((all - pending) / all) * 100} label={all - pending} />
      <HomeCard title="Pending" value={(pending / all) * 100} label={pending} />
    </div>
  </div>
{/await}

<style>
  .greeting {
    padding: 1rem;
  }

  .container {
    text-align: center;
    width: 100%;
    font-size: 2rem;
    padding: 1rem;
    gap: 1rem;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;

    padding-top: 1rem;

    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1200px) {
    .content {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 1024px) {
    .content {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 768px) {
    .content {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
