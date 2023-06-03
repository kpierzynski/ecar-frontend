<script>
  import generateStringFromTemplate from '@Tools/templateEngine';

  import { messageStore } from '@Stores/messageStore';
  import { globalStore } from '@Stores/globalStore';
  import { push, location } from 'svelte-spa-router';

  import Button from '@Components/Button.svelte';
  import Dropdown from '@Components/Dropdown.svelte';
  import Input from '@Components/Input.svelte';
  import InputRegistration from '@Components/InputRegistration.svelte';
  import Checkbox from '@Components/Checkbox.svelte';
  import CheckboxPlaceholder from '@Components/CheckboxPlaceholder.svelte';

  const form = $globalStore.config;

  let appointmentType;
  $: appointmentTypeVariation =
    form.appointmentTypes.types.find((it) => it.name === appointmentType)?.text || '';

  let systemType;
  $: safetyNote = form.partTypes.types.find((it) => it.name === systemType)?.note || '';

  let registration;
  $: registrationUpper = registration ? registration.toUpperCase() : 'PY 12345';
  let to;
  $: title = form.mailConfig.title;

  let whenSend;
  $: whenSendTimestamp = new Date(whenSend).getTime();

  let cyclic = 1;
  let quantity = 1;

  $: carElements = form.partTypes.types
    .map((it) => it.options)
    .flat()
    .filter((it) => it.value)
    .map((it) => it.name);

  $: content = generateStringFromTemplate(
    form.mailConfig.template,
    appointmentTypeVariation,
    registrationUpper,
    carElements,
    safetyNote,
    form.mailConfig.footer
  );

  // Give those variables more readable names
  function cleanChecks() {
    form.partTypes.types.forEach((it) => {
      it.options.forEach((il) => {
        il.value = false;
      });
    });
  }

  $: location && cleanChecks();

  async function handleSave() {
    messageStore.addMessage({
      registration,
      to,
      title,
      content,
      whenSend: whenSendTimestamp,
      isSent: quantity,
      cyclic: cyclic * 24 * 3600 * 1000,
    });
    push('/message');
  }
</script>

<div class="container">
  <form on:submit|preventDefault|once={handleSave}>
    <div class="part">
      <Input
        title="To"
        bind:value={to}
        type="email"
        maxlength={320}
        required
        placeholder="example@internet.com"
      />

      <Input title="Delivery date" bind:value={whenSend} type="datetime-local" required />
      <div class="cyclic">
        <Input
          title="Redelivery gap days"
          bind:value={cyclic}
          min="1"
          max="30"
          type="number"
          required
        />
        <Input
          title="Delivery quantity"
          bind:value={quantity}
          min="1"
          max="3"
          type="number"
          required
        />
      </div>
    </div>

    <div class="part">
      <InputRegistration bind:value={registration} placeholder="PY 12345" required />

      <div class="dropdowns-container">
        <Dropdown
          bind:selected={appointmentType}
          title={form.appointmentTypes.default}
          options={form.appointmentTypes.types}
        />
        <Dropdown
          bind:selected={systemType}
          title={form.partTypes.default}
          options={form.partTypes.types}
        />
      </div>

      <div class="checks-container">
        {#if systemType}
          {#each form.partTypes.types.find((it) => it.name === systemType)?.options as item, index}
            <Checkbox required={carElements.length ? false : true} bind:checked={item.value}
              >{item.name}</Checkbox
            >
          {/each}
        {:else}
          <CheckboxPlaceholder />
        {/if}
      </div>
    </div>

    <div class="part grow">
      <Input title="Title" bind:value={title} required />

      <textarea class="grow" bind:value={content} required />
    </div>
    <Button>Save</Button>
  </form>
</div>

<style>
  .container {
    width: 100%;
    padding: 1rem;
  }

  .cyclic {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }

  form {
    display: flex;
    flex-direction: column;

    gap: 1rem;
    height: 100%;

    min-height: 25%;
  }

  .part {
    border-radius: 1rem;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: var(--dark-white);
  }

  .grow {
    flex-grow: 1;
  }

  textarea {
    border-radius: 1rem;
    border: 1px solid black;
    padding: 1rem;
  }

  .dropdowns-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media screen and (max-width: 480px) {
    .dropdowns-container {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (max-width: 768px) {
    .cyclic {
      grid-template-columns: 1fr;
    }
  }

  .checks-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
