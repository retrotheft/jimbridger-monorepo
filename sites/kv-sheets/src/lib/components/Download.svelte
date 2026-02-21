<script>
  let { content = 'Hello, world!', filename = 'download.txt' } = $props();

  function download() {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
</script>

<button onclick={download}>Download {filename}</button>
