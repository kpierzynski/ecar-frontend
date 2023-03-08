<script>
  import Button from './Button.svelte';
  import Dropdown from './Dropdown.svelte';
  import globalStore from './../stores/globalStore';

  import { api_post } from '../tools/fetcher';
  import generateStringFromTemplate from './../tools/templateEngine';

  const obj = {
    mail: {
      template: `Szanowni Państwo,

W związku z ostatnią wizytą na {0}, informujemy, że w pojeździe o nr rej. {1} uwagi wymagają następujące pozycje:
{2*}

Jako profesjonaliści w dziedzinie motoryzacji, wiemy, że bezpieczeństwo jest kluczowe, dlatego zawsze podejmujemy działania, które zapewnią Państwu bezpieczną eksploatację. W trosce o Państwa czas, informujemy o konieczności wizyty w serwisie odpowiednio wcześniej.

{3}

Zachęcamy do umówienia się na wizytę w dogodnym dla Państwa terminie, odpowiadając na ten e-mail bądź poprzez kontakt telefoniczny.

Z wyrazami szacunku
{4}`,
      footer: `Tymoteusz Kowalski
E-CAR
123-456-789
e-car.poznan@hotmail.com`,
      title: 'Przypominamy o wizycie w serwisie samochodowym',
    },
    appoinments: [
      { name: 'Przegląd okresowy', variation: 'przeglądzie okresowym' },
      {
        name: 'Diagnostyka komputerowa',
        variation: 'diagnostyce komputerowej',
      },
      {
        name: 'Diagnostyka zgłoszonej usterki',
        variation: 'diagnostyce zgłoszonej usterki',
      },
    ],
    tree: [
      {
        name: 'Układ hamulcowy',
        options: [
          { name: 'Tarcze hamulcowe przód' },
          { name: 'Okładziny hamulcowe przód' },
          { name: 'Płyn hamulcowy' },
        ],
        note: 'Regularna kontrola stanu układu hamulcowego jest kluczowa dla zapewnienia prawidłowej pracy hamulców i uniknięcia niebezpiecznych sytuacji na drodze. Zaniedbania w tym zakresie mogą prowadzić do pogorszenia skuteczności hamowania oraz poważnych uszkodzeń układu hamulcowego. Zalecamy, aby co najmniej raz na miesiąc sprawdzać stan układu, a także w razie potrzeby wymieniać jego elementy zgodnie z zaleceniami. Pamiętajmy, że bezpieczeństwo nasze i innych użytkowników dróg zależy w dużej mierze od sprawności układu hamulcowego, dlatego zachęcamy do systematycznej kontroli i dbałości o ten niezwykle ważny element pojazdu.',
      },
      {
        name: 'Układ smarowania',
        options: [
          { name: 'Olej silnikowy z filtrem i korkiem' },
          { name: 'Pompa oleju' },
          { name: 'Czujnik ciśnienia oleju' },
        ],
        note: 'Regularna kontrola stanu układu smarowania jest kluczowa dla prawidłowego działania pojazdu. Zaniedbania w tym zakresie mogą prowadzić do poważnych uszkodzeń silnika i innych elementów samochodu. Zalecamy, aby co najmniej raz na miesiąc sprawdzać poziom oleju w silniku i regularnie wymieniać go zgodnie z zaleceniami. W przypadku zauważenia jakichkolwiek nieprawidłowości, konieczne jest natychmiastowe podjęcie działań.',
      },
      {
        name: 'Układ zawieszenia',
        options: [
          { name: 'Amortyzatory przód' },
          { name: 'Tuleje wahacza tył' },
          { name: 'Sprężyny' },
        ],
        note: 'Regularna kontrola stanu układu zawieszenia jest kluczowa dla prawidłowego działania pojazdu i zapewnienia bezpieczeństwa na drodze. Zaniedbania w tym zakresie mogą prowadzić do pogorszenia stabilności i prowadzenia samochodu, a także poważnych uszkodzeń układu zawieszenia. Zalecamy, aby co najmniej raz na miesiąc sprawdzać stan amortyzatorów i resorów, a także w razie potrzeby wymieniać je zgodnie z zaleceniami. Stan układu zawieszenia wpływa nie tylko na komfort jazdy, ale przede wszystkim na bezpieczeństwo nasze i innych użytkowników na drodze.',
      },
    ],
  };

  let appointmentType;
  $: appointmentTypeVariation =
    obj.appoinments.find((it) => it.name === appointmentType)?.variation || '<-Rodzaj wizyty->';

  let systemType;
  $: safetyNote = obj.tree.find((it) => it.name === systemType)?.note || '';

  let registration;
  $: registrationUpper = registration ? registration.toUpperCase() : '<-Numer Rejestracyjny->';
  let to;
  $: title = obj.mail.title;

  let whenSend;
  $: whenSendTimestamp = new Date(whenSend).getTime();

  $: carElements = obj.tree
    .map((it) => it.options)
    .flat()
    .filter((it) => it.value)
    .map((it) => it.name);

  $: content = generateStringFromTemplate(
    obj.mail.template,
    appointmentTypeVariation,
    registrationUpper,
    carElements,
    safetyNote,
    obj.mail.footer
  );
  // Form

  async function handleSave() {
    api_post(`/message`, {
      registration,
      to,
      title,
      content,
      whenSend: whenSendTimestamp,
    });
    globalStore.view('all');
  }
</script>

<form on:submit|preventDefault|once={handleSave}>
  <div class="container">
    <span>To:</span>
    <input bind:value={to} type="email" required placeholder="example@internet.com" />

    <input class="registration" bind:value={registration} placeholder="PY 12345" required />

    <div>
      <Dropdown bind:selected={appointmentType} title="Rodzaj wizyty" options={obj.appoinments} />
      <Dropdown bind:selected={systemType} title="Rodzaj układu" options={obj.tree} />

      <div class="check-container">
        {#if systemType}
          {#each obj.tree.find((it) => it.name === systemType)?.options || [] as item}
            <span class="checkbox">
              <input type="checkbox" bind:checked={item.value} />{item.name}
            </span>
          {/each}
        {:else}
          <span class="checkbox">
            <input type="checkbox" disabled />
            <div class="checkbox-placeholder" />
          </span>
        {/if}
      </div>
    </div>

    <span>Title:</span>
    <input bind:value={title} required placeholder="Remainder about car maintenance" />

    <span>Content:</span>
    <textarea bind:value={content} required placeholder="Dear Client..." />

    <span>When to send:</span>
    <input bind:value={whenSend} type="datetime-local" required />

    <Button>Save</Button>
  </div>
</form>

<style>
  form {
    width: calc(100% - 2rem);
  }

  .container {
    width: calc(100% - 2rem);
    display: flex;
    flex-direction: column;

    gap: 1rem;
    padding: 1rem;

    height: calc(100% - 2rem);
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .checkbox-placeholder {
    background-color: lightgray;
    border-radius: 1rem;

    width: 8rem;
    height: 1rem;
  }

  input[type='checkbox'] {
    width: 2rem;
    aspect-ratio: 1;
  }

  input[type='checkbox']:checked {
    accent-color: var(--primary-0);
  }

  input,
  textarea {
    border-radius: 1rem;
    border: 1px solid black;
    padding: 1rem;
  }

  textarea {
    height: 100%;
  }

  .check-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 1rem;
  }

  .registration {
    border-left-width: 2rem;
    border-left-color: blue;
    font-weight: bold;

    text-transform: uppercase;
  }
</style>
