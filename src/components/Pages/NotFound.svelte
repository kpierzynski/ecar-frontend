<script>
  import Input from '@Components/Input.svelte';
  export let params;

  const notFoundMessage = `
  Dear User!

  An 404 error occur. We cannot find '${params.wild}' page.
  Possible solutions:
  - This page should not exist,
  - Check for typo in link,
  - Refresh page,
  - Take step back to landing page,
  - Contact with administrator;

  Sincerely,
  Development Team
  `;
</script>

<div class="content">
  <div class="part grow">
    <Input value="From: Managment" readonly />
    <Input value={`Title: Where is '${params.wild}' page?!`} readonly />

    <textarea class="grow" value={notFoundMessage} readonly />
  </div>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: calc(100% - 2rem);
    padding: 1rem;
  }
  .grow {
    flex-grow: 1;
  }
  .part {
    border-radius: 1rem;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: var(--dark-white);
  }

  textarea {
    border-radius: 1rem;
    border: 1px solid black;
  }
</style>
