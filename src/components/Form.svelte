<script>
  import Button from './Button.svelte';
  import globalStore from './../stores/globalStore';

  const footer = `Tymoteusz Kowalski
E-CAR
123-456-789
e-car.poznan@hotmail.com`;

  const obj = {
    mail: `Szanowni Państwo,

W związku z ostatnią wizytą na {0}, informujemy, że w pojeździe o nr rej. {1} interwencji wymagają następujące pozycje:
{2*}

Jako profesjonaliści w dziedzinie motoryzacji, wiemy, że bezpieczeństwo jest kluczowe, dlatego zawsze podejmujemy działania, które zapewnią Państwu bezpieczną eksploatację. W trosce o Państwa czas, informujemy o konieczności wizyty w serwisie odpowiednio wcześniej.

{3}

Zachęcamy do umówienia się na wizytę w dogodnym dla Państwa terminie, odpowiadając na ten e-mail bądź poprzez kontakt telefoniczny.

Z wyrazami szacunku
{4}`,
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

  let appointment_type;
  let selected_first;

  let registration;
  let to;
  let title = 'Przypominamy o wizycie w serwisie samochodowym';
  $: content = generateStringFromTemplate(
    obj.mail,
    obj.appoinments.find((it) => it.name === appointment_type)?.variation ||
      '<- Typ wizyty ->',
    registration || '<- Numer Rejestracyjny ->',
    obj.tree
      .map((it) => it.options)
      .flat()
      .filter((it) => it.value)
      .map((it) => it.name),
    obj.tree.find((it) => it.name === selected_first)?.note || '',
    footer
  );
  let whenSend;

  async function handleSave() {
    try {
      const response = await fetch('http://localhost:3000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration,
          to,
          title,
          content,
          whenSend: new Date(whenSend).getTime(),
        }),
      });

      const data = await response.json();
      globalStore.view('all');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // move this to other file.
  function generateStringFromTemplate(template, ...args) {
    return template.replace(/\{(\d+)(\*)?\}/g, (match, index, isList) => {
      const arg = args[index];
      if (Array.isArray(arg) && isList === '*') {
        return arg.map((item) => `- ${item}`).join('\n');
      } else {
        return arg;
      }
    });
  }
</script>

<form on:submit|preventDefault|once={handleSave}>
  <div class="container">
    <span>To:</span>
    <input
      bind:value={to}
      type="email"
      required
      placeholder="example@internet.com"
    />

    <input
      class="registration"
      bind:value={registration}
      type="text"
      placeholder="PY 12345"
      required
    />

    <div>
      <select bind:value={appointment_type}>
        <option disabled selected> {'<-'} Rodzaj wizyty {'->'}</option>
        {#each obj.appoinments as appoinment}
          <option value={appoinment.name}>{appoinment.name}</option>
        {/each}
      </select>

      <select bind:value={selected_first}>
        <option disabled selected>{'<-'} Rodzaj układu {'->'}</option>
        {#each obj.tree as item}
          <option value={item.name}>{item.name}</option>
        {/each}
      </select>

      <div class="check-container">
        {#if selected_first}
          {#each obj.tree.find((it) => it.name === selected_first)?.options || [] as item}
            <span class="checkbox"
              ><input
                type="checkbox"
                bind:checked={item.value}
              />{item.name}</span
            >
          {/each}
        {/if}
      </div>
    </div>

    <span>Title:</span>
    <input
      bind:value={title}
      type="text"
      required
      placeholder="Remainder about car maintenance"
    />

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

  select {
    border-radius: 1rem;
    border: 1px solid black;

    padding: 1rem;
    background-color: transparent;
  }

  .checkbox {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  input[type='checkbox'] {
    width: 2rem;
    aspect-ratio: 1;
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
