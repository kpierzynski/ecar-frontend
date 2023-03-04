<script>
  let to;
  let title;
  let content;
  let whenSend;

  async function handleSave() {
    console.log('SENDING');
    try {
      const response = await fetch('http://localhost:3000/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to,
          title,
          content,
          whenSend: new Date(whenSend).getTime(),
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<form on:submit|preventDefault={handleSave}>
  <div class="container">
    <span>To:</span>
    <input bind:value={to} type="email" />

    <span>Title:</span>
    <input bind:value={title} type="text" />

    <span>Content:</span>
    <textarea bind:value={content} />

    <span>When to send:</span>
    <input bind:value={whenSend} type="datetime-local" />

    <button type="submit">Save</button>
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
  }

  input,
  textarea {
    border-radius: 1rem;
    border: 1px solid black;
    padding: 1rem;
  }

  button {
    background-color: var(--primary-0);
    color: #eeeeee;
    border-radius: 1rem;
    padding: 1rem;
  }

  span,
  button,
  input,
  textarea {
    font-size: 1.5rem;
  }
</style>
