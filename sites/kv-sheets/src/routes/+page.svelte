<!-- src/routes/kv-test/+page.svelte -->
<script lang="ts">
	import { getValue, listKeys, putValue, deleteValue } from '$lib/kv.remote';

	let key = $state('test:hello');
	let value = $state('world');
	let readResult = $state('');

	const query = listKeys('')

	async function write() {
		await putValue({ key, value });
		readResult = 'Written!';
		query.refresh()
	}

	async function read() {
		const result = await getValue(key);
		readResult = JSON.stringify(result, null, 2);
	}

	async function remove() {
		await deleteValue(key);
		readResult = 'Deleted!';
		query.refresh()
	}

	async function deleteKey(k: string) {
   	await deleteValue(k);
   	readResult = 'Deleted!';
   	query.refresh()
	}

	const queryResult = $derived(query.current)
	const sheets = $derived(queryResult?.filter((el: { name: string }) => !el.name.includes(":")) ?? [])
</script>

<input bind:value={key} placeholder="key" />
<input bind:value={value} placeholder="value" />
<button onclick={write}>Write</button>
<button onclick={read}>Read</button>
<button onclick={remove}>Delete</button>

<pre>{readResult}</pre>

<h3>All keys</h3>
{#each await query as item}
	<div><button onclick={() => deleteKey(item.name)}>Delete</button>{item.name} </div>
{/each}

<h3>Sheets Only</h3>
<ul>
{#each sheets as sheet}
   <li>
      <a href={`/${sheet.name}`}>{sheet.name}</a>
   </li>
{/each}
</ul>
