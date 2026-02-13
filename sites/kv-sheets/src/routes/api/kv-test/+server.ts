import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
	const kv = platform?.env.KV_SHEETS;
	if (!kv) return error(500, 'KV not available');

	const keys = await kv.list();
	return json({ keys: keys.keys });
};

export const POST: RequestHandler = async ({ request, platform }) => {
	const kv = platform?.env.KV_SHEETS;
	if (!kv) return error(500, 'KV not available');

	const { key, value } = await request.json();
	await kv.put(key, JSON.stringify(value));

	return json({ success: true, key });
};

export const DELETE: RequestHandler = async ({ url, platform }) => {
	const kv = platform?.env.KV_SHEETS;
	if (!kv) return error(500, 'KV not available');

	const key = url.searchParams.get('key');
	if (!key) return error(400, 'Missing key parameter');

	await kv.delete(key);
	return json({ success: true, deleted: key });
};
