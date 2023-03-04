<script>
  export let data;
  const { to, title, content, whenSend, isSent } = data;
</script>

<div class={isSent ? 'send' : 'not-send'}>
  {`Message: ${to}, ${title}, ${content}, ${new Date(
    whenSend
  ).toString()} ${isSent}`}
</div>

<style>
  .send {
    color: green;
  }

  .not-send {
    color: red;
  }
</style>
