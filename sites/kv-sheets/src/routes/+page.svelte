<!-- src/routes/kv-test/+page.svelte -->
<script>
	let key = $state('test:hello');
	let value = $state('world');
	let result = $state('');

	async function write() {
		const res = await fetch('/api/kv-test', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ key, value })
		});
		result = JSON.stringify(await res.json(), null, 2);
	}

	async function read() {
		const res = await fetch('/api/kv-test');
		result = JSON.stringify(await res.json(), null, 2);
	}
</script>

<input bind:value={key} placeholder="key" />
<input bind:value={value} placeholder="value" />
<button onclick={write}>Write</button>
<button onclick={read}>List keys</button>

<pre>{result}</pre>
