import { z } from 'zod';
import { query, getRequestEvent } from '$app/server';

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

export const getValueWithMetadata = query(z.string(), async (key) => {
   const kv = getKV();
	console.log(kv)
   const value = await kv.getWithMetadata(key);
   console.log(value)
   return value;
});
