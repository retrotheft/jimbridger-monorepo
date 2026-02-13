// src/lib/kv.remote.ts
import { z } from 'zod';
import { query, command, getRequestEvent } from '$app/server';

function getKV() {
	const { platform } = getRequestEvent();
	const kv = platform?.env.KV_SHEETS;
	if (!kv) throw new Error('KV not available');
	return kv;
}

export const getValue = query(z.string(), async (key) => {
	const kv = getKV();
	const value = await kv.get(key);
	return value ? JSON.parse(value) : null;
});

export const getValues = query(z.array(z.string()).max(100), async (keys) => {
	const kv = getKV();
	const result = await kv.get(keys, 'json');
	return keys.map((key) => ({ key, value: result.get(key) ?? null })) as Record<string, string>[];
});

export const listKeys = query(
	z.string().optional(),
	async (prefix) => {
		const kv = getKV();
		const result = await kv.list({ prefix });
		return result.keys;
	}
);

export const putValue = command(
	z.object({
		key: z.string().min(1),
		value: z.unknown()
	}),
	async ({ key, value }) => {
		const kv = getKV();
		await kv.put(key, JSON.stringify(value));
	}
);

export const deleteValue = command(z.string(), async (key) => {
	const kv = getKV();
	await kv.delete(key);
});
